export const siteConfig = {
  name: "JOHANNA BRIGHT MENTORS",
  shortName: "JBM",
  slogan: "ALWAYS BEST LESSON",
  tagline: "Always Best Lesson — Learn | Practice | Build | Grow",
  description:
    "Empowering students and professionals with top-tier, practical mentorship in AI Foundation & Productivity, Professional English & Communication, and Networking in Cyber Security.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://johannabrightmentors.com",
  logo: "/images/jbm-logo.png",
  logoWithBg: "/images/jbm-logo-with-bg.png",
  ogImage: "/images/jbm-logo-with-bg.png",
  contact: {
    phone: "8778578437",
    whatsapp: "8778578437",
    email: "hello.johannabrightmentors@gmail.com",
    address: "Coimbatore, Tamil Nadu, India",
    workingHours: "Mon - Sat: 9:00 AM - 8:00 PM IST",
    website: "johannabrightmentors.com",
  },
  social: {
    whatsapp: "https://wa.me/918778578437?text=Hi%20Johanna%20Bright%20Mentors,%20I%20want%20to%20know%20more%20about%20your%20courses!",
    email: "mailto:hello.johannabrightmentors@gmail.com",
    phone: "tel:8778578437",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/#courses" },
    { label: "Why JBM", href: "/about" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
};
