"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const variants = [
  {
    key: "1",
    href: "/x/cinematic",
    name: "CINEMATIC",
    sub: "Scroll-driven scenes. A film about the work.",
    accent: "#7c5cff",
    mode: "01 / SCROLL",
  },
  {
    key: "2",
    href: "/x/arcade",
    name: "ARCADE",
    sub: "XP, levels, achievements. The portfolio as a game.",
    accent: "#43e5b0",
    mode: "02 / PLAY",
  },
  {
    key: "3",
    href: "/x/terminal",
    name: "TERMINAL",
    sub: "A command line into everything I've built.",
    accent: "#ff7a59",
    mode: "03 / TYPE",
  },
];

export default function Launcher() {
  const router = useRouter();
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Preloader: count 0→100, then unveil the chooser
  useEffect(() => {
    const ctx = gsap.context(() => {
      const state = { n: 0 };
      const tl = gsap.timeline({
        onComplete: () => setLoaded(true),
      });
      tl.to(state, {
        n: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = String(Math.round(state.n)).padStart(3, "0");
        },
      })
        .to(".pre-bar", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".preloader", {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        })
        .from(
          ".panel",
          {
            yPercent: 100,
            stagger: 0.09,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .from(
          ".launcher-head > *",
          { y: 24, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Keyboard shortcuts 1/2/3 — armed only once the preloader is done
  useEffect(() => {
    if (!loaded) return;
    const onKey = (e) => {
      const v = variants.find((x) => x.key === e.key);
      if (v) exit(v.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const exit = (href) => {
    gsap.to(".panel", {
      yPercent: 100,
      stagger: 0.06,
      duration: 0.55,
      ease: "power3.in",
      onComplete: () => router.push(href),
    });
    gsap.to(".launcher-head", { opacity: 0, y: -16, duration: 0.4 });
  };

  const scramble = (e, name) => {
    const el = e.currentTarget.querySelector(".panel-name");
    gsap.to(el, {
      duration: 0.7,
      scrambleText: { text: name, chars: "█▓▒░<>/_", speed: 1.2 },
    });
  };

  return (
    <div ref={rootRef} className="fixed inset-0 overflow-hidden bg-ink-950">
      {/* PRELOADER */}
      <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-950">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Melissa Casole · Creative Technologist
        </p>
        <p
          ref={counterRef}
          className="mt-6 font-mono text-7xl font-bold tracking-tighter text-white"
        >
          000
        </p>
        <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
          <div className="pre-bar h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>

      {/* HEAD */}
      <div className="launcher-head pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 md:p-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/45">
            Melissa Casole
          </p>
          <h1 className="mt-2 text-2xl font-medium tracking-tight text-white md:text-3xl">
            Choose your experience.
          </h1>
        </div>
        <div className="pointer-events-auto flex items-center gap-5 font-mono text-xs">
          <a
            href="/resume"
            className="uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            Resume ↗
          </a>
          <p className="hidden text-white/35 md:block">[1] [2] [3] — or click</p>
        </div>
      </div>

      {/* PANELS */}
      <div className="flex h-full w-full flex-col md:flex-row">
        {variants.map((v) => (
          <button
            key={v.key}
            onClick={() => exit(v.href)}
            onMouseEnter={(e) => scramble(e, v.name)}
            data-cursor="ENTER"
            className="panel group relative flex flex-1 items-end overflow-hidden border-white/10 text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:flex-[1.7] max-md:border-b md:border-r md:last:border-r-0"
            style={{ background: "#0a0c10" }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background: `radial-gradient(120% 90% at 50% 110%, ${v.accent}33, transparent 65%)`,
              }}
            />
            <div className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-30" />

            <span className="absolute right-5 top-20 font-mono text-[11px] tracking-[0.25em] text-white/30 md:top-8">
              {v.mode}
            </span>

            <div className="relative z-10 p-6 pb-10 md:p-10">
              <span
                className="mb-4 block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-20"
                style={{ background: v.accent }}
              />
              <h2 className="panel-name text-4xl font-bold tracking-tighter text-white md:text-6xl">
                {v.name}
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50 opacity-0 transition-all duration-500 group-hover:opacity-100">
                {v.sub}
              </p>
            </div>
          </button>
        ))}
      </div>

      {loaded && (
        <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
          Same work. Three ways in.
        </p>
      )}
    </div>
  );
}
