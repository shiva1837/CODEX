import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "SSD Studio | Cinematic Photography",
  description: "Dark, cinematic photography experiences tailored to how you see the world."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-surface text-slate-100">
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <div className="min-h-screen overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
