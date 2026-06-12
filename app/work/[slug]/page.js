import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import VideoWall from "@/components/v2/VideoWall";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.theme} — ${project.tagline}`,
  };
}

const arc = [
  { key: "problem", label: "The problem" },
  { key: "built", label: "What I built" },
];

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="relative pt-16">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full blur-[150px]"
          style={{ background: `${project.accent}26` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

        <div className="container-content relative py-20 md:py-28">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/45 transition-colors hover:text-white"
            >
              ← Melissa Casole
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex items-center gap-3">
              <span className="font-mono text-sm text-white/35">
                {project.index}
              </span>
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: project.accent }}
              />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                {project.theme}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance text-5xl font-medium tracking-[-0.03em] text-white md:text-7xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-balance text-xl leading-relaxed text-white/60">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
              <Meta label="Role" value={project.role} />
              <Meta label="Year" value={project.year} />
            </div>
          </Reveal>
        </div>
      </header>

      {/* BODY */}
      <div className="container-content grid gap-16 py-20 md:grid-cols-[1fr_300px] md:py-28">
        <div className="space-y-16">
          {arc.map((block, i) => (
            <Reveal key={block.key} delay={i * 0.05}>
              <section>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  {block.label}
                </h2>
                <p className="mt-5 text-balance text-2xl font-light leading-relaxed text-white/85 md:text-[1.7rem] md:leading-[1.5]">
                  {project[block.key]}
                </p>
              </section>
            </Reveal>
          ))}

          {/* SPOTLIGHT */}
          {project.spotlight && (
            <Reveal>
              <section
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-8 md:p-10"
              >
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full blur-[80px]"
                  style={{ background: `${project.accent}30` }}
                />
                <h2 className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                  {project.spotlight.label}
                </h2>
                <p className="mt-4 text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {project.spotlight.title}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
                  {project.spotlight.body}
                </p>
              </section>
            </Reveal>
          )}

          {/* HOW I BUILT IT */}
          <Reveal>
            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                How I built it
              </h2>
              <ol className="mt-6 space-y-3">
                {project.how.map((step, i) => (
                  <li
                    key={i}
                    className="card flex items-start gap-4 p-5"
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs text-white"
                      style={{ background: `${project.accent}2e`, color: project.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-relaxed text-white/75">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {/* WHAT CHANGED */}
          <Reveal>
            <section
              className="relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-10"
              style={{
                background: `linear-gradient(135deg, ${project.accent}1a, transparent 60%)`,
              }}
            >
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">
                What changed because of it
              </h2>
              <p className="mt-5 text-balance text-2xl font-medium leading-snug text-white md:text-3xl">
                {project.changed}
              </p>
              {project.outcomes?.length > 0 && (
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {project.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: project.accent }}
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>

          {/* TAKEAWAY */}
          {project.takeaway && (
            <Reveal>
              <blockquote className="border-l-2 pl-6 md:pl-8" style={{ borderColor: project.accent }}>
                <p className="text-balance text-xl font-light italic leading-relaxed text-white/75 md:text-2xl">
                  {project.takeaway}
                </p>
              </blockquote>
            </Reveal>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-8 md:sticky md:top-24 md:self-start">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Stack
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Highlights
            </h3>
            <ul className="mt-4 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-white/65">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: project.accent }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* IMMERSIVE VIDEO WALL */}
      {project.media?.length > 0 && (
        <VideoWall
          media={project.media}
          accent={project.accent}
          title={`Inside ${project.title}`}
        />
      )}

      {/* NEXT PROJECT */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-white/10 transition-colors hover:bg-ink-900"
      >
        <div className="container-content flex items-center justify-between py-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Next project
            </p>
            <p className="mt-3 text-3xl font-medium tracking-tight text-white md:text-4xl">
              {next.title}
            </p>
          </div>
          <span className="text-3xl text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
            →
          </span>
        </div>
      </Link>
    </article>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-white/75">{value}</p>
    </div>
  );
}
