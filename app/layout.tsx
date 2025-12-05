import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers/ReactQueryProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
