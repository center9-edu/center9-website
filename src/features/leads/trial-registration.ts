// Shared definitions for the free trial registration form (client and server), per spec V1.2.

import { z } from "zod";

export const FIELD_LIMITS = {
  registrantName: { min: 2, max: 80 },
  note: 500,
} as const;

export const STUDENT_AGE_RANGE = { min: 8, max: 18 } as const;

/** Students up to this age leave a parent's or guardian's phone number. */
export const MINOR_MAX_AGE = 17;

export const COURSE_OPTIONS = [
  { value: "SCRATCH", label: "Scratch" },
  { value: "COMPUTER_SCIENCE", label: "Computer Science" },
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "DATA_AI", label: "Data & AI" },
  { value: "UNDECIDED", label: "Chưa rõ, cần tư vấn" },
] as const;

export type TrialRegistrationField =
  | "registrantName"
  | "studentAge"
  | "contactPhone"
  | "courseInterest"
  | "note"
  | "privacyConsent";

/** Checkbox values are "on" when ticked and "" otherwise, like other form values. */
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

/** Removes separators and converts the 84 / +84 prefix to 0, e.g. "+84 987 123 456" → "0987123456". */
export function normalizePhone(phone: string) {
  return phone.replace(/[\s.()-]/g, "").replace(/^\+?84/, "0");
}

/** Trims and collapses repeated whitespace inside a name. */
export function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

const NAME_LENGTH_ERROR = `Họ và tên cần từ ${FIELD_LIMITS.registrantName.min} đến ${FIELD_LIMITS.registrantName.max} ký tự.`;
const COURSE_VALUES: readonly string[] = COURSE_OPTIONS.map((course) => course.value);

const trialRegistrationSchema = z.object({
  registrantName: z
    .string()
    .transform(normalizeName)
    .pipe(
      z
        .string()
        .min(1, "Vui lòng nhập họ và tên.")
        .min(FIELD_LIMITS.registrantName.min, NAME_LENGTH_ERROR)
        .max(FIELD_LIMITS.registrantName.max, NAME_LENGTH_ERROR),
    ),
  studentAge: z
    .string()
    .min(1, "Vui lòng chọn độ tuổi học viên.")
    .refine(
      (age) =>
        /^\d+$/.test(age) &&
        Number(age) >= STUDENT_AGE_RANGE.min &&
        Number(age) <= STUDENT_AGE_RANGE.max,
      `Độ tuổi học viên từ ${STUDENT_AGE_RANGE.min} đến ${STUDENT_AGE_RANGE.max}.`,
    ),
  contactPhone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại.")
    .refine(
      (phone) => PHONE_PATTERN.test(phone.replace(/[\s.()-]/g, "")),
      "Số điện thoại chưa đúng định dạng (ví dụ: 0987 123 456).",
    ),
  courseInterest: z
    .string()
    .refine((course) => course === "" || COURSE_VALUES.includes(course), "Khóa học không hợp lệ."),
  note: z.string().max(FIELD_LIMITS.note, `Ghi chú tối đa ${FIELD_LIMITS.note} ký tự.`),
  privacyConsent: z
    .string()
    .refine((consent) => consent === "on", "Vui lòng đồng ý để Center9Edu liên hệ tư vấn."),
}) satisfies z.ZodType<unknown, TrialRegistrationValues>;

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

export function getCourseLabel(value: string) {
  return COURSE_OPTIONS.find((course) => course.value === value)?.label ?? "";
}
