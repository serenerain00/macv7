import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="container-content py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/40">
              When ideas are difficult to explain
            </p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">
              I build them.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Creative Technologist & Product Designer turning emerging concepts
              into things people can see, test, and understand.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="mailto:melissa.casole@yahoo.com"
              className="text-white/70 transition-colors hover:text-accent-glow"
            >
              melissa.casole@yahoo.com
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-accent-glow"
            >
              Dribbble
            </a>
            <Link
              href="/#work"
              className="text-white/70 transition-colors hover:text-accent-glow"
            >
              View Projects
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Melissa Casole. Built, not templated.</p>
          <p className="font-mono">Designed & coded with AI as an accelerator.</p>
        </div>
      </div>
    </footer>
  );
}
