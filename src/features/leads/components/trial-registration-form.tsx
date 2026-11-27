"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { useActionState, useState, type FormEvent, type ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitTrialRegistration } from "@/features/leads/actions";
import {
  COURSE_OPTIONS,
  FIELD_LIMITS,
  MINOR_MAX_AGE,
  STUDENT_AGE_RANGE,
  validateTrialRegistration,
  type TrialRegistrationField,
  type TrialRegistrationState,
  type TrialRegistrationValues,
} from "@/features/leads/trial-registration";
import { cn } from "@/lib/utils";

const INITIAL_STATE: TrialRegistrationState = { status: "idle" };

const EMPTY_VALUES: TrialRegistrationValues = {
  registrantName: "",
  studentAge: "",
  contactPhone: "",
  courseInterest: "",
  note: "",
  privacyConsent: "",
};

const AGE_OPTIONS = Array.from(
  { length: STUDENT_AGE_RANGE.max - STUDENT_AGE_RANGE.min + 1 },
  (_, index) => String(STUDENT_AGE_RANGE.min + index),
);

// Figma "Registration Field": 52px box, 16px text, red border on error.
const CONTROL_CLASS =
  "w-full rounded-[10px] border border-[#d6dbe5] bg-white px-4 text-base/[1.4] text-foreground outline-none placeholder:text-[#757a8a] focus-visible:border-brand-blue focus-visible:ring-3 focus-visible:ring-brand-blue/15 aria-invalid:border-destructive";

export function TrialRegistrationForm() {
  const [state, formAction, isPending] = useActionState(submitTrialRegistration, INITIAL_STATE);
  const [dismissedId, setDismissedId] = useState<string>();

  // React resets the form after every submit, so it is remounted per result and refilled
  // from the values returned on error.
  const formKey =
    state.status === "error"
      ? state.attemptId
      : state.status === "success"
        ? state.submissionId
        : "initial";
  const isSuccessOpen = state.status === "success" && state.submissionId !== dismissedId;

  return (
    <>
      <RegistrationFields
        key={formKey}
        action={formAction}
        isPending={isPending}
        initialValues={state.status === "error" ? state.values : EMPTY_VALUES}
        serverError={state.status === "error" ? state : undefined}
      />

      <Dialog
        open={isSuccessOpen}
        onOpenChange={(open) => {
          if (!open && state.status === "success") setDismissedId(state.submissionId);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex w-[449px] flex-col items-center gap-4 rounded-[44px] bg-white px-6 py-7 text-center ring-0 sm:max-w-[449px]"
        >
          <Image
            src="/images/registration/success-badge.png"
            alt=""
            width={200}
            height={200}
            className="size-40 sm:size-50"
          />
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl/9 font-semibold text-[#050f2e]">
              Đăng ký thành công
            </DialogTitle>
            <DialogDescription className="text-[17px]/[24px] text-ink-body">
              Center9Edu đã nhận được thông tin đăng ký. Đội ngũ tư vấn sẽ liên hệ để tìm hiểu nhu
              cầu và hỗ trợ sắp xếp lịch học thử phù hợp.
            </DialogDescription>
          </div>
          <Link
            href="/"
            className={cn(
              buttonVariants(),
              "h-15.5 w-54 rounded-[40px] bg-brand-blue text-xl font-semibold text-white hover:bg-brand-blue/90",
            )}
          >
            Về trang chủ
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}

type RegistrationFieldsProps = {
  action: (formData: FormData) => void;
  isPending: boolean;
  initialValues: TrialRegistrationValues;
  serverError?: Extract<TrialRegistrationState, { status: "error" }>;
};

function RegistrationFields({
  action,
  isPending,
  initialValues,
  serverError,
}: RegistrationFieldsProps) {
  const [values, setValues] = useState(initialValues);
  // Errors stay hidden until the first submit attempt, then follow the input live.
  const [showErrors, setShowErrors] = useState(Boolean(serverError));

  const liveErrors = validateTrialRegistration(values);
  const errors = showErrors ? liveErrors : {};

  const update = (field: TrialRegistrationField, value: string) =>
    setValues((previous) => ({ ...previous, [field]: value }));

  const age = Number(values.studentAge);
  const isMinor = Boolean(values.studentAge) && age <= MINOR_MAX_AGE;
  const ageHint = !values.studentAge
    ? undefined
    : isMinor
      ? "(*) Vui lòng để lại số điện thoại phụ huynh/người giám hộ để Center9Edu tư vấn chi tiết hơn"
      : `(*) Học viên ${STUDENT_AGE_RANGE.max} tuổi có thể sử dụng số điện thoại cá nhân để Center9Edu liên hệ tư vấn`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (Object.keys(liveErrors).length > 0) {
      event.preventDefault();
      setShowErrors(true);
      const firstInvalid = Object.keys(liveErrors)[0];
      document.getElementById(`trial-${firstInvalid}`)?.focus();
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-6">
        <Field name="registrantName" label="Họ và tên" required error={errors.registrantName}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              maxLength={FIELD_LIMITS.registrantName.max + 20}
              placeholder="Nguyễn Văn A"
              value={values.registrantName}
              onChange={(event) => update("registrantName", event.target.value)}
              className={cn(CONTROL_CLASS, "h-13")}
            />
          )}
        </Field>

        <Field
          name="studentAge"
          label="Độ tuổi học viên"
          required
          error={errors.studentAge}
          hint={ageHint}
          hasChevron
        >
          {(props) => (
            <select
              {...props}
              value={values.studentAge}
              onChange={(event) => update("studentAge", event.target.value)}
              className={cn(
                CONTROL_CLASS,
                "h-13 appearance-none pr-11",
                !values.studentAge && "text-[#757a8a]",
              )}
            >
              <option value="" disabled>
                Vui lòng chọn
              </option>
              {AGE_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-foreground">
                  {option} tuổi
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          name="contactPhone"
          label={isMinor ? "Số điện thoại phụ huynh/người giám hộ" : "Số điện thoại liên hệ"}
          required
          error={errors.contactPhone}
        >
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="0912 345 678"
              value={values.contactPhone}
              onChange={(event) => update("contactPhone", event.target.value)}
              className={cn(CONTROL_CLASS, "h-13")}
            />
          )}
        </Field>

        <Field
          name="courseInterest"
          label="Khóa học quan tâm"
          error={errors.courseInterest}
          hasChevron
        >
          {(props) => (
            <select
              {...props}
              value={values.courseInterest}
              onChange={(event) => update("courseInterest", event.target.value)}
              className={cn(
                CONTROL_CLASS,
                "h-13 appearance-none pr-11",
                !values.courseInterest && "text-[#757a8a]",
              )}
            >
              <option value="">Vui lòng chọn</option>
              {COURSE_OPTIONS.map((course) => (
                <option key={course.value} value={course.value} className="text-foreground">
                  {course.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field name="note" label="Ghi chú thêm (không bắt buộc)" error={errors.note}>
          {(props) => (
            <textarea
              {...props}
              rows={2}
              maxLength={FIELD_LIMITS.note}
              placeholder="Thêm ghi chú"
              value={values.note}
              onChange={(event) => update("note", event.target.value)}
              className={cn(CONTROL_CLASS, "block h-20.75 resize-y py-3.5")}
            />
          )}
        </Field>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <input
            id="trial-privacyConsent"
            name="privacyConsent"
            type="checkbox"
            checked={values.privacyConsent === "on"}
            onChange={(event) => update("privacyConsent", event.target.checked ? "on" : "")}
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={errors.privacyConsent ? "trial-privacyConsent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-brand-blue"
          />
          <label htmlFor="trial-privacyConsent" className="text-base/[1.4] text-[#757a8a]">
            Tôi đã đọc{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-brand-blue">
              chính sách bảo mật
            </Link>{" "}
            và đồng ý cho team Center9Edu sử dụng để liên hệ tư vấn
          </label>
        </div>
        {errors.privacyConsent ? (
          <p id="trial-privacyConsent-error" className="pl-7 text-sm/[1.4] text-destructive">
            {errors.privacyConsent}
          </p>
        ) : null}
      </div>

      {/* Honeypot for bots; hidden from people and assistive technology. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />

      {serverError && Object.keys(serverError.fieldErrors).length === 0 ? (
        <p role="alert" className="text-center text-sm text-destructive">
          {serverError.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="h-15.5 w-full rounded-[40px] bg-brand-blue text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70 sm:text-xl"
      >
        {isPending ? "Đang gửi đăng ký…" : "Đăng ký học thử miễn phí"}
      </button>
    </form>
  );
}

type ControlProps = {
  id: string;
  name: TrialRegistrationField;
  required: boolean | undefined;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

type FieldProps = {
  name: TrialRegistrationField;
  label: string;
  required?: boolean;
  error?: string;
  /** Helper text under the field; replaced by the error when there is one. */
  hint?: string;
  hasChevron?: boolean;
  children: (props: ControlProps) => ReactNode;
};

function Field({ name, label, required, error, hint, hasChevron, children }: FieldProps) {
  const id = `trial-${name}`;
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {/* Label sits on the top border, as in the design. */}
        <label
          htmlFor={id}
          className="absolute -top-2.5 left-3 z-10 bg-white px-1 text-sm/[1.4] text-foreground"
        >
          {label}
          {required ? (
            <span aria-hidden className="text-destructive">
              {" "}
              *
            </span>
          ) : null}
        </label>
        {children({
          id,
          name,
          required,
          "aria-invalid": Boolean(error),
          "aria-describedby": message ? messageId : undefined,
        })}
        {hasChevron ? (
          <ChevronDownIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-foreground"
            strokeWidth={1.5}
          />
        ) : null}
      </div>
      {message ? (
        <p
          id={messageId}
          aria-live={error ? undefined : "polite"}
          className={cn(
            "px-4 text-sm/[1.4]",
            error ? "text-destructive" : "text-[#686868] italic",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
