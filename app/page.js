import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects, experiments, tools } from "@/lib/projects";

const principles = [
  {
    n: "01",
    title: "I build the slides instead of presenting them",
    body: "Most teams explain ideas with decks. I'd rather hand you the thing and let you use it.",
  },
  {
    n: "02",
    title: "Working software beats static mockups",
    body: "A prototype you can touch removes more uncertainty than any pixel-perfect comp ever will.",
  },
  {
    n: "03",
    title: "AI is an accelerator, not a feature",
    body: "I use AI to compress the distance between an idea and a real, testable experience.",
  },
  {
    n: "04",
    title: "The future is easier to understand when you can interact with it",
    body: "Stakeholders align faster on something they can see, test, and react to.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* PRINCIPLES / POSITIONING */}
      <section className="relative border-t border-white/5 py-24 md:py-32">
        <div className="container-content">
          <SectionHeader
            eyebrow="How I work"
            title="Traditional portfolios explain the work. This one demonstrates it."
            intro="I'm not here to show wireframes, personas, and process diagrams. I reduce uncertainty by building realistic experiences people can actually use."
          />

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={(i % 2) * 0.08}>
                <div className="card h-full p-7 md:p-8">
                  <span className="font-mono text-sm text-accent-glow/70">
                    {p.n}
                  </span>
                  <h3 className="mt-4 text-xl font-medium tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="relative py-24 md:py-32">
        <div className="container-content">
          <SectionHeader
            id="work"
            eyebrow="Featured Work"
            title="Flagship projects, built end-to-end."
            intro="Each one followed the same arc: a problem, something I built, how I built it, and what changed because it existed."
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* BUILDING THE FUTURE */}
      <section className="relative border-t border-white/5 py-24 md:py-32">
        <div className="container-content">
          <SectionHeader
            id="building"
            eyebrow="Building the Future"
            title="Continuous experimentation, not a frozen portfolio."
            intro="Smaller tools and probes I build to test where emerging technology actually changes product work."
          />

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {experiments.map((e, i) => (
              <Reveal key={e.title} delay={(i % 2) * 0.08}>
                <div className="group card flex items-start gap-5 p-7">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-sm text-accent-glow/80 transition-colors group-hover:border-accent/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {e.blurb}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI & TECHNOLOGY */}
      <section className="relative py-24 md:py-32">
        <div className="container-content">
          <SectionHeader
            id="stack"
            eyebrow="AI & Technology"
            title="Not logos. Not buzzwords. Actual usage."
            intro="The tools I reach for — and what each one actually does in the work."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.06}>
                <div className="group h-full bg-ink-900 p-7 transition-colors duration-300 hover:bg-ink-850">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent transition-all duration-300 group-hover:shadow-[0_0_12px_2px_rgba(124,92,255,0.6)]" />
                    <h3 className="font-mono text-sm tracking-tight text-white">
                      {t.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {t.use}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden py-28 md:py-40"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[150px]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        <div className="container-content relative text-center">
          <Reveal>
            <p className="eyebrow justify-center">Let&apos;s build something</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-medium tracking-[-0.02em] text-white md:text-6xl">
              If your team is trying to figure out the future —
              <span className="bg-gradient-to-r from-accent-soft to-signal bg-clip-text text-transparent">
                {" "}
                I&apos;m already building it.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/55">
              Open to Creative Technologist, AI Product Design, and Principal
              Product Design roles.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:melissa.casole@yahoo.com"
                className="btn-primary"
              >
                Get in touch
              </a>
              <Link href="/#work" className="btn-ghost">
                See the work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
