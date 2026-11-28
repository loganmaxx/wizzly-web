import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { WIZZLY_META } from "@/data/wizzlyData";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(WIZZLY_META.siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Wizzly — Dynamic Island Notch, macOS-style Dock, Widgets & Spotlight for Windows",
    template: "%s | Wizzly",
  },
  description:
    "Download Wizzly v0.1.3 (3.9 MB, recommended web installer) for Windows 10 & 11. Brings a Dynamic Island Notch with Prayer Times & Live Privacy Indicators, macOS-style Dock with Genie Effect & Spaces Switcher, 4 Native Direct2D Desktop Widgets, and Alt+Space Spotlight.",
  keywords: [
    "Wizzly",
    "Wizzly v0.1.3",
    "Wizzly Microsoft Store",
    "Wizzly download",
    "Windows Dynamic Island",
    "Notch for Windows",
    "macOS Dock for Windows",
    "Windows Desktop Widgets",
    "Genie Effect Windows",
    "Windows 11 Dock",
    "Spotlight Windows",
    "Tauri Windows utility",
  ],
  authors: [{ name: "Adrian" }],
  creator: "Adrian",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: WIZZLY_META.siteUrl,
    siteName: "Wizzly",
    title: "Wizzly v0.1.3 — Notch, Liquid Dock & Desktop Widgets for Windows",
    description:
      "Transform your Windows 10/11 desktop with Dynamic Island Notch, Prayer Times, Liquid Glass Dock + Genie Effect, 4 Native Direct2D Widgets & Alt+Space Spotlight (3.9 MB).",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Wizzly v0.1.3 — Notch, Liquid Dock, Desktop Widgets & Spotlight for Windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wizzly v0.1.3 — Notch, Liquid Dock & Desktop Widgets for Windows",
    description:
      "macOS-style Dock with Genie Effect, Dynamic Island Notch with Prayer Times, 4 Native Desktop Widgets & Spotlight Alt+Space for Windows 10/11 (3.9 MB).",
    images: ["/images/og-cover.png"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/images/wizzly-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[#070708] text-[#fafafa] antialiased selection:bg-amber-400/25 selection:text-white">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
