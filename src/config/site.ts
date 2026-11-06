export type NavItem = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  title: string;
  links: { label: string; href?: string }[];
};

export const SITE_CONFIG = {
  name: "Center9Edu",
  description:
    "Trung tâm giáo dục công nghệ dành cho học sinh 8–18 tuổi, với lộ trình cá nhân hóa.",
  hotline: "0368 684 695",
  supportHours: "8:00–22:00 hằng ngày",
} as const;

export const MAIN_NAV: NavItem[] = [
  { label: "Khoá học", href: "#" },
  { label: "Sản phẩm học viên", href: "#" },
  { label: "Tin tức - Sự kiện", href: "#" },
  { label: "Về chúng tôi", href: "#" },
];

export const TRIAL_CTA: NavItem = {
  label: "Đăng ký học thử",
  href: "/dang-ky-hoc-thu",
};

// Social links have no `href` yet; they render as plain text until the URLs are confirmed.
export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Khám phá",
    links: [
      { label: "Trang chủ", href: "/" },
      { label: "Về Center9Edu", href: "#" },
      { label: "Lộ trình học", href: "#" },
      { label: "Các khóa học", href: "#" },
      { label: "Sản phẩm học viên", href: "#" },
    ],
  },
  {
    title: "Khoá học",
    links: [
      { label: "Scratch", href: "#" },
      { label: "Python Programming", href: "#" },
      { label: "Web Development", href: "#" },
      { label: "Data & AI", href: "#" },
    ],
  },
  {
    title: "Kết nối",
    links: [{ label: "Facebook" }, { label: "Tiktok" }, { label: "Zalo" }],
  },
];
