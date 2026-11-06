// Shared definitions for the free trial registration form (client and server).

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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhone(phone: string) {
  return phone.replace(/[\s.()-]/g, "");
}

export function validateTrialRegistration(values: TrialRegistrationValues) {
  const errors: Partial<Record<TrialRegistrationField, string>> = {};

  if (!values.parentName) {
    errors.parentName = "Vui lòng nhập họ và tên phụ huynh.";
  } else if (values.parentName.length > FIELD_LIMITS.parentName) {
    errors.parentName = `Họ và tên tối đa ${FIELD_LIMITS.parentName} ký tự.`;
  }

  if (!values.phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!PHONE_PATTERN.test(normalizePhone(values.phone))) {
    errors.phone = "Số điện thoại chưa đúng định dạng (ví dụ: 0368684695).";
  }

  if (!values.studentName) {
    errors.studentName = "Vui lòng nhập tên học viên.";
  } else if (values.studentName.length > FIELD_LIMITS.studentName) {
    errors.studentName = `Tên học viên tối đa ${FIELD_LIMITS.studentName} ký tự.`;
  }

  const age = Number(values.studentAge);
  if (!values.studentAge) {
    errors.studentAge = "Vui lòng nhập tuổi học viên.";
  } else if (
    !/^\d+$/.test(values.studentAge) ||
    age < STUDENT_AGE_RANGE.min ||
    age > STUDENT_AGE_RANGE.max
  ) {
    errors.studentAge = "Tuổi học viên phải là một số, ví dụ: 10.";
  }

  if (!values.email) {
    errors.email = "Vui lòng nhập email.";
  } else if (values.email.length > FIELD_LIMITS.email || !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Email chưa đúng định dạng (ví dụ: tenban@gmail.com).";
  }

  if (values.note.length > FIELD_LIMITS.note) {
    errors.note = `Ghi chú tối đa ${FIELD_LIMITS.note} ký tự.`;
  }

  return errors;
}
