import Image from "next/image";

import { TrialRegistrationForm } from "@/features/leads/components/trial-registration-form";

// Layout follows the Figma "Registration Section" frame (1440 × 924).
export function TrialRegistrationSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6f9fe]">
      <Image
        src="/images/registration/registration-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-bottom-left lg:block"
      />
      <div className="container-page relative grid items-start gap-10 py-10 lg:min-h-231 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-center lg:gap-12 lg:py-13">
        <div className="flex flex-col items-center lg:h-full lg:pt-18">
          <h1 className="max-w-155.5 text-center text-2xl/[1.4] font-semibold text-balance text-[#050d33] sm:text-3xl/[1.4] xl:text-4xl/[1.4]">
            Mỗi hành trình đều bắt đầu từ bước đầu tiên. Hãy để Center9Edu đồng hành cùng con.
          </h1>
          {/* Below lg the illustration from the background is shown as a cropped image. */}
          <div className="relative mt-6 aspect-[1.42] w-full max-w-130 overflow-hidden lg:hidden">
            <Image
              src="/images/registration/registration-bg.jpg"
              alt=""
              width={2160}
              height={1384}
              sizes="(min-width: 640px) 1040px, 200vw"
              className="absolute bottom-0 left-0 w-[200%] max-w-none"
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-140 flex-col items-center gap-5 rounded-[28px] bg-white px-5 pt-9 pb-8.5 shadow-[0px_12px_28px_0px_rgba(13,26,64,0.07)] sm:px-10.5">
          <div className="flex size-15.5 items-center justify-center rounded-full border border-[#d1d6f0]">
            <Image src="/images/registration/icon-document.svg" alt="" width={28} height={28} />
          </div>
          <h2 className="text-center text-2xl/[34px] font-semibold tracking-[-0.3px] text-[#050d33] sm:text-[28px]/[34px]">
            Đăng ký học thử miễn phí
          </h2>
          <p className="text-center text-sm/[1.4] text-[#757a8a]">
            Trải nghiệm 45 phút · Đánh giá đầu vào · Tư vấn lộ trình
          </p>
          <span aria-hidden className="h-1 w-12 rounded-full bg-[#6147d1]" />

          <TrialRegistrationForm />

          <p className="flex items-start gap-2.5 text-sm/[1.4] text-[#757a8a]">
            <Image
              src="/images/registration/icon-shield.svg"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />
            Center9Edu sẽ liên hệ để xác nhận lịch học thử và tư vấn lộ trình phù hợp.
          </p>
        </div>
      </div>
    </section>
  );
}
