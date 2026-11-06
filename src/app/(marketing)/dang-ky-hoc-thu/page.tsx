import type { Metadata } from "next";

import { TrialRegistrationSection } from "@/features/leads/components/trial-registration-section";

export const metadata: Metadata = {
  title: "Đăng ký học thử miễn phí",
  description:
    "Đăng ký buổi học thử miễn phí tại Center9Edu: trải nghiệm 45 phút, đánh giá đầu vào và tư vấn lộ trình học công nghệ phù hợp cho con.",
};

export default function TrialRegistrationPage() {
  return <TrialRegistrationSection />;
}
