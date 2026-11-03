import Image from "next/image";

import { SectionHeading } from "@/features/home/components/section-heading";
import { FAQ_ITEMS } from "@/features/home/content";

const ITEM_CLASS =
  "w-full rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(171,171,171,0.06)_100%),linear-gradient(90deg,rgba(64,96,255,0.05),rgba(64,96,255,0.05))] px-5 py-4";

export function FaqSection() {
  return (
    <section className="bg-[#f8f9fb]">
      <div className="container-page flex flex-col items-center gap-10 py-12 lg:gap-15 lg:py-20">
        <SectionHeading title="Câu hỏi thường gặp" />
        <ul className="flex w-full max-w-171.25 flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => (
            <li key={item.question}>
              {item.answer ? (
                <details open={index === 0} className={`group ${ITEM_CLASS}`}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg/6 font-medium tracking-[-0.176px] text-black [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Image
                      src="/images/home/icon-plus.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="shrink-0 group-open:hidden"
                    />
                    <Image
                      src="/images/home/icon-minus.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="hidden shrink-0 group-open:block"
                    />
                  </summary>
                  <p className="mt-3 text-base/6 tracking-[-0.176px] text-black">{item.answer}</p>
                </details>
              ) : (
                // Answer pending content confirmation: shown as a question only, not expandable.
                <p className={`text-lg/6 font-medium tracking-[-0.176px] text-black ${ITEM_CLASS}`}>
                  {item.question}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
