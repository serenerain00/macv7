import Reveal from "./Reveal";

export default function SectionHeader({ eyebrow, title, intro, id }) {
  return (
    <div id={id} className="max-w-3xl scroll-mt-24">
      <Reveal>
        <p className="eyebrow">
          <span className="h-px w-8 bg-white/25" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-balance text-3xl font-medium tracking-[-0.02em] text-white md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-lg leading-relaxed text-white/55">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
