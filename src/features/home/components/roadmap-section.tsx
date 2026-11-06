import Image from "next/image";

import { DesignCanvas, box, boxVars } from "@/features/home/components/design-canvas";
import { SectionHeading } from "@/features/home/components/section-heading";
import { cn } from "@/lib/utils";

type RoadmapCardData = {
  tag: string;
  title: string;
  description: string;
  /** Step number shown inside the card on small screens, where the big numbers are hidden. */
  step?: string;
  className: string;
  tagClassName?: string;
  position: [left: number, top: number];
};

type Decoration = {
  src: string;
  box: [left: number, top: number, width: number, height: number];
  className?: string;
};

type BigNumber = { value: string; centerX: number; top: number };

// Positions are Figma pixels inside each 1440px-wide roadmap frame.
// The first frame is cropped 328px from the top, below the section heading.
const STAGE_FOUNDATION = {
  height: 708,
  decorations: [
    { src: "/images/home/roadmap-road-1.svg", box: [0, 0.5, 1371, 708] },
    { src: "/images/home/roadmap-line-1a.svg", box: [344, 42, 205, 252] },
    { src: "/images/home/roadmap-line-1b.svg", box: [976, 32.66, 232, 278] },
    { src: "/images/home/roadmap-line-1c.svg", box: [728, 392, 237, 237] },
    { src: "/images/home/roadmap-car-1-removebg-preview.png", box: [65, 397, 166, 166] },
    { src: "/images/home/roadmap-pipe.png", box: [657, 568, 125.43, 231], className: "-scale-x-100" },
  ] satisfies Decoration[],
  numbers: [
    { value: "01", centerX: 121, top: 50 },
    { value: "02", centerX: 833.5, top: 157 },
    { value: "03", centerX: 1235, top: 506 },
  ] satisfies BigNumber[],
  cards: [
    {
      step: "01",
      tag: "SCRATCH",
      title: "Creative Coding",
      description:
        "Làm quen với lập trình thông qua trò chơi, hoạt hình và các sản phẩm tương tác.",
      className: "bg-[#ffd86b]",
      tagClassName: "bg-black/60",
      position: [205, 22],
    },
    {
      step: "02",
      tag: "PYTHON",
      title: "Python Programming",
      description:
        "Phát triển nền tảng lập trình văn bản với Python, xây dựng chương trình và rèn tư duy giải quyết vấn đề.",
      className: "bg-[#b9f199]",
      position: [929.58, 130.47],
    },
    {
      step: "03",
      tag: "CS",
      title: "Computer Science",
      description:
        "Hiểu cách thuật toán xử lý dữ liệu, cách máy tính và Internet vận hành, cùng các vấn đề về bảo mật và tác động của công nghệ.",
      className: "bg-[#c9b7ff] xl:rotate-[0.7deg]",
      position: [835.2, 472.9],
    },
  ] satisfies RoadmapCardData[],
};

const STAGE_PATHWAYS = {
  height: 1036,
  decorations: [
    { src: "/images/home/roadmap-round.png", box: [427, 168, 586, 698] },
    { src: "/images/home/roadmap-line-2a.svg", box: [298, 165, 246, 265] },
    { src: "/images/home/roadmap-line-2b.svg", box: [845, 131, 255, 205] },
    { src: "/images/home/roadmap-line-2c.svg", box: [916.66, 620, 205, 255] },
    { src: "/images/home/roadmap-line-2d.svg", box: [951.66, 353, 278, 232] },
    { src: "/images/home/roadmap-line-2e.svg", box: [263, 566.66, 255, 205] },
    { src: "/images/home/roadmap-round-exit.svg", box: [668, 824, 103, 165] },
    { src: "/images/home/roadmap-car-2-removebg-preview.png", box: [764, 216, 231.5, 231.5] },
    { src: "/images/home/roadmap-pipe.png", box: [657, 825, 125.43, 231], className: "-scale-x-100" },
    { src: "/images/home/roadmap-pipe.png", box: [657, -24, 125.43, 231], className: "rotate-180" },
  ] satisfies Decoration[],
  cards: [
    {
      tag: "TECH PATHWAYS",
      title: "Web & App",
      description: "Phát triển Website & Ứng dụng",
      className: "bg-[#a8b0ff]",
      position: [145, 145],
    },
    {
      tag: "TECH PATHWAYS",
      title: "Game Development",
      description: "Phát triển Game",
      className: "bg-[#bfe8ff]",
      position: [942, 79],
    },
    {
      tag: "TECH PATHWAYS",
      title: "Robotics & IoT",
      description: "Robot & Thiết bị thông minh",
      className: "bg-[#ffe6a6]",
      position: [1071, 404],
    },
    {
      tag: "TECH PATHWAYS",
      title: "Data & AI",
      description: "Dữ liệu & Trí tuệ nhân tạo",
      className: "bg-[#ff84b2]",
      position: [85, 601],
    },
    {
      tag: "TECH PATHWAYS",
      title: "Algorithms & Coding",
      description: "Thuật toán và lập trình thi đấu",
      className: "bg-[#99f1c8]",
      position: [980, 740],
    },
  ] satisfies RoadmapCardData[],
};

const STAGE_SPECIALIZATION = {
  height: 1036,
  decorations: [
    { src: "/images/home/roadmap-road-3.svg", box: [322.5, 0, 1051, 1036] },
    { src: "/images/home/roadmap-line-3.svg", box: [468, 371, 151, 240] },
    { src: "/images/home/roadmap-car-3-removebg-preview.png", box: [637, 111, 166, 166] },
    { src: "/images/home/roadmap-flag-removebg-preview.png", box: [713, 857, 167, 126] },
    { src: "/images/home/roadmap-pipe.png", box: [657, -120, 125.43, 231], className: "rotate-180" },
    { src: "/images/home/roadmap-pipe.png", box: [671, 975, 125.43, 231], className: "-scale-x-100" },
  ] satisfies Decoration[],
  numbers: [{ value: "05", centerX: 201, top: 329 }] satisfies BigNumber[],
  cards: [
    {
      step: "05",
      tag: "SPECIALIZATION",
      title: "Advanced Specialization",
      description:
        "Lựa chọn một hướng để học chuyên sâu, thực hiện dự án thực tế và xây dựng portfolio cá nhân.",
      className: "bg-[#ffd078]",
      position: [311, 301],
    },
  ] satisfies RoadmapCardData[],
};

const CANVAS_CLASS = "items-center gap-5";

export function RoadmapSection() {
  return (
    <section className="overflow-hidden bg-white pb-12 select-none xl:pb-0">
      <div className="container-page pt-12 pb-10 lg:pt-20 xl:pb-0">
        <SectionHeading
          title="Hành trình phát triển năng lực công nghệ 8–18 tuổi"
          description={
            <>
              Từng bước xây dựng tư duy, năng lực sáng tạo và khả năng làm chủ công nghệ trong
              tương lai.
              <span className="mt-3 block text-[15px]/5 font-medium tracking-[-0.16px] italic">
                “Tham khảo CSTA 2026 PK–12 Computer Science Standards”
              </span>
            </>
          }
        />
      </div>

      <DesignCanvas height={STAGE_FOUNDATION.height} className={cn(CANVAS_CLASS, "xl:mt-[min(8.2vw,118px)]")}>
        <Decorations items={STAGE_FOUNDATION.decorations} />
        <BigNumbers items={STAGE_FOUNDATION.numbers} />
        <RoadmapCards items={STAGE_FOUNDATION.cards} />
      </DesignCanvas>

      <DesignCanvas height={STAGE_PATHWAYS.height} className={cn(CANVAS_CLASS, "mt-10 xl:mt-0")}>
        <Decorations items={STAGE_PATHWAYS.decorations} />
        {/* Figma: "04" at y 388 and the label box 246 × 84 at (597, 538), both centred on x 720. */}
        <p className="flex flex-col items-center text-center text-black xl:contents">
          <span
            className="text-6xl font-semibold canvas-item xl:w-[calc(246*var(--dp))] xl:text-[length:calc(149.5*var(--dp))]/[1.05]"
            style={boxVars(597, 388)}
          >
            04
          </span>
          <span
            className="flex flex-col text-2xl/[1.05] font-bold canvas-item xl:w-[calc(246*var(--dp))] xl:text-[length:calc(36*var(--dp))]/[1.167]"
            style={boxVars(597, 538)}
          >
            <span className="whitespace-nowrap">Technology</span>
            <span className="whitespace-nowrap">Pathways</span>
          </span>
        </p>
        <RoadmapCards items={STAGE_PATHWAYS.cards} />
      </DesignCanvas>

      <DesignCanvas
        height={STAGE_SPECIALIZATION.height}
        className={cn(CANVAS_CLASS, "mt-10 xl:mt-0")}
      >
        <Decorations items={STAGE_SPECIALIZATION.decorations} />
        <BigNumbers items={STAGE_SPECIALIZATION.numbers} />
        <RoadmapCards items={STAGE_SPECIALIZATION.cards} />
        <div
          className="mt-6 flex w-full max-w-[21.786rem] flex-col gap-3 canvas-item xl:mt-0 xl:w-[calc(470*var(--dp))] xl:max-w-none"
          style={boxVars(880, 744)}
        >
          <h3 className="text-2xl/[1.4] font-semibold text-navy xl:text-[length:calc(44*var(--dp))]/[1.4]">
            Hành trang tương lai
          </h3>
          <p className="text-[17px]/[22px] tracking-[-0.24px] text-ink-muted xl:text-[length:calc(17*var(--dp))]/[1.294]">
            Dự án thực tế → Portfolio cá nhân → <br />
            Cuộc thi công nghệ → <br />
            Định hướng đại học & nghề nghiệp
          </p>
        </div>
      </DesignCanvas>
    </section>
  );
}

function Decorations({ items }: { items: Decoration[] }) {
  return items.map((item, index) => {
    const [left, top, width, height] = item.box;
    return (
      <Image
        key={`${item.src}-${index}`}
        src={item.src}
        alt=""
        width={Math.round(width)}
        height={Math.round(height)}
        draggable={false}
        className={cn("absolute hidden max-w-none xl:block", item.className)}
        style={box(left, top, width, height)}
      />
    );
  });
}

function BigNumbers({ items }: { items: BigNumber[] }) {
  return items.map((item) => (
    <span
      key={item.value}
      aria-hidden
      className="absolute hidden -translate-x-1/2 text-[length:calc(128*var(--dp))]/normal font-semibold text-black xl:block"
      style={box(item.centerX, item.top)}
    >
      {item.value}
    </span>
  ));
}

// Sized in `em` (1em = 14 Figma px) so the card scales with the canvas on large screens.
function RoadmapCards({ items }: { items: RoadmapCardData[] }) {
  return (
    <ul className="contents">
      {items.map((card) => (
        <li
          key={card.title}
          className={cn(
            "flex min-h-[12.571em] w-full max-w-[21.786em] flex-col gap-[0.714em] rounded-[1.571em] border-[0.143em] border-white px-[1.571em] py-[1.714em] text-[14px] drop-shadow-[0px_5px_6px_rgba(7,29,58,0.1)] canvas-item xl:text-[length:calc(14*var(--dp))]",
            card.className,
          )}
          style={boxVars(card.position[0], card.position[1])}
        >
          <span
            className={cn(
              "self-start rounded-full bg-black px-[0.571em] py-[0.286em] text-[0.929em] font-bold text-white",
              card.tagClassName,
            )}
          >
            {card.step ? <span className="xl:hidden">{card.step} · </span> : null}
            {card.tag}
          </span>
          <h3 className="text-[1.5em] font-semibold text-navy">{card.title}</h3>
          <p className="leading-[1.2] text-navy">
            {card.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
