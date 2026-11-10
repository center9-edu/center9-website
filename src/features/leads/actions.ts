"use server";

import { after } from "next/server";

import {
  normalizePhone,
  validateTrialRegistration,
  type TrialRegistrationField,
  type TrialRegistrationState,
  type TrialRegistrationValues,
} from "@/features/leads/trial-registration";
import { escapeSlackText, postSlackMessage } from "@/lib/slack";

const FIELDS: TrialRegistrationField[] = [
  "parentName",
  "phone",
  "studentName",
  "studentAge",
  "email",
  "note",
];

const EMPTY_VALUES: TrialRegistrationValues = {
  parentName: "",
  phone: "",
  studentName: "",
  studentAge: "",
  email: "",
  note: "",
};

// Prevents values such as "=HYPERLINK(...)" from being evaluated as spreadsheet formulas.
function escapeSpreadsheetValue(value: string) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

// Log only the failure reason, never the submitted personal data.
function logFailure(action: string, error: unknown) {
  console.error(
    `[trial-registration] Failed to ${action}:`,
    error instanceof Error ? error.message : "unknown error",
  );
}

async function saveToSheet(url: string, secret: string, values: TrialRegistrationValues) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      submittedAt: new Date().toISOString(),
      parentName: escapeSpreadsheetValue(values.parentName),
      phone: normalizePhone(values.phone),
      studentName: escapeSpreadsheetValue(values.studentName),
      studentAge: Number(values.studentAge),
      email: escapeSpreadsheetValue(values.email.toLowerCase()),
      note: escapeSpreadsheetValue(values.note),
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  const result: unknown = await response.json();

  if (!response.ok || (result as { ok?: unknown })?.ok !== true) {
    throw new Error(`Webhook responded with status ${response.status}`);
  }
}

function buildSlackMessage(values: TrialRegistrationValues, savedToSheet: boolean) {
  const safe = (value: string) => escapeSlackText(value);
  const lines = [
    savedToSheet
      ? "*Có đăng ký học thử mới*"
      : "*Có đăng ký học thử mới* (chưa lưu được vào Google Sheet, cần nhập tay)",
    `• *Phụ huynh:* ${safe(values.parentName)}`,
    `• *Số điện thoại:* ${safe(normalizePhone(values.phone))}`,
    `• *Học viên:* ${safe(values.studentName)} (${values.studentAge} tuổi)`,
    `• *Email:* ${safe(values.email.toLowerCase())}`,
  ];
  if (values.note) lines.push(`• *Ghi chú:* ${safe(values.note)}`);
  return lines.join("\n");
}

export async function submitTrialRegistration(
  _previousState: TrialRegistrationState,
  formData: FormData,
): Promise<TrialRegistrationState> {
  const values = { ...EMPTY_VALUES };
  for (const field of FIELDS) {
    const value = formData.get(field);
    values[field] = typeof value === "string" ? value.trim() : "";
  }

  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) {
    return { status: "success", submissionId: crypto.randomUUID() };
  }

  const fieldErrors = validateTrialRegistration(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      attemptId: crypto.randomUUID(),
      message: "Vui lòng kiểm tra lại các thông tin được đánh dấu.",
      fieldErrors,
      values,
    };
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    console.error("[trial-registration] Google Sheets webhook is not configured.");
    return {
      status: "error",
      attemptId: crypto.randomUUID(),
      message: "Hệ thống đăng ký đang bảo trì. Ba mẹ vui lòng gọi hotline để được hỗ trợ.",
      fieldErrors: {},
      values,
    };
  }

  // Save and notify after the response is sent so parents don't wait on either webhook.
  // The Slack message carries the full registration, so it is not lost if the sheet fails.
  after(async () => {
    let savedToSheet = true;
    try {
      await saveToSheet(webhookUrl, webhookSecret, values);
    } catch (error) {
      savedToSheet = false;
      logFailure("save registration to Google Sheets", error);
    }

    try {
      await postSlackMessage(buildSlackMessage(values, savedToSheet));
    } catch (error) {
      logFailure("notify Slack", error);
    }
  });

  return { status: "success", submissionId: crypto.randomUUID() };
}
