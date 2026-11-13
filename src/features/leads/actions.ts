"use server";

import { after } from "next/server";

import {
  getCourseLabel,
  normalizeName,
  normalizePhone,
  validateTrialRegistration,
  type TrialRegistrationField,
  type TrialRegistrationState,
  type TrialRegistrationValues,
} from "@/features/leads/trial-registration";
import { escapeSlackText, postSlackMessage } from "@/lib/slack";

const FIELDS: TrialRegistrationField[] = [
  "registrantName",
  "studentAge",
  "contactPhone",
  "courseInterest",
  "note",
  "privacyConsent",
];

type Lead = {
  createdAt: string;
  values: TrialRegistrationValues;
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

/** Vietnam time (UTC+7) as "YYYY-MM-DD HH:mm:ss". */
function formatVietnamTime(date: Date) {
  return date.toLocaleString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });
}

async function saveToSheet(url: string, secret: string, lead: Lead) {
  const { values } = lead;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      thoi_gian: lead.createdAt,
      ho_va_ten: escapeSpreadsheetValue(normalizeName(values.registrantName)),
      do_tuoi_hoc_vien: Number(values.studentAge),
      so_dien_thoai: normalizePhone(values.contactPhone),
      khoa_hoc_quan_tam: values.courseInterest,
      ghi_chu: escapeSpreadsheetValue(values.note),
      dong_y_xu_ly_thong_tin: true,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  const result: unknown = await response.json();

  if (!response.ok || (result as { ok?: unknown })?.ok !== true) {
    throw new Error(`Webhook responded with status ${response.status}`);
  }
}

function buildSlackMessage(lead: Lead, savedToSheet: boolean) {
  const { values } = lead;
  const safe = (value: string) => escapeSlackText(value);
  const lines = [
    savedToSheet
      ? "*Có đăng ký học thử mới*"
      : "*Có đăng ký học thử mới* (chưa lưu được vào Google Sheet, cần nhập tay)",
    `• *Thời gian:* ${lead.createdAt}`,
    `• *Họ và tên:* ${safe(normalizeName(values.registrantName))}`,
    `• *Độ tuổi học viên:* ${values.studentAge} tuổi`,
    `• *Số điện thoại:* ${safe(normalizePhone(values.contactPhone))}`,
  ];
  if (values.courseInterest) {
    lines.push(`• *Khóa học quan tâm:* ${getCourseLabel(values.courseInterest)}`);
  }
  if (values.note) lines.push(`• *Ghi chú:* ${safe(values.note)}`);
  return lines.join("\n");
}

export async function submitTrialRegistration(
  _previousState: TrialRegistrationState,
  formData: FormData,
): Promise<TrialRegistrationState> {
  const read = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  };

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, read(field)]),
  ) as TrialRegistrationValues;

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

  const lead: Lead = {
    createdAt: formatVietnamTime(new Date()),
    values,
  };

  // Save and notify after the response is sent so parents don't wait on either webhook.
  // The Slack message carries the full registration, so it is not lost if the sheet fails.
  after(async () => {
    let savedToSheet = true;
    try {
      await saveToSheet(webhookUrl, webhookSecret, lead);
    } catch (error) {
      savedToSheet = false;
      logFailure("save registration to Google Sheets", error);
    }

    try {
      await postSlackMessage(buildSlackMessage(lead, savedToSheet));
    } catch (error) {
      logFailure("notify Slack", error);
    }
  });

  return { status: "success", submissionId: crypto.randomUUID() };
}
