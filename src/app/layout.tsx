import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Cyber Security Course",
    "Ethical Hacking Training",
    "Artificial Intelligence Course",
    "Machine Learning Bootcamp",
    "Business English Communication",
    "Tech Certifications",
    "Online Course Registration",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
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
        alt: `${siteConfig.name} - Online Course Programs`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Tech & Communication Courses`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${sora.variable}`}>
      <body className="flex flex-col min-h-screen font-sora antialiased">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
