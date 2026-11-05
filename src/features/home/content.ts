// Landing page copy and media, taken from the Figma "mvp web / home" frame.

export type ParentConcern = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageBg: string;
  imageInset?: string;
};

export const PARENT_CONCERNS: ParentConcern[] = [
  {
    number: "01",
    title: "Thích game, chưa biết sáng tạo",
    description:
      "Con dành nhiều thời gian chơi game nhưng chưa có cơ hội biến sở thích đó thành khả năng sáng tạo.",
    image: "/images/home/concern-game.png",
    imageBg: "bg-[#f4c7ff]/20",
  },
  {
    number: "02",
    title: "Dùng AI, thiếu định hướng",
    description:
      "Con biết sử dụng AI và công nghệ nhưng chưa biết cách học hỏi, sáng tạo và giải quyết vấn đề.",
    image: "/images/home/concern-ai.png",
    imageBg: "bg-[#e8f8ff]",
  },
  {
    number: "03",
    title: "Chưa rõ điểm bắt đầu",
    description: "Ba mẹ chưa rõ độ tuổi, khóa học và lộ trình nào phù hợp với con.",
    image: "/images/home/concern-start.png",
    imageBg: "bg-[#ffe4c7]/20",
  },
  {
    number: "04",
    title: "Học nhưng chưa thấy kết quả",
    description:
      "Kiến thức dễ quên khi con thiếu thực hành và chưa tạo được sản phẩm cụ thể.",
    image: "/images/home/concern-result.png",
    imageBg: "bg-[#ffefc7]/75",
    imageInset: "inset-[9.25%]",
  },
];

export type JourneyStep = {
  number: string;
  title: string;
  description: string;
  pin: string;
  theme: { card: string; accent: string; text: string };
  /** Position on the 1440px Figma canvas, relative to the top of the cards area. */
  position: { left: number; top: number };
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: "01",
    title: "Đăng ký học thử",
    description: "Đề xuất khóa học và lộ trình phát triển phù hợp ngay từ đầu.",
    pin: "/images/home/journey-pin-blue.png",
    theme: { card: "bg-[#cfdeff]", accent: "bg-[#3254d6]", text: "text-[#3254d6]" },
    position: { left: 80, top: 22 },
  },
  {
    number: "02",
    title: "Đánh giá năng lực & mục tiêu học tập",
    description: "Giáo viên tìm hiểu năng lực, sở thích và mục tiêu của học viên.",
    pin: "/images/home/journey-pin-pink.png",
    theme: { card: "bg-[#ffcfec]", accent: "bg-[#d6325b]", text: "text-[#d6325b]" },
    position: { left: 538, top: 280 },
  },
  {
    number: "03",
    title: "Nhận lộ trình học phù hợp",
    description: "Đề xuất khóa học và lộ trình phát triển phù hợp ngay từ đầu.",
    pin: "/images/home/journey-pin-green.png",
    theme: { card: "bg-[#c3f3be]", accent: "bg-[#24ad12]", text: "text-[#24ad12]" },
    position: { left: 997, top: 142 },
  },
];

export type FeaturedCourse = {
  title: string;
  tagline: string;
  image: string;
  href: string;
  details: { label: string; value: string }[];
};

export const FEATURED_COURSES: FeaturedCourse[] = [
  {
    title: "Scratch & Creative Coding",
    tagline: "Bước đầu khám phá lập trình",
    image: "/images/home/course-scratch.png",
    href: "#",
    details: [
      { label: "Độ tuổi", value: "7–10 tuổi" },
      { label: "Đầu vào", value: "Không yêu cầu nền tảng" },
      { label: "Sản phẩm", value: "Game & hoạt hình tương tác" },
    ],
  },
  {
    title: "Computer Science Foundations",
    tagline: "Xây nền tảng tư duy khoa học máy tính",
    image: "/images/home/course-computer-science.png",
    href: "#",
    details: [
      { label: "Độ tuổi", value: "10+ tuổi" },
      { label: "Đầu vào", value: "Từ cơ bản" },
      { label: "Sản phẩm", value: "Python · Thuật toán · Giải quyết vấn đề" },
    ],
  },
  {
    title: "Web Development",
    tagline: "Biến ý tưởng thành sản phẩm số",
    image: "/images/home/course-web.png",
    href: "#",
    details: [
      { label: "Độ tuổi", value: "12+ tuổi" },
      { label: "Đầu vào", value: "Có nền tảng lập trình" },
      { label: "Sản phẩm", value: "Website & sản phẩm web" },
    ],
  },
  {
    title: "Data & AI",
    tagline: "Khám phá dữ liệu và trí tuệ nhân tạo",
    image: "/images/home/course-data-ai.png",
    href: "#",
    details: [
      { label: "Độ tuổi", value: "13+ tuổi" },
      { label: "Đầu vào", value: "Khuyến nghị có Python" },
      { label: "Sản phẩm", value: "Dự án dữ liệu & AI" },
    ],
  },
];

export type StudentProject = {
  title: string;
  author: string;
  image: string;
  category?: string;
  authorAvatar?: string;
};

// Placeholder showcase from the design; replace with confirmed student work before launch.
export const FEATURED_PROJECT: StudentProject = {
  title: "The Cat Apple",
  author: "Bao Ngoc",
  image: "/images/home/project-cat-apple.png",
  authorAvatar: "/images/home/avatar-bao-ngoc-small.png",
};

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    title: "Ocean Cleaner",
    author: "Max Tran",
    category: "Scratch",
    image: "/images/home/project-ocean-cleaner.png",
  },
  {
    title: "Apple Cat",
    author: "Jun Dang",
    image: "/images/home/project-apple-cat.png",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  portrait: string;
};

// Placeholder testimonials from the design; replace with confirmed feedback before launch.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bảo Ngọc",
    role: "Học viên Python",
    quote:
      "Thầy cô giảng dễ hiểu, bài học thực tế và thú vị. Em đã tự làm được nhiều project mà trước đây không nghĩ mình làm được!",
    portrait: "/images/home/portrait-bao-ngoc.png",
  },
  {
    name: "Bảo Ngọc",
    role: "Học viên Python",
    quote:
      "Thầy cô giảng dễ hiểu, bài học thực tế và thú vị. Em đã tự làm được nhiều project mà trước đây không nghĩ mình làm được!",
    portrait: "/images/home/portrait-bao-ngoc.png",
  },
  {
    name: "Bảo Ngọc",
    role: "Học viên Python",
    quote:
      "Thầy cô giảng dễ hiểu, bài học thực tế và thú vị. Em đã tự làm được nhiều project mà trước đây không nghĩ mình làm được!",
    portrait: "/images/home/portrait-bao-ngoc.png",
  },
  {
    name: "Anh Tuấn",
    role: "Phụ huynh học viên Web",
    quote:
      "Chương trình bài bản, con tiến bộ rõ rệt. Tôi rất yên tâm khi đồng hành cùng Center9Edu.",
    portrait: "/images/home/portrait-anh-tuan.png",
  },
];

export type FaqItem = {
  question: string;
  /** Answers not yet provided in the design are left out instead of being invented. */
  answer?: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Con bao nhiêu tuổi có thể bắt đầu học lập trình?",
    answer:
      "Center9Edu xây dựng lộ trình dành cho học sinh 8–18 tuổi, với nội dung phù hợp theo độ tuổi, năng lực và định hướng của từng học viên.",
  },

  {
    question: "Con chưa từng học lập trình có theo kịp không?",
    answer: "Lộ trình học từ con số 0 với khối lệnh trực quan giúp bé tiếp thu dễ dàng mà không cần nền tảng trước."
  },

  {
    question: "Center9Edu đánh giá đầu vào như thế nào?",
    answer: "Trung tâm đánh giá qua độ tuổi và buổi học thử 1:1 cùng giáo viên để xếp lớp đúng trình độ của bé."
  },

  {
    question: "Con được trải nghiệm gì trong buổi học thử?",
    answer: "Bé được làm quen giao diện lập trình, tự tay tạo một sản phẩm mini và nhận đánh giá năng lực chi tiết."
  },

  {
    question: "Center9Edu có hình thức học online hay offline?",
    answer: "Trung tâm giảng dạy 100% Online tương tác trực tiếp, giáo viên kèm cặp và sửa bài xuyên suốt buổi học."
  },

  {
    question: "Mỗi lớp có bao nhiêu học viên?",
    answer: "Lớp duy trì mô hình nhỏ từ 4 đến 6 học viên để đảm bảo chất lượng tương tác tốt nhất."
  },

  {
    question: "Học phí và chính sách học bù như thế nào?",
    answer: "Học phí đóng theo khóa, bé nghỉ có báo trước sẽ được gửi video buổi học hoặc sắp xếp học bù linh hoạt."
  },
];
