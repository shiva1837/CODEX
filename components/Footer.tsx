"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-surface/80 px-4 py-10 backdrop-blur sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-slate-400">SSD Studio</div>
          <p className="text-xl font-semibold text-white">Cinematic Photography &amp; Creative Direction</p>
          <p className="text-sm text-slate-300/80">
            Disclaimer: Scheduling depends on availability. We prioritize safety, consent, and respectful collaboration on
            every shoot.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 text-sm text-slate-200/80"
        >
          <div className="flex flex-col gap-1">
            <a className="hover:text-sky-200" href="mailto:ssdstudio01@gmail.com">
              ssdstudio01@gmail.com
            </a>
            <a className="hover:text-sky-200" href="tel:+16462214353">
              +1 (646) 221-4353
            </a>
          </div>
          <p className="text-slate-300/70">
            Note: Pickup and drop-off based on shoot location is to be arranged by the client.
          </p>
          <div className="text-slate-400">© {new Date().getFullYear()} SSD Studio. All rights reserved.</div>
        </motion.div>
      </div>
    </footer>
  );
}
