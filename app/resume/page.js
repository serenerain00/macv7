"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { resume } from "@/lib/resume";

export default function ResumePage() {
  return (
    <div className="resume-root min-h-screen bg-ink-950 text-white">
      {/* top bar */}
      <header className="print-hide fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
        <div className="container-content flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 hover:text-white"
          >
            ← MC / Variants
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              data-cursor="PRINT"
              className="btn-ghost px-4 py-1.5 text-xs font-mono uppercase tracking-widest"
            >
              Print / Save PDF
            </button>
            <a
              href={resume.pdfPath}
              download="Melissa-Casole-Resume.pdf"
              data-cursor="GET"
              className="btn-primary px-4 py-1.5 text-xs font-mono uppercase tracking-widest"
            >
              ↓ Download
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[560px] rounded-full bg-accent/15 blur-[140px] print-hide" />
        <div className="container-content relative">
          <Reveal>
            <p className="eyebrow">Character sheet · Resume</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl">
              {resume.hero}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              {resume.summary}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-white/45">
              <span>{resume.contact.location}</span>
              <a href={`mailto:${resume.contact.email}`} className="hover:text-accent-glow">
                {resume.contact.email}
              </a>
              <a href={`https://${resume.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-accent-glow">
                {resume.contact.linkedin}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY: 30/70 editorial grid */}
      <div className="container-content grid gap-14 py-16 md:grid-cols-[30fr_70fr] md:py-24">
        {/* LEFT RAIL */}
        <aside className="space-y-10 md:sticky md:top-24 md:self-start">
          <RailBlock title="Focus areas">
            <ul className="space-y-2">
              {resume.focusAreas.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </RailBlock>

          <RailBlock title="Technology">
            <div className="space-y-5">
              {resume.tech.map((g) => (
                <div key={g.group}>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-accent-glow/80">
                    {g.group}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    {g.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </RailBlock>

          <RailBlock title="Industries">
            <div className="flex flex-wrap gap-2">
              {resume.industries.map((x) => (
                <span key={x} className="tag">
                  {x}
                </span>
              ))}
            </div>
          </RailBlock>

          <RailBlock title="Education">
            {resume.education.map((e) => (
              <div key={e.title} className="text-sm">
                <p className="text-white/80">{e.title}</p>
                <p className="mt-0.5 text-white/45">{e.org}</p>
                <p className="text-white/45">{e.note}</p>
              </div>
            ))}
          </RailBlock>

          <RailBlock title="Certifications">
            <ul className="space-y-2 text-sm text-white/60">
              {resume.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </RailBlock>
        </aside>

        {/* RIGHT COLUMN */}
        <div className="min-w-0 space-y-16">
          {/* FEATURED WORK */}
          <section>
            <ColTitle>Featured work</ColTitle>
            <div className="mt-6 space-y-4">
              {resume.featured.map((f) => (
                <Reveal key={f.name}>
                  <Link href={`/work/${f.slug}`} className="card block p-6 md:p-7" data-cursor="OPEN">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-medium tracking-tight text-white">{f.name}</h3>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                        {f.theme}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm text-white/55">{f.story}</p>
                    <p className="mt-3 text-sm text-signal/90">→ {f.outcome}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          {/* KEY ACHIEVEMENT PIPELINE */}
          <section>
            <ColTitle>Key achievement</ColTitle>
            <Reveal>
              <div className="mt-6 overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 to-transparent p-7 md:p-8">
                <h3 className="text-2xl font-medium tracking-tight text-white">
                  {resume.keyAchievement.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                  {resume.keyAchievement.body}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-y-3">
                  {resume.keyAchievement.pipeline.map((step, i) => (
                    <span key={step} className="flex items-center">
                      <span className="rounded-md border border-white/15 bg-ink-900/80 px-3 py-1.5 font-mono text-xs text-white/80">
                        {step}
                      </span>
                      {i < resume.keyAchievement.pipeline.length - 1 && (
                        <span className="mx-2 text-accent-glow/70">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* EXPERIENCE */}
          <section>
            <ColTitle>Professional experience</ColTitle>
            <div className="mt-6 space-y-10 border-l border-white/10 pl-6 md:pl-8">
              {resume.experience.map((job) => (
                <Reveal key={job.org}>
                  <div className="relative">
                    <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink-950 bg-accent md:-left-[37px]" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="text-lg font-medium tracking-tight text-white">
                        {job.role}
                      </h3>
                      {job.dates && (
                        <span className="font-mono text-xs text-white/40">{job.dates}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-accent-glow/80">{job.org}</p>
                    <ul className="mt-3 space-y-2">
                      {job.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/60">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* INDEPENDENT PRODUCTS */}
          <section>
            <ColTitle>Independent products</ColTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {resume.independent.map((p) => (
                <Reveal key={p.name}>
                  <div className="card h-full p-6">
                    <h3 className="text-lg font-medium tracking-tight text-white">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="print-hide rounded-2xl border border-white/10 bg-ink-900 p-8 text-center">
            <p className="text-xl font-medium text-white">
              She doesn&apos;t wait for the future to arrive. She prototypes it.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${resume.contact.email}`} className="btn-primary">
                Get in touch
              </a>
              <a href={resume.pdfPath} download className="btn-ghost">
                ↓ Download resume
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function RailBlock({ title, children }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-white/40">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ColTitle({ children }) {
  return (
    <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/40">
      <span className="h-px w-8 bg-white/25" />
      {children}
    </h2>
  );
}
