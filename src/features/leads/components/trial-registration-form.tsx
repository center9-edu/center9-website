"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpenIcon, ChevronDownIcon, CircleCheckIcon, InfoIcon } from "lucide-react";
import {
  useActionState,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { CallIcon } from "@/components/shared/icons/call-icon";
import { NoteIcon } from "@/components/shared/icons/note-icon";
import { PeopleIcon } from "@/components/shared/icons/people-icon";
import { PlusIcon } from "@/components/shared/icons/plus-icon";
import { UserIcon } from "@/components/shared/icons/user-icon";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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

const CONTROL_CLASS =
  "w-full rounded-[10px] border border-[#d6dbe5] bg-white pl-3.5 text-[15px]/[1.4] text-navy outline-none placeholder:text-[#9aa0ad] focus-visible:border-[#3366e5] focus-visible:ring-3 focus-visible:ring-[#3366e5]/15 aria-invalid:border-destructive";

const FIELD_ICON_CLASS = "size-5.5 shrink-0 text-[#292d32]";

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
          className="flex w-[414px] flex-col items-center gap-0 rounded-[44px] bg-white px-6 pt-18.5 pb-10 text-center ring-0 sm:max-w-[414px]"
        >
          <Image
            src="/images/registration/success-badge.png"
            alt=""
            width={200}
            height={200}
            className="size-40 sm:size-50"
          />
          <DialogTitle className="mt-9 text-[28px]/[44px] font-semibold text-[#050f2e] sm:text-[32px]/[44px]">
            Đăng ký thành công!
          </DialogTitle>
          <DialogDescription className="mt-2 max-w-90.5 text-[17px]/[22px] tracking-[-0.24px] text-ink-body">
            Center9Edu đã nhận được thông tin đăng ký. Đội ngũ tư vấn sẽ liên hệ để tìm hiểu nhu
            cầu và hỗ trợ sắp xếp lịch học thử phù hợp.
          </DialogDescription>
          <DialogClose
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-6 h-14 w-46 rounded-full border-primary text-base font-bold text-[#00095f]",
            )}
          >
            Đóng
          </DialogClose>
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
  const [isNoteOpen, setIsNoteOpen] = useState(Boolean(initialValues.note));

  const liveErrors = validateTrialRegistration(values);
  const errors = showErrors ? liveErrors : {};
  const isValid = (field: TrialRegistrationField) => Boolean(values[field]) && !liveErrors[field];

  const update = (field: TrialRegistrationField, value: string) =>
    setValues((previous) => ({ ...previous, [field]: value }));

  const age = Number(values.studentAge);
  const isMinor = Boolean(values.studentAge) && age <= MINOR_MAX_AGE;

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
      <Field
        name="registrantName"
        label="Họ và tên"
        required
        icon={<UserIcon className={FIELD_ICON_CLASS} />}
        error={errors.registrantName}
        valid={isValid("registrantName")}
      >
        {(props) => (
          <input
            {...props}
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.registrantName.max + 20}
            placeholder="Nhập họ và tên"
            value={values.registrantName}
            onChange={(event) => update("registrantName", event.target.value)}
            className={cn(CONTROL_CLASS, "h-12 pr-10")}
          />
        )}
      </Field>

      <Field
        name="studentAge"
        label="Độ tuổi học viên"
        required
        icon={<PeopleIcon className={FIELD_ICON_CLASS} />}
        error={errors.studentAge}
        valid={isValid("studentAge")}
        hasChevron
      >
        {(props) => (
          <select
            {...props}
            value={values.studentAge}
            onChange={(event) => update("studentAge", event.target.value)}
            className={cn(
              CONTROL_CLASS,
              "h-12 appearance-none pr-16",
              !values.studentAge && "text-[#9aa0ad]",
            )}
          >
            <option value="" disabled>
              Chọn độ tuổi
            </option>
            {AGE_OPTIONS.map((option) => (
              <option key={option} value={option} className="text-navy">
                {option} tuổi
              </option>
            ))}
          </select>
        )}
      </Field>

      {values.studentAge ? (
        <p
          aria-live="polite"
          className="flex items-start gap-2.5 rounded-xl bg-[#eaf1ff] px-3.5 py-3 text-[13px]/[1.45] text-[#3b4256]"
        >
          <InfoIcon aria-hidden className="mt-px size-5 shrink-0 text-[#3366e5]" strokeWidth={1.75} />
          {isMinor
            ? `Với học viên ${STUDENT_AGE_RANGE.min}–${MINOR_MAX_AGE} tuổi, vui lòng để lại số điện thoại phụ huynh/người giám hộ để Center9Edu xác nhận nhu cầu học thử.`
            : `Học viên ${STUDENT_AGE_RANGE.max} tuổi có thể sử dụng số điện thoại cá nhân để Center9Edu liên hệ xác nhận và tư vấn học thử.`}
        </p>
      ) : null}

      <Field
        name="contactPhone"
        label={isMinor ? "Số điện thoại phụ huynh/người giám hộ" : "Số điện thoại liên hệ"}
        required
        icon={<CallIcon className={FIELD_ICON_CLASS} />}
        error={errors.contactPhone}
        valid={isValid("contactPhone")}
      >
        {(props) => (
          <input
            {...props}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="Nhập số điện thoại"
            value={values.contactPhone}
            onChange={(event) => update("contactPhone", event.target.value)}
            className={cn(CONTROL_CLASS, "h-12 pr-10")}
          />
        )}
      </Field>

      <Field
        name="courseInterest"
        label="Khóa học quan tâm"
        icon={<BookOpenIcon aria-hidden className={FIELD_ICON_CLASS} strokeWidth={1.5} />}
        error={errors.courseInterest}
        valid={isValid("courseInterest")}
        hasChevron
      >
        {(props) => (
          <select
            {...props}
            value={values.courseInterest}
            onChange={(event) => update("courseInterest", event.target.value)}
            className={cn(
              CONTROL_CLASS,
              "h-12 appearance-none pr-16",
              !values.courseInterest && "text-[#9aa0ad]",
            )}
          >
            <option value="">Chọn khóa học</option>
            {COURSE_OPTIONS.map((course) => (
              <option key={course.value} value={course.value} className="text-navy">
                {course.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      {isNoteOpen ? (
        <Field
          name="note"
          label="Ghi chú thêm"
          icon={<NoteIcon className={FIELD_ICON_CLASS} />}
          error={errors.note}
          valid={isValid("note")}
          multiline
        >
          {(props) => (
            <>
              <textarea
                {...props}
                rows={3}
                maxLength={FIELD_LIMITS.note}
                autoFocus={!initialValues.note}
                placeholder="Nhập ghi chú (nếu có)"
                value={values.note}
                onChange={(event) => update("note", event.target.value)}
                className={cn(CONTROL_CLASS, "block min-h-20 resize-y pt-3 pr-10 pb-6")}
              />
              <span
                aria-hidden
                className="absolute right-3 bottom-2 text-xs text-[#9aa0ad]"
              >
                {values.note.length}/{FIELD_LIMITS.note}
              </span>
            </>
          )}
        </Field>
      ) : (
        <button
          type="button"
          aria-expanded={false}
          onClick={() => setIsNoteOpen(true)}
          className="flex h-10 w-full items-center gap-2 rounded-xl bg-[#eef3fe] px-3.5 text-left text-sm text-[#3b4256] outline-none focus-visible:ring-3 focus-visible:ring-[#3366e5]/30"
        >
          <PlusIcon size={16} className="text-[#2f5bd8]" strokeWidth={2.25} />
          <span>
            <span className="font-semibold text-[#2f5bd8]">Thêm ghi chú</span> (không bắt buộc)
          </span>
        </button>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            id="trial-privacyConsent"
            name="privacyConsent"
            type="checkbox"
            checked={values.privacyConsent === "on"}
            onChange={(event) => update("privacyConsent", event.target.checked ? "on" : "")}
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={errors.privacyConsent ? "trial-privacyConsent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-[#3366e5]"
          />
          <label htmlFor="trial-privacyConsent" className="text-[13px]/[1.5] text-[#3b4256]">
            Tôi đã đọc{" "}
            <Link href="#" className="text-[#2f5bd8] underline underline-offset-2">
              Chính sách bảo mật
            </Link>{" "}
            và đồng ý cho Center9Edu xử lý thông tin để liên hệ tư vấn.
            <span aria-hidden className="text-destructive">
              {" "}
              *
            </span>
          </label>
        </div>
        {errors.privacyConsent ? (
          <p id="trial-privacyConsent-error" className="pl-8 text-sm text-destructive">
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
        className="h-14 w-full rounded-[40px] bg-linear-to-r from-[#3366e5] to-[#7b3fe0] text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70 sm:text-xl"
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
  icon: ReactNode;
  required?: boolean;
  error?: string;
  valid: boolean;
  hasChevron?: boolean;
  multiline?: boolean;
  children: (props: ControlProps) => ReactNode;
};

function Field({
  name,
  label,
  icon,
  required,
  error,
  valid,
  hasChevron,
  multiline,
  children,
}: FieldProps) {
  const id = `trial-${name}`;
  const errorId = `${id}-error`;
  const iconTop = multiline ? "top-3.5" : "top-1/2 -translate-y-1/2";

  return (
    <div className="flex flex-col gap-1.5">
      <div className={cn("flex gap-3.5", multiline ? "items-start pt-3" : "items-center")}>
        {icon}
        <div className="relative min-w-0 flex-1">
          {/* Label sits on the top border, as in the design. */}
          <label
            htmlFor={id}
            className="absolute -top-2 left-2.5 z-10 bg-white px-1 text-xs/4 text-[#4b5165]"
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
            "aria-describedby": error ? errorId : undefined,
          })}
          {hasChevron ? (
            <ChevronDownIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-10 size-4.5 -translate-y-1/2 text-[#4b5165]"
            />
          ) : null}
          {valid ? (
            <CircleCheckIcon
              aria-hidden
              className={cn("pointer-events-none absolute right-3 size-5 text-white", iconTop)}
              fill="#22a35a"
              strokeWidth={2.25}
            />
          ) : null}
        </div>
      </div>
      {error ? (
        <p id={errorId} className="pl-9 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
