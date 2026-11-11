// Shared definitions for the free trial registration form (client and server).

import { z } from "zod";

export const FIELD_LIMITS = {
  parentName: 100,
  studentName: 100,
  email: 254,
  note: 500,
} as const;

export const STUDENT_AGE_RANGE = { min: 1, max: 99 } as const;

export type TrialRegistrationField =
  | "parentName"
  | "phone"
  | "studentName"
  | "studentAge"
  | "email"
  | "note";

export type TrialRegistrationValues = Record<TrialRegistrationField, string>;

export type TrialRegistrationState =
  | { status: "idle" }
  | { status: "success"; submissionId: string }
  | {
      status: "error";
      /** Changes on every failed submit so the form remounts with the returned values. */
      attemptId: string;
      message: string;
      fieldErrors: Partial<Record<TrialRegistrationField, string>>;
      values: TrialRegistrationValues;
    };

// Vietnamese mobile or landline: 0 + 9–10 digits, or the same with the 84 / +84 prefix.
const PHONE_PATTERN = /^(?:0|\+?84)\d{9,10}$/;

export function normalizePhone(phone: string) {
  return phone.replace(/[\s.()-]/g, "");
}

const STUDENT_AGE_ERROR = "Tuổi học viên phải là một số, ví dụ: 10.";
const EMAIL_ERROR = "Email chưa đúng định dạng (ví dụ: tenban@gmail.com).";

const trialRegistrationSchema = z.object({
  parentName: z
    .string()
    .min(1, "Vui lòng nhập họ và tên phụ huynh.")
    .max(FIELD_LIMITS.parentName, `Họ và tên tối đa ${FIELD_LIMITS.parentName} ký tự.`),
  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại.")
    .refine(
      (phone) => PHONE_PATTERN.test(normalizePhone(phone)),
      "Số điện thoại chưa đúng định dạng (ví dụ: 0368684695).",
    ),
  studentName: z
    .string()
    .min(1, "Vui lòng nhập tên học viên.")
    .max(FIELD_LIMITS.studentName, `Tên học viên tối đa ${FIELD_LIMITS.studentName} ký tự.`),
  studentAge: z
    .string()
    .min(1, "Vui lòng nhập tuổi học viên.")
    .regex(/^\d+$/, STUDENT_AGE_ERROR)
    .refine(
      (age) => Number(age) >= STUDENT_AGE_RANGE.min && Number(age) <= STUDENT_AGE_RANGE.max,
      STUDENT_AGE_ERROR,
    ),
  email: z
    .string()
    .min(1, "Vui lòng nhập email.")
    .max(FIELD_LIMITS.email, EMAIL_ERROR)
    .pipe(z.email(EMAIL_ERROR)),
  note: z.string().max(FIELD_LIMITS.note, `Ghi chú tối đa ${FIELD_LIMITS.note} ký tự.`),
}) satisfies z.ZodType<TrialRegistrationValues>;

/** Returns the first error message of each invalid field (empty when valid). */
export function validateTrialRegistration(values: TrialRegistrationValues) {
  const result = trialRegistrationSchema.safeParse(values);
  if (result.success) return {};

  const { fieldErrors } = z.flattenError(result.error);
  const errors: Partial<Record<TrialRegistrationField, string>> = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) errors[field as TrialRegistrationField] = messages[0];
  }
  return errors;
}
