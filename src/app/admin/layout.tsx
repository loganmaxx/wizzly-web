import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Studio",
  description: "Private admin studio for managing Wizzly milestone, supporter wall, and roadmap.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
