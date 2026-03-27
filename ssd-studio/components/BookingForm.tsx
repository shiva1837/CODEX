"use client";

import { motion, useAnimation } from "framer-motion";
import { useMemo, useState } from "react";

const shootTypes = ["Portrait", "Couple", "Event", "Fashion", "Professional Headshot"] as const;
const packages = [
  { label: "Basic", desc: "30 mins, 10 edits" },
  { label: "Standard", desc: "1 hour, 20 edits + short video" },
  { label: "Premium", desc: "2+ hours, full edits + reels" },
  { label: "Custom", desc: "Tell us what you envision" }
] as const;

type ShootType = (typeof shootTypes)[number];
type PackageType = (typeof packages)[number]["label"];

interface BookingFormProps {
  formRef?: React.RefObject<HTMLDivElement>;
}

export default function BookingForm({ formRef }: BookingFormProps) {
  const [shoot, setShoot] = useState<ShootType>("Portrait");
  const [pack, setPack] = useState<PackageType>("Standard");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const controls = useAnimation();

  const inputClasses =
    "w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-accent-500 transition";

  const toggleClasses = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm transition ${
      active
        ? "bg-white/15 border border-accent-500 text-white shadow-glow-blue"
        : "bg-white/5 border border-white/10 text-slate-400 hover:border-white/30"
    }`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await controls.start({ scale: [1, 1.05, 1], boxShadow: ["0 0 0px", "0 0 30px rgba(98,210,255,0.4)", "0 0 0px"] });
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3800);
  };

  const fields = useMemo(
    () => [
      { id: "name", label: "Full Name", type: "text", placeholder: "Alex Morgan" },
      { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
      { id: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (___) ___-____" }
    ],
    []
  );

  return (
    <div ref={formRef} className="w-full lg:max-w-3xl xl:max-w-4xl">
      <div className="glow-border rounded-[32px] p-[1px]">
        <div className="glass rounded-[32px] p-10 shadow-2xl">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Reservation</p>
              <h2 className="font-display text-3xl md:text-4xl text-white">Book your free shoot</h2>
            </div>
            <motion.div
              className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-200"
              animate={{ rotate: status === "sent" ? 360 : 0, scale: status === "sent" ? 1.08 : 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              SSD
            </motion.div>
          </div>

          <form className="mt-8 space-y-8" onSubmit={onSubmit}>
            <div className="grid gap-4 md:grid-cols-3">
              {fields.map((field) => (
                <label key={field.id} className="relative block">
                  <input
                    required
                    type={field.type}
                    name={field.id}
                    placeholder=" "
                    className={`${inputClasses} peer`}
                  />
                  <span className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.08em]">
                    {field.label}
                  </span>
                  <span className="absolute inset-x-4 bottom-2 text-[11px] text-slate-500">{field.placeholder}</span>
                </label>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Type of Shoot</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {shootTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={toggleClasses(shoot === type)}
                      onClick={() => setShoot(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Choose a Package</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {packages.map((pkg) => (
                    <button
                      type="button"
                      key={pkg.label}
                      className={toggleClasses(pack === pkg.label)}
                      onClick={() => setPack(pkg.label)}
                    >
                      <span className="block text-sm font-semibold text-white">{pkg.label}</span>
                      <span className="block text-[11px] text-slate-400">{pkg.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="relative block">
                <input required type="date" name="date" className={`${inputClasses} peer`} />
                <span className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.08em]">
                  Preferred Date
                </span>
              </label>
              <label className="relative block">
                <input required type="time" name="time" className={`${inputClasses} peer`} />
                <span className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.08em]">
                  Preferred Time
                </span>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="relative block">
                <textarea name="location" rows={3} className={`${inputClasses} peer resize-none`} placeholder=" " />
                <span className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.08em]">
                  Location Preference
                </span>
              </label>
              <label className="relative block">
                <textarea name="notes" rows={3} className={`${inputClasses} peer resize-none`} placeholder=" " />
                <span className="pointer-events-none absolute left-4 top-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.08em]">
                  Anything we should know?
                </span>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setAgreed((v) => !v)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-accent-500"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    agreed ? "border-accent-500 bg-accent-500/20" : "border-white/20 bg-white/5"
                  } transition`}
                >
                  <motion.span
                    animate={{ scale: agreed ? 1 : 0 }}
                    className="h-3 w-3 rounded-full bg-accent-600"
                    transition={{ duration: 0.25 }}
                  />
                </span>
                <span className="text-xs uppercase tracking-[0.2em]">
                  I agree to the terms and conditions, privacy policy.
                </span>
              </button>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(98, 210, 255, 0.35)" }}
                whileTap={{ scale: 0.98 }}
                animate={controls}
                type="submit"
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-rose-500 px-8 py-4 text-base font-semibold uppercase tracking-[0.18em] text-slate-950"
                disabled={!agreed}
              >
                <span className="relative z-10">
                  {status === "sent" ? "Request Received" : "Secure My Spot"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 opacity-0 transition duration-500 hover:opacity-60" />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
