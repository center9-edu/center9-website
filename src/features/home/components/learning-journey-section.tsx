import Image from "next/image";

import { DesignCanvas, box, boxVars } from "@/features/home/components/design-canvas";
import { SectionHeading } from "@/features/home/components/section-heading";
import { JOURNEY_STEPS, type JourneyStep } from "@/features/home/content";
import { cn } from "@/lib/utils";

export function LearningJourneySection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Image
        src="/images/home/journey-grid.svg"
        alt=""
        width={1889}
        height={988}
        className="absolute top-[-28px] left-1/2 hidden max-w-none -translate-x-1/2 xl:block"
      />
      <div className="container-page relative pt-12 lg:pt-20">
        <SectionHeading
          title="Lộ trình học được thiết kế cho từng học viên"
          description="Từ buổi học thử, Center9Edu đánh giá điểm xuất phát và đề xuất lộ trình phù hợp với độ tuổi, năng lực và mục tiêu của con"
        />
      </div>
      {/* Canvas starts 200px below the top of the Figma frame, where the cards area begins. */}
      <DesignCanvas
        height={788}
        className="items-center gap-14 pt-16 pb-12"
      >
        <Image
          src="/images/home/journey-path.svg"
          alt=""
          width={1490}
          height={260}
          className="absolute hidden max-w-none xl:block"
          style={box(-24, 226, 1490, 260.2)}
        />
        <ol className="contents">
          {JOURNEY_STEPS.map((step) => (
            <JourneyCard key={step.number} step={step} />
          ))}
        </ol>
      </DesignCanvas>
    </section>
  );
}

// Sized in `em` (1em = 16 Figma px) so the card scales with the canvas on large screens.
function JourneyCard({ step }: { step: JourneyStep }) {
  return (
    <li
      className={cn(
        "relative w-full max-w-[22.6875em] rounded-[2em] border-4 border-white px-[1.25em] pt-[6.75em] pb-[1.75em] text-[16px] drop-shadow-[0px_12px_14px_rgba(13,31,77,0.16)] canvas-item xl:text-[length:calc(16*var(--dp))]",
        step.theme.card,
      )}
      style={boxVars(step.position.left, step.position.top)}
    >
      <Image
        src={step.pin}
        alt=""
        width={101}
        height={79}
        className="absolute top-[-1.1875em] left-1/2 h-[4.9375em] w-[6.3125em] max-w-none -translate-x-1/2 object-contain drop-shadow-[-6px_4px_4.5px_rgba(0,0,0,0.25)]"
      />
      <span
        className={cn(
          "absolute top-[4.25em] right-[3em] flex size-[5em] items-center justify-center rounded-[1.25em]",
          step.theme.accent,
        )}
      >
        <Image
          src="/images/home/icon-calendar-edit.svg"
          alt=""
          width={48}
          height={48}
          className="size-[3em]"
        />
      </span>
      <div className="flex min-h-[18.25em] flex-col gap-[1em] rounded-[2.5em] bg-white px-[1em] pt-[2em] pb-[2.5em]">
        <span className={cn("text-[5em]/[1.2] font-medium tracking-[-0.3px]", step.theme.text)}>
          {step.number}
        </span>
        <h3 className="max-w-[9.5em] text-[1.75em]/[1.214] font-semibold tracking-[-0.3px] text-[#05132e]">
          {step.title}
        </h3>
        <p className="text-[1.0625em]/[1.294] tracking-[-0.24px] text-[#3b404f]">
          {step.description}
        </p>
      </div>
    </li>
  );
}
