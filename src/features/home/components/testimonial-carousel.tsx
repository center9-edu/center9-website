"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import type { Testimonial } from "@/features/home/content";
import { cn } from "@/lib/utils";

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = (track.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
    setActiveIndex(Math.round(track.scrollLeft / cardWidth));
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex w-full items-center justify-center gap-4 lg:gap-6">
        <CarouselButton
          direction="previous"
          onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
        />
        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto py-3 [scrollbar-width:none] lg:max-w-[calc(4*275px+3*24px)]"
        >
          {testimonials.map((testimonial, index) => (
            <li
              key={index}
              className="flex min-h-105 w-68.75 shrink-0 snap-start flex-col items-center gap-4.5 rounded-[28px] bg-white px-7.5 py-8.5 text-center drop-shadow-[0px_10px_12px_rgba(15,26,64,0.06)]"
            >
              <Image
                src={testimonial.portrait}
                alt=""
                width={128}
                height={128}
                className="size-32 rounded-full"
              />
              <figure className="flex flex-col items-center gap-2.5">
                <figcaption className="flex flex-col items-center gap-2.5">
                  <span className="text-[23px]/[1.4] font-bold text-[#050d33]">
                    {testimonial.name}
                  </span>
                  <span className="text-base/[1.4] text-[#6176a0]">{testimonial.role}</span>
                </figcaption>
                <span aria-hidden className="h-px w-53.75 rounded-[1px] bg-[#e5ebf5]" />
                <blockquote className="text-base/[1.4] text-[#404557]">
                  {testimonial.quote}
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
        <CarouselButton
          direction="next"
          onClick={() => scrollToIndex(Math.min(activeIndex + 1, testimonials.length - 1))}
        />
      </div>
      <div className="flex gap-2.5">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Xem đánh giá ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              index === activeIndex ? "bg-[#1a73e8]" : "bg-[#d0d5dd]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "previous" ? "Đánh giá trước" : "Đánh giá tiếp theo"}
      className="hidden size-14.5 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_8px_20px_0px_rgba(13,31,64,0.08)] transition-colors hover:bg-muted sm:flex"
    >
      <Image
        src={
          direction === "previous"
            ? "/images/home/icon-arrow-left.svg"
            : "/images/home/icon-arrow-right.svg"
        }
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}
