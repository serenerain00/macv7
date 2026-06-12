"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

const RING = 12; // tiles per ring
const RADIUS = 640; // px from viewer to wall

export default function VideoWall({ media, accent = "#7c5cff", title = "Inside the work" }) {
  const viewportRef = useRef(null);
  const worldRef = useRef(null);
  const [active, setActive] = useState(null);
  const activeRef = useRef(null);
  const stateRef = useRef({ yaw: 0, pitch: -6, drift: 0, dragging: false });
  const downRef = useRef({ x: 0, y: 0 });

  activeRef.current = active;

  // Repeat media around the ring(s); two tilted rings ≈ inside of a sphere
  const rows =
    media.length > 2
      ? [
          { tilt: -16, offset: 0 },
          { tilt: 14, offset: 360 / RING / 2 },
        ]
      : [{ tilt: -2, offset: 0 }];
  const tiles = rows.flatMap((row, r) =>
    Array.from({ length: RING }, (_, i) => ({
      ...media[(i + r * 3) % media.length],
      angle: (360 / RING) * i + row.offset,
      tilt: row.tilt,
      key: `${r}-${i}`,
    }))
  );

  useEffect(() => {
    const st = stateRef.current;
    const world = worldRef.current;
    const render = () => {
      gsap.set(world, {
        rotationX: st.pitch,
        rotationY: st.yaw + st.drift,
      });
    };
    render();

    // Drag a hidden proxy; its x/y momentum (inertia) becomes camera rotation
    const proxy = document.createElement("div");
    const update = function () {
      st.yaw = this.x * 0.22;
      st.pitch = gsap.utils.clamp(-34, 16, -6 - this.y * 0.12);
      render();
    };
    const drag = Draggable.create(proxy, {
      trigger: viewportRef.current,
      type: "x,y",
      inertia: true,
      onPress() {
        st.dragging = true;
      },
      onRelease() {
        st.dragging = false;
      },
      onDrag: update,
      onThrowUpdate: update,
    })[0];

    // Slow idle orbit so the wall always feels alive
    const tick = () => {
      if (!st.dragging && !activeRef.current) {
        st.drift += 0.035;
        render();
      }
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      drag.kill();
    };
  }, []);

  // Esc closes the lightbox
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onTileDown = (e) => {
    downRef.current = { x: e.clientX, y: e.clientY };
  };
  const onTileClick = (e, tile) => {
    // Real drags shouldn't open the lightbox
    const dx = e.clientX - downRef.current.x;
    const dy = e.clientY - downRef.current.y;
    if (Math.hypot(dx, dy) < 8) setActive(tile);
  };

  const hoverPlay = (e) => e.currentTarget.querySelector("video")?.play();
  const hoverPause = (e) => e.currentTarget.querySelector("video")?.pause();

  return (
    <section className="relative overflow-hidden border-t border-white/5 py-16 md:py-20">
      <div className="container-content flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            See it, don&apos;t read it
          </h2>
          <p className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">
            {title}
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
          ↔ Drag to look around · click a screen to play
        </p>
      </div>

      {/* THE SPHERE */}
      <div
        ref={viewportRef}
        data-cursor="DRAG"
        className="relative mt-10 h-[68svh] min-h-[420px] w-full select-none overflow-hidden"
        style={{ perspective: "900px", touchAction: "none" }}
      >
        {/* depth fog */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_42%,#06070a_92%)]" />

        <div
          ref={worldRef}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {tiles.map((t) => (
            <button
              key={t.key}
              onPointerDown={onTileDown}
              onClick={(e) => onTileClick(e, t)}
              onMouseEnter={hoverPlay}
              onMouseLeave={hoverPause}
              className="group absolute overflow-hidden rounded-lg border border-white/15 bg-ink-900 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:border-white/40"
              style={{
                width: 300,
                height: 176,
                marginLeft: -150,
                marginTop: -88,
                transform: `rotateY(${t.angle}deg) rotateX(${t.tilt}deg) translateZ(-${RADIUS}px) rotateY(180deg)`,
                backfaceVisibility: "hidden",
              }}
            >
              <video
                src={t.src}
                poster={t.poster}
                muted
                loop
                playsInline
                preload="none"
                className="pointer-events-none h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-6 font-mono text-[10px] uppercase tracking-widest text-white/75"
              >
                {t.caption}
                <span style={{ color: accent }}>▶</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {active && (
        <div
          className="native-cursor fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-10"
          onClick={() => setActive(null)}
        >
          <figure
            className="w-full max-w-5xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={active.src}
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[78svh] w-full rounded-xl border border-white/15 bg-black object-contain shadow-[0_0_80px_rgba(124,92,255,0.2)]"
            />
            <figcaption className="mt-4 flex items-center justify-between font-mono text-sm text-white/65">
              <span>
                <span style={{ color: accent }}>●</span> {active.caption}
              </span>
              <button
                onClick={() => setActive(null)}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                Close ✕
              </button>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
