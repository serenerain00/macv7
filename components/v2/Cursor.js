"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const move = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Grow ring over interactive targets; show label when data-cursor has text
    const over = (e) => {
      const t = e.target.closest("[data-cursor], a, button");
      if (!t) return;
      const text = t.getAttribute?.("data-cursor") || "";
      label.textContent = text;
      gsap.to(ring, {
        scale: text ? 3.2 : 1.8,
        backgroundColor: text ? "rgba(124,92,255,0.9)" : "rgba(124,92,255,0.12)",
        borderColor: text ? "transparent" : "rgba(255,255,255,0.5)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: text ? 0 : 0.4, duration: 0.3 });
    };
    const out = (e) => {
      const t = e.target.closest("[data-cursor], a, button");
      if (!t) return;
      label.textContent = "";
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "rgba(124,92,255,0)",
        borderColor: "rgba(255,255,255,0.35)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.18 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(3)" });

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35"
      >
        <span
          ref={labelRef}
          className="select-none font-mono text-[4px] font-bold uppercase tracking-widest text-white"
          style={{ transform: "scale(1)" }}
        />
      </div>
    </>
  );
}
