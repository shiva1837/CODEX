"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";

const shootTypes = ["Portrait", "Couple", "Event", "Fashion", "Professional Headshot"];
const packages = ["Basic", "Standard", "Premium", "Custom"];

export default function BookingForm() {
  const [shootType, setShootType] = useState("Portrait");
  const [packageType, setPackageType] = useState("Standard");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const shouldReduceMotion = useReducedMotion();

  const fieldVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      show: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      })
    }),
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreed) return;
    setStatus("success");
    setTimeout(() => setStatus("idle"), 2400);
  };

  return (
    <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative glass lg:col-span-7 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/40 sm:p-8"
      >
        <div className="absolute inset-0 rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40" />
        <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-200/60">Booking Form</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Let&apos;s craft your session</h2>
            <p className="text-sm text-slate-200/70">
              Tell us how you want to be seen. We respond within 24 hours with next steps.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Full Name", "Email Address"].map((label, idx) => (
              <motion.label
                key={label}
                variants={fieldVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={idx}
                className="relative"
              >
                <span className="pointer-events-none absolute left-3 top-2.5 text-xs uppercase tracking-wide text-slate-300/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm">
                  {label}
                </span>
                <input
                  required
                  name={label.toLowerCase().replace(/\s+/g, "-")}
                  type={label === "Email Address" ? "email" : "text"}
                  placeholder=" "
                  className="peer w-full rounded-2xl bg-white/5 px-3 pb-2 pt-7 text-sm text-white outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-sky-300/60"
                />
              </motion.label>
            ))}
            <motion.label
              variants={fieldVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={2}
              className="relative sm:col-span-2"
            >
              <span className="pointer-events-none absolute left-3 top-2.5 text-xs uppercase tracking-wide text-slate-300/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm">
                Phone Number
              </span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder=" "
                className="peer w-full rounded-2xl bg-white/5 px-3 pb-2 pt-7 text-sm text-white outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-sky-300/60"
              />
            </motion.label>
          </div>

          <input type="hidden" name="shoot-type" value={shootType} />
          <input type="hidden" name="package" value={packageType} />

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-200/60">Type of Shoot</p>
              <div className="flex flex-wrap gap-2">
                {shootTypes.map((type) => {
                  const active = shootType === type;
                  return (
                    <motion.button
                      key={type}
                      type="button"
                      whileTap={{ scale: shouldReduceMotion ? 1 : 0.97 }}
                      onClick={() => setShootType(type)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        active
                          ? "border-sky-300/80 bg-sky-300/20 text-sky-100"
                          : "border-white/10 bg-white/5 text-slate-200/70 hover:border-white/30"
                      }`}
                    >
                      {type}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-200/60">Package</p>
              <div className="flex flex-wrap gap-2">
                {packages.map((pkg) => {
                  const active = packageType === pkg;
                  return (
                    <motion.button
                      key={pkg}
                      type="button"
                      whileTap={{ scale: shouldReduceMotion ? 1 : 0.97 }}
                      onClick={() => setPackageType(pkg)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        active
                          ? "border-indigo-300/80 bg-indigo-300/20 text-indigo-50"
                          : "border-white/10 bg-white/5 text-slate-200/70 hover:border-white/30"
                      }`}
                    >
                      {pkg}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.label
              variants={fieldVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={3}
              className="relative"
            >
              <span className="pointer-events-none absolute left-3 top-2.5 text-xs uppercase tracking-wide text-slate-300/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm">
                Date &amp; Time Preference
              </span>
              <input
                type="datetime-local"
                name="datetime"
                className="peer w-full rounded-2xl bg-white/5 px-3 pb-2 pt-7 text-sm text-white outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-sky-300/60 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </motion.label>
            <motion.label
              variants={fieldVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={4}
              className="relative"
            >
              <span className="pointer-events-none absolute left-3 top-2.5 text-xs uppercase tracking-wide text-slate-300/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm">
                Location Preference
              </span>
              <textarea
                name="location"
                placeholder=" "
                rows={1}
                className="peer w-full rounded-2xl bg-white/5 px-3 pb-2 pt-7 text-sm text-white outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-sky-300/60"
              />
            </motion.label>
          </div>

          <motion.label
            variants={fieldVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={5}
            className="relative block"
          >
            <span className="pointer-events-none absolute left-3 top-2.5 text-xs uppercase tracking-wide text-slate-300/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm">
              Anything we should know?
            </span>
            <textarea
              name="notes"
              placeholder=" "
              rows={3}
              className="peer w-full rounded-2xl bg-white/5 px-3 pb-2 pt-7 text-sm text-white outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-sky-300/60"
            />
          </motion.label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.button
              type="button"
              onClick={() => setAgreed((prev) => !prev)}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.97 }}
              className="group inline-flex items-center gap-3 text-sm text-slate-200"
            >
              <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/20 bg-white/5">
                <AnimatePresence initial={false}>
                  {agreed && (
                    <motion.span
                      key="checkbox-on"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block h-4 w-4 rounded-md bg-gradient-to-br from-sky-300 to-indigo-300 shadow-glow"
                    />
                  )}
                </AnimatePresence>
              </span>
              I agree to the terms and conditions, privacy policy.
            </motion.button>

            <div className="flex items-center gap-3">
              <motion.button
                type="submit"
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.97 }}
                className="glow-border relative inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!agreed}
              >
                <AnimatePresence>
                  {status === "success" && (
                    <motion.span
                      key="success-overlay"
                      initial={{ opacity: 0, scale: 0.9, rotateX: -35 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.95, rotateX: 25 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/50 via-sky-300/40 to-indigo-300/40 blur-[1px]"
                      style={{ transformStyle: "preserve-3d" }}
                      aria-hidden
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">Submit Inquiry</span>
                <AnimatePresence>
                  {status === "success" && (
                    <motion.span
                      key="success-check"
                      initial={{ opacity: 0, scale: 0.4, rotateY: -50 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotateY: 30 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-sky-300 text-slate-950 shadow-glow"
                      style={{ transformStyle: "preserve-3d" }}
                      aria-hidden
                    >
                      ✓
                    </motion.span>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 rounded-full border border-white/10" />
              </motion.button>
              <AnimatePresence>
                {status === "success" && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm text-emerald-300"
                    aria-live="polite"
                  >
                    Sent. We&apos;ll be in touch.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-5 flex items-stretch"
      >
        <div className="glass relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8">
          <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-white/5 via-white/0 to-white/10" />
          <div className="relative z-10 space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-200/60">Why SSD</p>
            <h3 className="text-2xl font-semibold text-white">We build cinematic frames around you.</h3>
            <ul className="space-y-3 text-sm text-slate-200/80">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                Direction, styling, and color work tailored for the story you want to tell.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                Mobile-first delivery, cinematic grading, and premium retouching on every package.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-300" />
                Flexible on-location or studio setups across NYC and beyond.
              </li>
            </ul>
          </div>
          <div className="relative z-10 mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/75">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-200/60">Availability</div>
            Bookings open for select dates this month. Early inquiries receive priority scheduling and creative consult.
          </div>
        </div>
      </motion.div>
    </section>
  );
}
