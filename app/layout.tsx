import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unboxed — Devouring Details",
  description: "A smart publishing platform for writers across every vertical.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#111111]">{children}</body>
    </html>
  );
}
