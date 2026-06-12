"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px] animate-pulse-slow" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full bg-signal/10 blur-[120px]" />

      <div className="container-content relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="eyebrow mb-7"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Creative Technologist · AI Product Designer
        </motion.div>

        <h1 className="max-w-4xl text-balance text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em]">
          {["When ideas are", "difficult to explain,"].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.08, ease }}
              className="block text-white"
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26, ease }}
            className="block bg-gradient-to-r from-accent-soft via-accent-glow to-signal bg-clip-text text-transparent"
          >
            I build them.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-white/60 md:text-xl"
        >
          Creative Technologist and Product Designer leveraging AI, code, design
          systems, and cognitive psychology to transform emerging concepts into
          tangible product experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.52, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/#work" className="btn-primary group">
            View Projects
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link href="/#contact" className="btn-ghost">
            Let&apos;s Build Something
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-white/35"
        >
          <span>I don&apos;t document the future —</span>
          <span className="text-white/55">I prototype it.</span>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </section>
  );
}
