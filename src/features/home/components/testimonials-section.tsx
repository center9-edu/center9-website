import { SectionHeading } from "@/features/home/components/section-heading";
import { TestimonialCarousel } from "@/features/home/components/testimonial-carousel";
import { TESTIMONIALS } from "@/features/home/content";

export function TestimonialsSection() {
  return (
    <section className="bg-[#4060ff]/5">
      <div className="container-page flex flex-col items-center gap-8 py-12 lg:py-20">
        <SectionHeading title="Phụ huynh & học viên nói gì?" />
        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </div>
    </section>
  );
}
