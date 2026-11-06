"use server";

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

function buildSlackMessage(values: TrialRegistrationValues) {
  const safe = (value: string) => escapeSlackText(value);
  const lines = [
    "*Có đăng ký học thử mới*",
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

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: webhookSecret,
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
  } catch (error) {
    // Log only the failure reason, never the submitted personal data.
    console.error(
      "[trial-registration] Failed to save registration:",
      error instanceof Error ? error.message : "unknown error",
    );
    return {
      status: "error",
      attemptId: crypto.randomUUID(),
      message: "Chưa gửi được đăng ký. Ba mẹ vui lòng thử lại sau ít phút hoặc gọi hotline.",
      fieldErrors: {},
      values,
    };
  }

  // The registration is already saved; a failed notification must not fail the submit.
  try {
    await postSlackMessage(buildSlackMessage(values));
  } catch (error) {
    console.error(
      "[trial-registration] Failed to notify Slack:",
      error instanceof Error ? error.message : "unknown error",
    );
  }

  return { status: "success", submissionId: crypto.randomUUID() };
}
