"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import SmoothScroll from "@/components/v2/SmoothScroll";
import { projects, tools, experiments, experimentsIntro } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const manifesto =
  "Most teams explain ideas with slides. I build them. Working software beats static mockups. AI is not a feature — it is an accelerator. The future is easier to understand when you can touch it.";

const stats = [
  { n: 4, label: "Flagship builds, end-to-end" },
  { n: 4, label: "Interaction models validated with surgeons" },
  { n: 9, label: "Tools in active rotation" },
  { n: 1, label: "Vision funded into a roadmap" },
];

export default function Cinematic() {
  const rootRef = useRef(null);
  const reelRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx;
    let cancelled = false;
    // SplitText measures glyphs — wait for webfonts or lines break wrong
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        /* ---------- HERO ---------- */
        // Only split the solid-color lines: SplitText chars can't inherit a
        // bg-clip-text gradient, so the gradient line animates as one block.
        const split = new SplitText(".hero-line-split", { type: "chars,lines" });
        gsap.set(".hero-line", { opacity: 1 });
        gsap.from(split.chars, {
          yPercent: 120,
          rotateX: -60,
          opacity: 0,
          stagger: 0.018,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.25,
        });
        gsap.from(".hero-line-final", {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          delay: 0.75,
          ease: "power4.out",
        });
        // Ambient OR video: fade in late so it reads as intentional texture
        gsap.to(".hero-video", {
          opacity: 0.09,
          duration: 2.4,
          delay: 1.6,
          ease: "power2.inOut",
        });
        gsap.to(".hero-eyebrow", {
          duration: 1.4,
          delay: 0.1,
          scrambleText: {
            text: "CREATIVE TECHNOLOGIST · AI PRODUCT DESIGNER",
            chars: "01<>/_",
            speed: 0.6,
          },
        });
        gsap.from(".hero-sub, .hero-hint", {
          y: 24,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          delay: 1,
          ease: "power3.out",
        });

        // Hero falls away as you scroll
        gsap.to(".hero-inner", {
          yPercent: -18,
          opacity: 0.15,
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        /* ---------- MANIFESTO: words ignite on scrub ---------- */
        const mSplit = new SplitText(".manifesto", { type: "words" });
        gsap.set(mSplit.words, { opacity: 0.12 });
        gsap.to(mSplit.words, {
          opacity: 1,
          color: "#ffffff",
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-wrap",
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        });

        /* ---------- HORIZONTAL REEL ---------- */
        const track = trackRef.current;
        const getX = () => -(track.scrollWidth - window.innerWidth);
        const reelTween = gsap.to(track, {
          x: getX,
          ease: "none",
          scrollTrigger: {
            trigger: reelRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(".reel-progress", { scaleX: self.progress });
            },
          },
        });

        // Per-panel parallax: giant index numbers drift slower than the track
        gsap.utils.toArray(".reel-num").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: 28 },
            {
              xPercent: -28,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                containerAnimation: reelTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        /* ---------- STATS ---------- */
        gsap.utils.toArray(".stat-n").forEach((el) => {
          const target = Number(el.dataset.n);
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: () => (el.textContent = Math.round(state.v)),
          });
        });

        /* ---------- BUILDING THE FUTURE ---------- */
        gsap.utils.toArray(".future-card").forEach((el, i) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        /* ---------- CONTACT: magnetic CTA ---------- */
        const btn = document.querySelector(".magnet");
        if (btn) {
          const strength = 36;
          const mx = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
          const my = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
          const zone = document.querySelector(".magnet-zone");
          zone.addEventListener("mousemove", (e) => {
            const r = zone.getBoundingClientRect();
            mx(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
            my(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
          });
          zone.addEventListener("mouseleave", () => {
            mx(0);
            my(0);
          });
        }

        const cSplit = new SplitText(".contact-line", { type: "chars" });
        gsap.from(cSplit.chars, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.02,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: ".contact-line", start: "top 80%" },
        });
      }, rootRef);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <SmoothScroll>
      <div ref={rootRef} className="bg-ink-950 text-white">
        {/* chrome */}
        <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10 mix-blend-difference">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.25em]">
            ← MC / Variants
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/resume" className="font-mono text-xs uppercase tracking-[0.25em]">
              Resume
            </Link>
            <a href="mailto:melissa.casole@yahoo.com" className="font-mono text-xs uppercase tracking-[0.25em]">
              Contact
            </a>
          </div>
        </header>

        {/* HERO */}
        <section className="hero relative flex min-h-[100svh] items-center overflow-hidden">
          <video
            src="/videos/or/intro.mp4"
            poster="/videos/or/intro-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="hero-video pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
          />
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[150px] animate-pulse-slow" />

          <div className="hero-inner container-content relative">
            <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.3em] text-signal">
              ...
            </p>
            <h1 className="mt-8 text-[clamp(2.8rem,8.5vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.04em]" style={{ perspective: "800px" }}>
              <span className="hero-line hero-line-split block opacity-0">When ideas are</span>
              <span className="hero-line hero-line-split block opacity-0">difficult to explain,</span>
              <span className="hero-line hero-line-final block bg-gradient-to-r from-accent-soft via-accent-glow to-signal bg-clip-text text-transparent opacity-0">
                I build them.
              </span>
            </h1>
            <p className="hero-sub mt-9 max-w-xl text-lg leading-relaxed text-white/55">
              AI, code, design systems, and cognitive psychology — turned into
              product experiences people can see, test, and understand.
            </p>
            <p className="hero-hint mt-16 font-mono text-xs uppercase tracking-[0.25em] text-white/35">
              Scroll to play ↓
            </p>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="manifesto-wrap relative py-32 md:py-44">
          <div className="container-content">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
              The operating system
            </p>
            <p className="manifesto mt-10 max-w-4xl text-3xl font-light leading-snug tracking-tight text-white/90 md:text-5xl md:leading-[1.25]">
              {manifesto}
            </p>
          </div>
        </section>

        {/* HORIZONTAL REEL */}
        <section ref={reelRef} className="relative h-[100svh] overflow-hidden">
          <div className="absolute left-0 top-0 z-20 w-full px-6 pt-6 md:px-10">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/40">
              <span>Featured work</span>
              <span>Drag your scroll →</span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10">
              <div className="reel-progress h-px origin-left scale-x-0 bg-accent" />
            </div>
          </div>

          <div ref={trackRef} className="flex h-full items-stretch">
            {/* intro panel */}
            <div className="flex h-full w-[70vw] shrink-0 items-center px-6 md:w-[45vw] md:px-10">
              <div>
                <p className="font-mono text-sm text-accent-glow">04 builds</p>
                <h2 className="mt-4 text-5xl font-medium tracking-tighter md:text-7xl">
                  The
                  <br />
                  evidence.
                </h2>
                <p className="mt-6 max-w-xs text-white/50">
                  Problem → build → how → what changed. Every project, same
                  arc.
                </p>
              </div>
            </div>

            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                data-cursor="OPEN"
                className="group relative flex h-full w-[88vw] shrink-0 flex-col justify-end overflow-hidden border-l border-white/10 px-6 pb-24 pt-28 md:w-[62vw] md:px-12"
              >
                <span
                  className="reel-num pointer-events-none absolute -top-6 left-0 select-none text-[26vh] font-bold leading-none tracking-tighter text-outline md:text-[42vh]"
                  aria-hidden
                >
                  {p.index}
                </span>
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(110% 80% at 50% 115%, ${p.accent}30, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: p.accent }}>
                    {p.theme}
                  </p>
                  <h3 className="mt-4 text-5xl font-medium tracking-tighter transition-transform duration-500 group-hover:-translate-y-1 md:text-7xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-white/55">{p.tagline}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}

            {/* outro panel */}
            <div className="flex h-full w-[60vw] shrink-0 items-center justify-center border-l border-white/10 md:w-[40vw]">
              <Link href="/#contact" data-cursor="GO" className="text-center">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                  And next…
                </p>
                <p className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl">
                  your idea.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-t border-white/5 py-24 md:py-32">
          <div className="container-content grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-6xl font-medium tracking-tighter text-white md:text-7xl">
                  <span className="stat-n" data-n={s.n}>
                    0
                  </span>
                </p>
                <p className="mt-3 max-w-[180px] text-sm leading-relaxed text-white/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BUILDING THE FUTURE */}
        <section className="relative border-t border-white/5 py-24 md:py-32">
          <div className="container-content">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
              Building the Future
            </p>
            <h2 className="mt-5 max-w-3xl text-balance text-3xl font-medium tracking-[-0.02em] text-white md:text-5xl">
              Continuous experimentation, not a frozen portfolio.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">
              {experimentsIntro}
            </p>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experiments.map((x, i) => (
                <div
                  key={x.title}
                  className="future-card group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-850/60 p-7 transition-colors duration-500 hover:border-white/25"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/15 blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="font-mono text-sm text-accent-glow/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-tight text-white">
                    {x.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/50">
                    {x.blurb}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOL MARQUEE */}
        <section className="relative overflow-hidden border-y border-white/5 py-14">
          <div className="marquee-track" style={{ "--marquee-speed": "26s" }}>
            {[...tools, ...tools].map((t, i) => (
              <span key={i} className="mx-8 whitespace-nowrap text-4xl font-medium tracking-tight text-white/20 transition-colors hover:text-white md:text-5xl">
                {t.name} <span className="text-accent/50">·</span>
              </span>
            ))}
          </div>
          <div className="marquee-track reverse mt-6" style={{ "--marquee-speed": "34s" }}>
            {[...tools, ...tools].map((t, i) => (
              <span key={i} className="mx-8 whitespace-nowrap font-mono text-sm text-white/30">
                {t.use}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="magnet-zone relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            Roll credits
          </p>
          <h2 className="contact-line mt-8 overflow-hidden text-[clamp(2.4rem,7vw,6rem)] font-medium leading-none tracking-tighter">
            Let&apos;s build something.
          </h2>
          <a
            href="mailto:melissa.casole@yahoo.com"
            data-cursor="SAY HI"
            className="magnet mt-14 inline-flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] font-mono text-sm uppercase tracking-widest text-white backdrop-blur transition-colors hover:border-accent hover:bg-accent/15 md:h-44 md:w-44"
          >
            Get in
            <br />
            touch
          </a>
          <p className="mt-16 pb-10 font-mono text-xs text-white/30">
            melissa.casole@yahoo.com
          </p>
        </section>
      </div>
    </SmoothScroll>
  );
}
