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
  title: {
    default: "Wizzly — Dynamic Island Notch, macOS-style Dock & Spotlight for Windows",
    template: "%s | Wizzly",
  },
  description:
    "Download Wizzly (3.4 MB) untuk Windows 10 & 11. Hadirkan Dynamic Island Notch (Media, Lirik, File Shelf, Clipboard, Pomodoro), macOS-style Dock Liquid Glass, dan Spotlight Alt+Space yang super ringan.",
  keywords: [
    "Wizzly",
    "Wizzly download",
    "Windows Dynamic Island",
    "Notch for Windows",
    "macOS Dock for Windows",
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
    title: "Wizzly — Dynamic Island Notch, Dock & Spotlight untuk Windows",
    description:
      "Ubah tampilan Windows 10/11 jadi lebih produktif dengan Dynamic Island Notch, Dock Liquid Glass 4 tema, dan Spotlight Alt+Space. Ringan hanya 3.4 MB!",
    images: [
      {
        url: "/images/wizzly-icon.png",
        width: 512,
        height: 512,
        alt: "Wizzly App Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wizzly — Dynamic Island Notch & Dock for Windows",
    description:
      "macOS-style Dock, Dynamic Island Notch (Media, File Shelf, Clipboard, Timer) & Spotlight Alt+Space untuk Windows 10/11. Ringan 3.4 MB.",
    images: ["/images/wizzly-icon.png"],
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
      <body className="min-h-screen antialiased selection:bg-indigo-500/30 selection:text-white">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
