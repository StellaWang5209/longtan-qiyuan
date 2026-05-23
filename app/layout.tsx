import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "龙潭祈愿",
  description: "围绕屏南熙岭乡龙潭村的民俗文化体验网页端 MVP。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans text-ink antialiased">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,163,75,0.12),transparent_26%),radial-gradient(circle_at_top_right,rgba(140,174,198,0.12),transparent_24%),linear-gradient(180deg,#f9f3e8_0%,#f1e7d5_52%,#ece0cd_100%)]" />
          <div className="relative">
            <Navbar />
            <main className="mx-auto min-h-[calc(100vh-170px)] max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
