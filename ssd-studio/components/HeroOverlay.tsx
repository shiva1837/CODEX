"use client";

import { motion } from "framer-motion";

interface HeroOverlayProps {
  onCTAClick: () => void;
}

const words = ["Focus", "on", "what", "matters."];

export default function HeroOverlay({ onCTAClick }: HeroOverlayProps) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-20 md:px-10 lg:pt-28">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-slate-300">
          SSD Studio
        </span>
        <span className="rounded-full border border-accent-500/60 bg-accent-500/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-accent-200">
          Free shoots for a limited time
        </span>
      </div>

      <motion.h1
        className="font-display text-5xl leading-[1] text-white sm:text-6xl lg:text-7xl"
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={word}
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: "0%", opacity: 1 }
            }}
            transition={{ delay: index * 0.08, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mr-3 inline-block overflow-hidden align-baseline"
          >
            <span className="inline-block">{word}</span>
          </motion.span>
        ))}
      </motion.h1>

      <p className="max-w-3xl text-lg text-slate-200">
        I'm just starting out—and I want to build my business by creating real art for real people. For a limited time,
        all shoots are 100% free.
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.04, y: -2, boxShadow: "0 15px 35px rgba(98,210,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onCTAClick}
          className="relative overflow-hidden rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-rose-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950"
        >
          <span className="relative z-10">Book Your Free Shoot</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 opacity-0 transition duration-500 hover:opacity-80" />
        </motion.button>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em]">
            3D
          </div>
          <div>
            <p className="font-semibold text-white">Immersive studio experience</p>
            <p className="text-slate-400">Premium interactions, cinematic depth</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Bookings accepted weekly", value: "12" },
          { label: "Limited offer", value: "100% Free" },
          { label: "Response time", value: "<12 hrs" }
        ].map((item) => (
          <div key={item.label} className="glass rounded-2xl border border-white/10 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
            <p className="font-display text-2xl text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
