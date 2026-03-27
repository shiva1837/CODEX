'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import BookingForm from "../components/BookingForm";
import CanvasScene from "../components/CanvasScene";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Page() {
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const particleCount = useMemo(() => (isMobile ? 40 : 90), [isMobile]);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-grid-overlay bg-[length:24px_24px]" />
      <Hero onCTAClick={scrollToBooking}>
        <CanvasScene particleCount={particleCount} />
      </Hero>
      <div ref={bookingRef} id="booking" className="relative z-10 px-4 pb-20 pt-10 sm:px-8 lg:px-16">
        <BookingForm />
      </div>
      <Footer />
    </main>
  );
}
