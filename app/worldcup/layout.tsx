export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const fetchCache = "force-no-store";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 - Official News, Matches & Tickets",
  description:
    "Your ultimate destination for FIFA World Cup 2026 news, matches, and official updates",
};

// 🚨 Name must NOT be RootLayout (it confuses Next bundling)
// ✔ Correct isolated layout component
export default function WorldCupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
