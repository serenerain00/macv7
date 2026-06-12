"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="card group block p-7 md:p-9"
        style={{ "--accent": project.accent }}
      >
        {/* hover glow */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(480px circle at 30% 0%, ${project.accent}1f, transparent 60%)`,
          }}
        />

        <div className="relative flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.2em] text-white/35">
            {project.index}
          </span>
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 group-hover:border-white/30 group-hover:text-white"
            style={{ boxShadow: `0 0 0 0 ${project.accent}00` }}
          >
            <span className="transition-transform duration-300 group-hover:-rotate-45">
              →
            </span>
          </span>
        </div>

        {/* visual band */}
        <div className="relative mt-6 h-44 overflow-hidden rounded-xl border border-white/10 bg-ink-900">
          <div
            className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(120% 120% at 0% 0%, ${project.accent}33, transparent 55%), linear-gradient(135deg, #0e1116, #06070a)`,
            }}
          />
          <div className="absolute inset-0 bg-grid-faint bg-[size:28px_28px] opacity-40" />
          <div
            className="absolute bottom-4 left-5 h-12 w-12 rounded-lg blur-md transition-transform duration-700 group-hover:scale-150"
            style={{ background: project.accent, opacity: 0.5 }}
          />
          <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/55">
              {project.theme}
            </span>
            <span className="font-mono text-[11px] text-white/30">{project.year}</span>
          </div>
        </div>

        <h3 className="mt-6 text-2xl font-medium tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {project.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
