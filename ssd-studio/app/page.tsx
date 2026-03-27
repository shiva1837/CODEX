"use client";

import BookingForm from "@/components/BookingForm";
import CanvasBackground from "@/components/CanvasBackground";
import HeroOverlay from "@/components/HeroOverlay";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-900 text-white">
      <CanvasBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,140,191,0.12),transparent_32%)] blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(98,210,255,0.12),transparent_30%)] blur-[120px]" />

      <section className="relative">
        <HeroOverlay onCTAClick={scrollToForm} />
      </section>

      <section className="relative mt-20 flex justify-center px-6 pb-20 md:px-10">
        <BookingForm formRef={formRef} />
      </section>

      <motion.footer
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pb-16 text-slate-300 md:flex-row md:items-center md:justify-between md:px-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Contact</p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <a className="hover:text-white transition" href="mailto:ssdstudio01@gmail.com">
              ssdstudio01@gmail.com
            </a>
            <a className="hover:text-white transition" href="tel:+16462214353">
              +1 (646) 221-4353
            </a>
          </div>
        </div>
        <div className="max-w-xl text-sm text-slate-400">
          Note: Pickup and drop-off based on shoot location is to be arranged by the client.
        </div>
      </motion.footer>
    </main>
  );
}
