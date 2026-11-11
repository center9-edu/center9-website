"use client";

import Image from "next/image";
import { CakeIcon, MailIcon } from "lucide-react";
import { useActionState, useState, type ReactNode } from "react";

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
  FIELD_LIMITS,
  type TrialRegistrationField,
  type TrialRegistrationState,
} from "@/features/leads/trial-registration";
import { cn } from "@/lib/utils";

const INITIAL_STATE: TrialRegistrationState = { status: "idle" };

const CONTROL_CLASS =
  "w-full rounded-[10px] border border-[#d6dbe5] bg-white px-4.5 text-base/[1.4] text-navy placeholder:text-[#757a8a] aria-invalid:border-destructive";

// Lucide icons for fields that have no Figma icon, matched to the vuesax "linear" set.
const LUCIDE_ICON_CLASS = "size-5.5 shrink-0 text-[#292d32]";

export function TrialRegistrationForm() {
  const [state, formAction, isPending] = useActionState(submitTrialRegistration, INITIAL_STATE);
  const [dismissedId, setDismissedId] = useState<string>();

  const errors = state.status === "error" ? state.fieldErrors : {};
  // React resets the form after every submit, so it is remounted per result and refilled
  // from the values returned on error.
  const values = state.status === "error" ? state.values : undefined;
  const formKey =
    state.status === "error"
      ? state.attemptId
      : state.status === "success"
        ? state.submissionId
        : "initial";
  const isSuccessOpen = state.status === "success" && state.submissionId !== dismissedId;

  return (
    <>
      <form key={formKey} action={formAction} noValidate className="flex w-full flex-col gap-5">
        <Field
          name="parentName"
          label="Họ và tên phụ huynh"
          icon={<FieldImage src="/images/registration/icon-user.svg" />}
          error={errors.parentName}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              required
              maxLength={FIELD_LIMITS.parentName}
              placeholder="Họ và tên phụ huynh"
              defaultValue={values?.parentName}
              className={cn(CONTROL_CLASS, "h-13")}
            />
          )}
        </Field>
        <Field
          name="phone"
          label="Số điện thoại"
          icon={<FieldImage src="/images/registration/icon-call.svg" />}
          error={errors.phone}
        >
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="Số điện thoại"
              defaultValue={values?.phone}
              className={cn(CONTROL_CLASS, "h-13")}
            />
          )}
        </Field>
        <Field
          name="studentName"
          label="Tên học viên"
          icon={<FieldImage src="/images/registration/icon-people.svg" />}
          error={errors.studentName}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              required
              maxLength={FIELD_LIMITS.studentName}
              placeholder="Tên học viên"
              defaultValue={values?.studentName}
              className={cn(CONTROL_CLASS, "h-13")}
            />
          )}
        </Field>
        <Field
          name="studentAge"
          label="Tuổi học viên"
          icon={<CakeIcon aria-hidden className={LUCIDE_ICON_CLASS} strokeWidth={1.5} />}
          error={errors.studentAge}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              inputMode="numeric"
              required
              maxLength={2}
              placeholder="Tuổi học viên"
              defaultValue={values?.studentAge}
              className={cn(CONTROL_CLASS, "h-13")}
            />
          )}
        </Field>
        <Field
          name="email"
          label="Email"
          icon={<MailIcon aria-hidden className={LUCIDE_ICON_CLASS} strokeWidth={1.5} />}
          error={errors.email}
        >
          {(props) => (
            <input
              {...props}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={FIELD_LIMITS.email}
              placeholder="Email"
              defaultValue={values?.email}
              className={cn(CONTROL_CLASS, "h-13")}
            />
          )}
        </Field>
        <Field
          name="note"
          label="Ghi chú thêm"
          icon={<FieldImage src="/images/registration/icon-note.svg" />}
          error={errors.note}
        >
          {(props) => (
            <textarea
              {...props}
              rows={2}
              maxLength={FIELD_LIMITS.note}
              placeholder="Ghi chú thêm"
              defaultValue={values?.note}
              className={cn(CONTROL_CLASS, "h-19.5 resize-none py-3.5")}
            />
          )}
        </Field>

        {/* Honeypot for bots; hidden from people and assistive technology. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] size-px opacity-0"
        />

        {state.status === "error" ? (
          <p role="alert" className="text-center text-sm text-destructive">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="h-15.5 w-full rounded-[40px] bg-linear-to-r from-[#3366e5] to-[#6e47db] text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70 sm:text-xl"
        >
          {isPending ? "Đang gửi đăng ký…" : "Đăng ký học thử miễn phí"}
        </button>
      </form>

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
            Đăng ký thành công
          </DialogTitle>
          <DialogDescription className="mt-2 max-w-90.5 text-[17px]/[22px] tracking-[-0.24px] text-ink-body">
            Center9Edu đã nhận được thông tin và sẽ liên hệ với ba mẹ để xác nhận lịch học thử.
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

type ControlProps = {
  id: string;
  name: TrialRegistrationField;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

type FieldProps = {
  name: TrialRegistrationField;
  label: string;
  icon: ReactNode;
  error?: string;
  children: (props: ControlProps) => ReactNode;
};

function Field({ name, label, icon, error, children }: FieldProps) {
  const id = `trial-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3.5">
        {icon}
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        {children({
          id,
          name,
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? errorId : undefined,
        })}
      </div>
      {error ? (
        <p id={errorId} className="pl-9 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FieldImage({ src }: { src: string }) {
  return <Image src={src} alt="" width={22} height={22} className="size-5.5 shrink-0" />;
}
