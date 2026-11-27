import Link from "next/link";

import { cn } from "@/lib/utils";

// Layout follows the Figma "about us" frame (1440 wide). Photos are not in the design yet,
// so grey placeholders keep the layout until real images arrive.

// shortcut: grey boxes stand in for photos, replace with next/image once the design has them.
function PhotoPlaceholder({ className }: { className?: string }) {
  return <div aria-hidden className={cn("w-full rounded-xl bg-[#d9d9d9]", className)} />;
}

export function AboutHeroSection() {
  return (
    <section className="bg-navy text-white">
      <div className="container-page grid items-center gap-10 py-12 lg:min-h-200.75 lg:grid-cols-2 lg:gap-4 lg:py-20">
        <div className="flex flex-col items-start gap-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl/[1.15] font-medium sm:text-5xl/[1.1] xl:text-[56px]/[60px]">
              Nuôi dưỡng tư duy. Khơi mở sáng tạo. Làm chủ công nghệ.
            </h1>
            <p className="text-lg/7 xl:text-xl/7">
              Center9Edu là trung tâm giáo dục công nghệ dành cho học sinh 8–18 tuổi, hướng đến
              việc giúp thế hệ trẻ phát triển tư duy logic, khả năng sáng tạo và năng lực giải quyết
              vấn đề thông qua lập trình và khoa học máy tính.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex h-17 items-center rounded-full bg-brand-blue px-8 text-lg/[1.5] font-semibold transition-colors hover:bg-brand-blue/90"
          >
            Khám phá khóa học
          </Link>
        </div>
        <PhotoPlaceholder className="aspect-[632/643] rounded-[32px] lg:justify-self-end" />
      </div>
    </section>
  );
}

export function AboutStorySection() {
  return (
    <section className="container-page flex flex-col gap-10 text-navy">
      <div className="grid gap-4 lg:grid-cols-2">
        <h2 className="max-w-80 text-3xl/[1.3] font-medium xl:text-4xl/12">
          Câu chuyện về Center 9 Edu
        </h2>
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl/8 font-medium">Từ người sử dụng đến người sáng tạo công nghệ</h3>
          <div className="grid gap-4 text-base/6 sm:grid-cols-2">
            <p>
              Trẻ em ngày nay tiếp xúc với công nghệ từ rất sớm, nhưng biết sử dụng không đồng nghĩa
              với hiểu và làm chủ công nghệ. Từ việc chơi một trò chơi đến tự tạo ra trò chơi, từ
              sử dụng một ứng dụng đến hiểu cách nó vận hành, mỗi bước khám phá đều có thể giúp học
              sinh hình thành tư duy và khả năng sáng tạo.
            </p>
            <p>
              Center9Edu được xây dựng với mong muốn giúp học sinh chuyển từ việc tiếp nhận nội dung
              sang chủ động khám phá, giải quyết vấn đề và sáng tạo bằng công nghệ.
            </p>
          </div>
        </div>
      </div>
      <PhotoPlaceholder className="aspect-[1280/648]" />
    </section>
  );
}

export function AboutMissionSection() {
  return (
    <section className="container-page flex flex-col gap-10">
      <PhotoPlaceholder className="aspect-[1280/648]" />
      <div className="grid gap-6 rounded-xl bg-navy px-6 py-10 text-white lg:grid-cols-2 lg:gap-4">
        <h2 className="max-w-80 text-3xl/[1.3] font-medium xl:text-4xl/12">Sứ mệnh & Tầm nhìn</h2>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl/8 font-medium">Sứ mệnh</h3>
            <p className="text-base/6">
              Giúp học sinh phát triển tư duy logic, khả năng sáng tạo và năng lực giải quyết vấn đề
              thông qua giáo dục công nghệ, với lộ trình học tập phù hợp với từng giai đoạn phát
              triển.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl/8 font-medium">Tầm nhìn</h3>
            <p className="text-base/6">
              Xây dựng một môi trường giáo dục công nghệ nơi thế hệ trẻ được khuyến khích khám phá,
              sáng tạo và phát triển năng lực để thích nghi với thế giới công nghệ không ngừng thay
              đổi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const APPROACH_STEPS = [
  {
    title: "Khám phá",
    description:
      "Bắt đầu từ những câu hỏi, ví dụ và tình huống gần gũi để học sinh hiểu vấn đề và hình thành sự tò mò với kiến thức mới.",
  },
  {
    title: "Thực hành",
    description:
      "Vận dụng kiến thức qua bài tập và hoạt động thực hành, giúp học sinh từng bước hình thành kỹ năng và cách giải quyết vấn đề.",
  },
  {
    title: "Sáng tạo",
    description:
      "Khuyến khích học sinh ứng dụng những gì đã học để xây dựng trò chơi, chương trình hoặc sản phẩm công nghệ mang ý tưởng riêng.",
  },
  {
    title: "Đánh giá và phát triển",
    description:
      "Thông qua phản hồi và việc nhìn lại quá trình thực hiện, học sinh nhận ra những điểm đã làm tốt, những điều cần cải thiện và hướng phát triển tiếp theo.",
  },
];

// Steps alternate text/photo sides on large screens, as in the design.
export function AboutApproachSection() {
  return (
    <section className="container-page">
      <ol className="flex flex-col gap-10">
        {APPROACH_STEPS.map((step, index) => (
          <li key={step.title} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-4">
            <div
              className={cn(
                "flex max-w-131 flex-col gap-3 text-navy",
                index % 2 === 1 && "lg:order-last",
              )}
            >
              <h2 className="text-2xl/8 font-medium">{step.title}</h2>
              <p className="text-base/6">{step.description}</p>
            </div>
            <PhotoPlaceholder className="aspect-[632/400]" />
          </li>
        ))}
      </ol>
    </section>
  );
}
