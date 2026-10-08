export const siteConfig = {
  name: "JOHANNA BRIGHT MENTORS",
  shortName: "JBM",
  slogan: "ALWAYS BEST LESSON",
  tagline: "Learn. Practice. Build. Grow.",
  subtitle: "Industry-focused learning for students, graduates and aspiring professionals.",
  description:
    "At Johanna Bright Mentors (JBM), we help learners develop practical, career-focused skills through structured learning, live mentorship, hands-on practice and real-world projects. Explore our programs in Artificial Intelligence, Professional Communication and Cyber Security.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.johannabrightmentors.com",
  logo: "/images/jbm-logo-with-bg.png",
  logoWithBg: "/images/jbm-logo-with-bg.png",
  ogImage: "/images/jbm-og-banner.png",
  contact: {
    phone: "87785 78437",
    formattedPhone: "+91 87785 78437",
    rawPhone: "918778578437",
    whatsapp: "+91 87785 78437",
    rawWhatsapp: "918778578437",
    email: "hello.johannabrightmentors@gmail.com",
    address: "Coimbatore, Tamil Nadu, India",
    workingHours: "Mon - Sat: 9:00 AM - 8:00 PM IST",
    website: "www.johannabrightmentors.com",
  },
  social: {
    whatsapp: `https://wa.me/918778578437?text=${encodeURIComponent(
      `🌟 Welcome to Johanna Bright Mentors (JBM)! 🌟\n\nThank you for reaching out to us! 😊\n\nWe’re delighted to connect with you. At JBM, we are committed to empowering individuals through quality education, skill development, and career guidance.\n\n💬 How may we assist you today?\n\nFeel free to share your queries or requirements. Our team will be happy to guide you.\n\nWarm Regards,\nTeam JBM\nJohanna Bright Mentors\nLearn • Grow • Succeed 🚀`
    )}`,
    email: "mailto:hello.johannabrightmentors@gmail.com",
    phone: "tel:+918778578437",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Programs", href: "/#courses" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "For Institutions", href: "/#institutions" },
    { label: "Contact", href: "/#contact" },
  ],
};
