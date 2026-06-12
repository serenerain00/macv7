"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, experiments } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

const ACHIEVEMENTS = {
  start: { icon: "▶", title: "INSERT COIN", desc: "Entered the arcade" },
  levels: { icon: "◆", title: "WORLD MAP", desc: "Discovered all 4 levels" },
  bonus: { icon: "★", title: "BONUS STAGE", desc: "Found the side quests" },
  resume: { icon: "▤", title: "CHARACTER SHEET", desc: "Viewed the stats screen" },
  konami: { icon: "∞", title: "GOD MODE", desc: "↑↑↓↓←→←→BA — you know the code" },
};

export default function Arcade() {
  const router = useRouter();
  const rootRef = useRef(null);
  const toastRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [xp, setXp] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [god, setGod] = useState(false);
  const [toast, setToast] = useState(null);

  const level = Math.min(99, Math.floor(xp / 250) + 1);
  const levelPct = ((xp % 250) / 250) * 100;

  const award = useCallback((points, achievementKey) => {
    setXp((v) => v + points);
    if (achievementKey) {
      setUnlocked((u) => {
        if (u.includes(achievementKey)) return u;
        setToast(ACHIEVEMENTS[achievementKey]);
        return [...u, achievementKey];
      });
    }
  }, []);

  // Achievement toast animation
  useEffect(() => {
    if (!toast || !toastRef.current) return;
    const tl = gsap.timeline({ onComplete: () => setToast(null) });
    tl.fromTo(
      toastRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" }
    ).to(toastRef.current, { x: 120, opacity: 0, duration: 0.4, delay: 2.4, ease: "power2.in" });
    return () => tl.kill();
  }, [toast]);

  // Konami listener
  useEffect(() => {
    let buf = [];
    const onKey = (e) => {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (KONAMI.every((k, i) => buf[i] === k)) {
        setGod(true);
        award(500, "konami");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [award]);

  // Scroll-based XP + section achievements
  useEffect(() => {
    if (!started) return;
    const ctx = gsap.context(() => {
      gsap.from(".hud", { y: -60, opacity: 0, duration: 0.6, ease: "power3.out" });
      gsap.from(".world-title", { scale: 2.4, opacity: 0, duration: 0.8, ease: "power4.out" });

      gsap.utils.toArray(".level-card").forEach((el, i) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          rotateZ: i % 2 ? 1.5 : -1.5,
          duration: 0.7,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      ScrollTrigger.create({
        trigger: ".levels-zone",
        start: "bottom 70%",
        once: true,
        onEnter: () => award(150, "levels"),
      });
      ScrollTrigger.create({
        trigger: ".bonus-zone",
        start: "top 70%",
        once: true,
        onEnter: () => award(100, "bonus"),
      });
    }, rootRef);
    return () => ctx.revert();
  }, [started, award]);

  // Particle burst on level select
  const burst = (e, color) => {
    const { clientX: x, clientY: y } = e;
    for (let i = 0; i < 18; i++) {
      const d = document.createElement("div");
      d.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:6px;height:6px;border-radius:1px;background:${color};z-index:90;pointer-events:none`;
      document.body.appendChild(d);
      gsap.to(d, {
        x: gsap.utils.random(-130, 130),
        y: gsap.utils.random(-130, 130),
        rotation: gsap.utils.random(-180, 180),
        opacity: 0,
        duration: gsap.utils.random(0.5, 0.9),
        ease: "power3.out",
        onComplete: () => d.remove(),
      });
    }
  };

  const enterLevel = (e, p) => {
    e.preventDefault();
    burst(e, p.accent);
    award(200);
    gsap.to(rootRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.45,
      delay: 0.25,
      ease: "power2.in",
      onComplete: () => router.push(`/work/${p.slug}`),
    });
  };

  /* ---------- START SCREEN ---------- */
  if (!started) {
    return (
      <div className="scanlines crt-vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink-950 text-center">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:40px_40px] opacity-50" />
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-signal">
          Melissa Casole presents
        </p>
        <h1
          className="glitch crt-flicker mt-8 font-mono text-5xl font-bold tracking-tight text-white md:text-8xl"
          data-text="PORTFOLIO QUEST"
        >
          PORTFOLIO QUEST
        </h1>
        <p className="mt-6 max-w-md px-6 font-mono text-sm leading-relaxed text-white/50">
          A Creative Technologist has appeared. Explore 4 levels of shipped
          work. Collect XP. Find the secret code.
        </p>
        <button
          onClick={() => {
            setStarted(true);
            award(50, "start");
          }}
          data-cursor="START"
          className="blink mt-14 font-mono text-2xl font-bold uppercase tracking-[0.3em] text-white transition-colors hover:text-signal md:text-3xl"
        >
          ▶ Press Start
        </button>
        <Link
          href="/"
          className="mt-16 font-mono text-xs uppercase tracking-[0.25em] text-white/30 hover:text-white/60"
        >
          ← Eject / choose another experience
        </Link>
      </div>
    );
  }

  /* ---------- GAME WORLD ---------- */
  return (
    <div
      ref={rootRef}
      className={`relative min-h-screen bg-ink-950 ${god ? "god-mode" : ""}`}
    >
      {/* HUD */}
      <div className="hud fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink-950/85 backdrop-blur-md">
        <div className="container-content flex h-14 items-center justify-between gap-4 font-mono text-xs">
          <Link href="/" className="uppercase tracking-widest text-white/50 hover:text-white">
            ← Quit
          </Link>
          <div className="flex flex-1 items-center justify-center gap-3 md:gap-5">
            <span className="text-signal">LV.{String(level).padStart(2, "0")}</span>
            <div className="h-2.5 w-32 overflow-hidden rounded-sm border border-white/20 bg-ink-800 md:w-56">
              <div
                className="xp-fill h-full transition-[width] duration-500"
                style={{ width: `${levelPct}%` }}
              />
            </div>
            <span className="text-white/60">{xp} XP</span>
          </div>
          <div className="flex items-center gap-1.5">
            {Object.keys(ACHIEVEMENTS).map((k) => (
              <span
                key={k}
                title={ACHIEVEMENTS[k].title}
                className={`flex h-6 w-6 items-center justify-center rounded-sm border text-[11px] ${
                  unlocked.includes(k)
                    ? "border-signal/60 bg-signal/15 text-signal"
                    : "border-white/10 text-white/20"
                }`}
              >
                {ACHIEVEMENTS[k].icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement toast */}
      {toast && (
        <div
          ref={toastRef}
          className="fixed right-5 top-20 z-50 flex items-center gap-3 rounded-lg border border-signal/40 bg-ink-850 px-4 py-3 shadow-[0_0_30px_rgba(67,229,176,0.25)]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-signal/15 font-mono text-lg text-signal">
            {toast.icon}
          </span>
          <div className="font-mono">
            <p className="text-[10px] uppercase tracking-widest text-signal">
              Achievement unlocked
            </p>
            <p className="text-sm text-white">{toast.title}</p>
            <p className="text-[11px] text-white/45">{toast.desc}</p>
          </div>
        </div>
      )}

      {/* WORLD INTRO */}
      <section className="scanlines relative overflow-hidden pb-16 pt-36 text-center md:pb-24 md:pt-44">
        <h1 className="world-title font-mono text-4xl font-bold tracking-tight text-white md:text-6xl">
          WORLD 1: <span className="text-signal">THE WORK</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md px-6 font-mono text-sm text-white/50">
          Four levels. Each one a real product shipped with AI, code, and
          design. Enter a level to play the full story.
        </p>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
          Hint: arcade kids know a certain code ↑↑↓↓…
        </p>
      </section>

      {/* LEVELS */}
      <section className="levels-zone container-content grid gap-5 pb-24 md:grid-cols-2">
        {projects.map((p, i) => (
          <a
            key={p.slug}
            href={`/work/${p.slug}`}
            onClick={(e) => enterLevel(e, p)}
            data-cursor="PLAY"
            className="level-card group relative overflow-hidden rounded-xl border-2 border-white/10 bg-ink-900 p-7 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_40px_rgba(124,92,255,0.15)]"
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(100% 80% at 50% 110%, ${p.accent}2b, transparent 60%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="uppercase tracking-[0.25em]" style={{ color: p.accent }}>
                  Level {i + 1}
                </span>
                <span className="text-white/35">+200 XP</span>
              </div>
              <h2 className="mt-5 font-mono text-3xl font-bold tracking-tight text-white">
                {p.title}
              </h2>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-white/40">
                {p.theme}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{p.tagline}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {[...Array(3)].map((_, s) => (
                    <span key={s} className="text-sm" style={{ color: p.accent }}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/40 transition-colors group-hover:text-white">
                  Insert coin →
                </span>
              </div>
            </div>
          </a>
        ))}
      </section>

      {/* BONUS STAGE */}
      <section className="bonus-zone border-t border-white/5 py-20">
        <div className="container-content">
          <h2 className="text-center font-mono text-2xl font-bold tracking-tight text-white md:text-3xl">
            BONUS STAGE: <span className="text-accent-glow">SIDE QUESTS</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experiments.map((x, i) => (
              <div
                key={x.title}
                className="rounded-lg border border-dashed border-white/15 bg-ink-900/60 p-5 transition-colors hover:border-accent/40"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-glow/70">
                  Quest {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2.5 text-sm font-medium text-white">{x.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/45">{x.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHARACTER SHEET / FINAL */}
      <section className="border-t border-white/5 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Final boss: your roadmap
        </p>
        <h2 className="mt-6 font-mono text-3xl font-bold text-white md:text-5xl">
          READY PLAYER TWO?
        </h2>
        <p className="mx-auto mt-4 max-w-sm font-mono text-sm text-white/50">
          View the character sheet, or send a party invite.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/resume"
            onClick={() => award(100, "resume")}
            data-cursor="STATS"
            className="btn-ghost font-mono uppercase tracking-widest"
          >
            ▤ Character sheet
          </Link>
          <a
            href="mailto:melissa.casole@yahoo.com"
            data-cursor="INVITE"
            className="btn-primary font-mono uppercase tracking-widest"
          >
            ✉ Send party invite
          </a>
        </div>
        <p className="mt-16 font-mono text-[11px] text-white/25">
          © {new Date().getFullYear()} MC · NO CONTINUES NEEDED
        </p>
      </section>
    </div>
  );
}
