import { CtaSection } from "@/features/home/components/cta-section";
import { FaqSection } from "@/features/home/components/faq-section";
import { FeaturedCoursesSection } from "@/features/home/components/featured-courses-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { LearningJourneySection } from "@/features/home/components/learning-journey-section";
import { ParentConcernsSection } from "@/features/home/components/parent-concerns-section";
import { QuoteSection } from "@/features/home/components/quote-section";
import { RoadmapSection } from "@/features/home/components/roadmap-section";
import { StudentProjectsSection } from "@/features/home/components/student-projects-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ParentConcernsSection />
      <QuoteSection />
      <LearningJourneySection />
      <RoadmapSection />
      <FeaturedCoursesSection />
      <StudentProjectsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
