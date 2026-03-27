import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSD Studio | Cinematic Photography",
  description: "Dark, cinematic photography experiences tailored to how you see the world."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-surface text-slate-100">
      <body className="font-sans antialiased min-h-screen">
        <div className="min-h-screen overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
