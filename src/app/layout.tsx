import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Sora, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#800020",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Education",
  keywords: [
    "Johanna Bright Mentors",
    "JBM Academy",
    "Cyber Security Course Coimbatore",
    "Ethical Hacking Training Tamil Nadu",
    "Artificial Intelligence Course",
    "Machine Learning Bootcamp",
    "Professional English Communication",
    "Tech Career Certifications India",
    "Live Online Mentor-Led Tech Training",
    "Hands-on Lab Training",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — Industry-Leading Tech & Professional Training`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Career Accelerator Courses`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Tech & Professional Training`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/images/jbm-favicon-white.png",
    shortcut: "/images/jbm-favicon-white.png",
    apple: "/images/jbm-favicon-white.png",
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore",
    "geo.position": "11.0168;76.9558",
    ICBM: "11.0168, 76.9558",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data: EducationalOrganization + WebSite
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}${siteConfig.logoWithBg}`,
          width: "512",
          height: "512",
        },
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        description: siteConfig.description,
        telephone: siteConfig.contact.formattedPhone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Coimbatore",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        sameAs: [
          siteConfig.social.whatsapp,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What courses are offered by Johanna Bright Mentors (JBM)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Johanna Bright Mentors offers comprehensive career-focused programs in Cyber Security, Artificial Intelligence & Machine Learning, and Professional English Communication with hands-on lab projects.",
            },
          },
          {
            "@type": "Question",
            name: "Are JBM classes conducted live or pre-recorded?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All programs feature interactive live cohort classes led by industry practitioners, complemented by practical sandbox labs, live Q&A sessions, and full recorded session access.",
            },
          },
          {
            "@type": "Question",
            name: "Do students receive a verified certificate upon completion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, every learner who completes the capstone exercises and coursework receives an officially verified Johanna Bright Mentors Certificate of Completion.",
            },
          },
          {
            "@type": "Question",
            name: "How do I enroll in a course or contact admissions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can register directly at johannabrightmentors.com/register or chat with admissions counselors via WhatsApp at +91 87785 78437.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`h-full ${jakarta.variable} ${inter.variable} ${sora.variable} ${playfair.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className="flex flex-col min-h-screen font-sans antialiased text-slate-800 bg-white">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
