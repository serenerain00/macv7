import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center justify-center px-6 pt-16 text-center">
      <div>
        <p className="font-mono text-sm text-accent-glow/70">404</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl">
          This page hasn&apos;t been built yet.
        </h1>
        <p className="mt-4 text-white/55">
          Which is unusual around here. Let&apos;s get you back.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back home
        </Link>
      </div>
    </section>
  );
}
