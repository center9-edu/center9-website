import type { Metadata } from "next";

import {
  AboutApproachSection,
  AboutHeroSection,
  AboutMissionSection,
  AboutStorySection,
} from "@/features/about/components/about-sections";
import { CtaSection } from "@/features/home/components/cta-section";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description:
    "Center9Edu là trung tâm giáo dục công nghệ dành cho học sinh 8–18 tuổi, giúp các em phát triển tư duy logic, khả năng sáng tạo và năng lực giải quyết vấn đề qua lập trình và khoa học máy tính.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20">
      <AboutHeroSection />
      <AboutStorySection />
      <AboutMissionSection />
      <AboutApproachSection />
      <CtaSection />
    </div>
  );
}
