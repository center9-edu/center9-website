import Image from "next/image";

import { DesignCanvas, box, boxVars } from "@/features/home/components/design-canvas";

export function QuoteSection() {
  return (
    <section className="overflow-hidden bg-navy text-white">
      <DesignCanvas
        height={1024}
        className="container-page flex flex-col gap-8 py-16 lg:max-w-360 lg:px-0 lg:py-0"
      >
        <Image
          src="/images/home/quote-grid.svg"
          alt=""
          width={1889}
          height={988}
          className="absolute hidden max-w-none lg:block"
          style={box(-59, 36, 1889, 988)}
        />
        <Image
          src="/images/home/quote-mark-open.svg"
          alt=""
          width={255}
          height={508}
          className="absolute hidden max-w-none rotate-180 lg:block"
          style={box(326, 150, 255, 508)}
        />
        <Image
          src="/images/home/quote-mark-close.svg"
          alt=""
          width={255}
          height={508}
          className="absolute hidden max-w-none lg:block"
          style={box(597, 404, 255, 508)}
        />

        <figure className="contents">
          <blockquote
            lang="en"
            className="text-2xl/[1.4] font-semibold sm:text-3xl/[1.4] lg:absolute lg:top-(--y) lg:left-(--x) lg:w-[calc(764*var(--dp))] lg:text-[length:calc(48*var(--dp))]"
            style={boxVars(597, 149)}
          >
            “Everybody should learn to program a computer, because it teaches you how to think.”
          </blockquote>
          <figcaption className="flex items-end gap-4 lg:contents">
            <div
              className="relative size-32 shrink-0 bg-white lg:absolute lg:top-(--y) lg:left-(--x) lg:size-[calc(254*var(--dp))]"
              style={boxVars(868, 404)}
            >
              <Image
                src="/images/home/quote-portrait.png"
                alt="Steve Jobs"
                width={254}
                height={297}
                sizes="(min-width: 1024px) 18vw, 128px"
                className="absolute bottom-0 left-0 h-[116.93%] w-full max-w-none object-cover"
              />
            </div>
            <p
              className="text-lg/[1.4] font-medium lg:absolute lg:top-(--y) lg:left-(--x) lg:text-[length:calc(24*var(--dp))]"
              style={boxVars(868, 669)}
            >
              Steve Jobs
              <br />
              CEO Apple
            </p>
          </figcaption>
        </figure>

        <p
          className="text-xl/[1.4] font-semibold text-white/90 lg:absolute lg:top-(--y) lg:left-(--x) lg:w-[calc(395*var(--dp))] lg:text-center lg:text-[length:calc(31*var(--dp))]"
          style={boxVars(190, 694)}
        >
          “Học lập trình không chỉ để tạo ra phần mềm. Mà để học cách tư duy.”
        </p>

        {/* Jagged edges blending into the neighbouring sections. */}
        <Image
          src="/images/home/quote-edge-top.svg"
          alt=""
          width={1480}
          height={180}
          className="absolute hidden max-w-none lg:block"
          style={box(-22.6, -102.7, 1480.1, 180.2)}
        />
        <Image
          src="/images/home/quote-edge-bottom.svg"
          alt=""
          width={1533}
          height={171}
          className="absolute hidden max-w-none lg:block"
          style={box(-76.8, 936, 1533.4, 171.2)}
        />
      </DesignCanvas>
    </section>
  );
}
