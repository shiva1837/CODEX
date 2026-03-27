"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect } from "react";

type HeroProps = {
  onCTAClick: () => void;
  children: ReactNode;
};

export default function Hero({ onCTAClick, children }: HeroProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const rotateX = useSpring(useTransform(cursorY, [0, 1], [8, -8]), { stiffness: 80, damping: 15 });
  const rotateY = useSpring(useTransform(cursorX, [0, 1], [-8, 8]), { stiffness: 80, damping: 15 });
  const glowX = useTransform(cursorX, (v) => `${v * 100}vw`);
  const glowY = useTransform(cursorY, (v) => `${v * 100}vh`);
  const glow = useMotionTemplate`radial-gradient(120px circle at ${glowX} ${glowY}, rgba(125,216,255,0.12), transparent 50%)`;

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      cursorX.set(x);
      cursorY.set(y);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [cursorX, cursorY]);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        {children}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"
          style={{ mixBlendMode: "screen" }}
        />
        {!shouldReduceMotion && (
          <motion.div aria-hidden className="absolute inset-0 opacity-70" style={{ backgroundImage: glow }} />
        )}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl glass rounded-3xl border-white/10 p-8 shadow-2xl backdrop-saturate-150 sm:p-10"
          style={
            shouldReduceMotion
              ? {}
              : {
                  transformStyle: "preserve-3d",
                  rotateX,
                  rotateY
                }
          }
        >
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200/70 shadow-glow">
            SSD STUDIO — New York
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Focus on what matters.
          </h1>
          <p className="mt-5 text-lg text-slate-200/80 sm:text-xl">
            I&apos;m just starting out—and I want to build my business by creating real art for real people. For a limited
            time, all shoots are 100% free.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
              onClick={onCTAClick}
              className="magnetic glow-border rounded-full bg-gradient-to-r from-sky-400/70 to-indigo-400/70 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              Book Your Free Shoot
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 text-sm text-slate-200/70"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400/80 animate-pulse" />
              Limited availability this month
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
