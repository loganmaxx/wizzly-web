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
    "Download Wizzly v0.1.1 (3.5 MB) untuk Windows 10 & 11. Hadirkan Dynamic Island Notch, Floating Karaoke, macOS-style Dock dengan Genie Effect, 4 Desktop Widgets native (Clock, Vinyl, Calendar, Memo), dan Spotlight Alt+Space.",
  keywords: [
    "Wizzly",
    "Wizzly v0.1.1",
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
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: WIZZLY_META.siteUrl,
    siteName: "Wizzly",
    title: "Wizzly v0.1.1 — Notch, Liquid Dock & Desktop Widgets untuk Windows",
    description:
      "Ubah desktop Windows 10/11 dengan Dynamic Island Notch, Dock Liquid Glass + Genie Effect, 4 Widget Native Direct2D & Spotlight Alt+Space (3.5 MB).",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Wizzly v0.1.1 — Notch, Liquid Dock, Desktop Widgets & Spotlight for Windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wizzly v0.1.1 — Notch, Liquid Dock & Desktop Widgets for Windows",
    description:
      "macOS-style Dock with Genie Effect, Dynamic Island Notch, 4 Native Desktop Widgets & Spotlight Alt+Space for Windows 10/11 (3.5 MB).",
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
    <html lang="id" className={`${jakarta.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-black text-[#f5f5f7] antialiased selection:bg-[#0071e3]/40 selection:text-white">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
