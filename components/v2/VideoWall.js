"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

// Keep RADIUS well under the perspective distance or near-side tiles
// blow up into the camera (giant + blurry)
const RADIUS = 430; // px from viewer to wall
const PERSPECTIVE = 1600; // px camera distance
const TILE_W = 240;
const TILE_H = 150;
const ROW_GAP = 96; // vertical offset of each strip from center

export default function VideoWall({ media, accent = "#7c5cff", title = "Inside the work" }) {
  const viewportRef = useRef(null);
  const worldRef = useRef(null);
  const [active, setActive] = useState(null);
  const activeRef = useRef(null);
  const stateRef = useRef({ yaw: 0, pitch: -3, drift: 0, dragging: false });
  const downRef = useRef({ x: 0, y: 0 });

  activeRef.current = active;

  // Horizontal film strips wrapping a cylinder: one band for small sets,
  // two stacked bands (offset half a step) for larger ones. Tile count per
  // band keeps a visible gap between frames (ring chord > tile width).
  const twoRows = media.length > 3;
  const RING = twoRows ? 10 : 8;
  const rows = twoRows
    ? [
        { y: -ROW_GAP, offset: 0 },
        { y: ROW_GAP, offset: 360 / RING / 2 },
      ]
    : [{ y: 0, offset: 0 }];
  const tiles = rows.flatMap((row, r) =>
    Array.from({ length: RING }, (_, i) => ({
      ...media[(i + r * 3) % media.length],
      angle: (360 / RING) * i + row.offset,
      y: row.y,
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
      st.pitch = gsap.utils.clamp(-12, 8, -3 - this.y * 0.06);
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
        className="relative mt-10 h-[60svh] min-h-[400px] w-full select-none overflow-hidden"
        style={{ perspective: `${PERSPECTIVE}px`, touchAction: "none" }}
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
              className="group absolute"
              style={{
                width: TILE_W,
                height: TILE_H,
                marginLeft: -TILE_W / 2,
                marginTop: -TILE_H / 2,
                transform: `rotateY(${t.angle}deg) translate3d(0, ${t.y}px, -${RADIUS}px) rotateY(180deg)`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* filmstrip frame: sprockets top + bottom */}
              <span className="flex h-full w-full flex-col overflow-hidden rounded-md border border-white/12 bg-black shadow-[0_0_24px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:scale-[1.06] group-hover:border-white/45 group-hover:shadow-[0_0_36px_rgba(124,92,255,0.3)]">
                <span className="h-[13px] w-full shrink-0 bg-[repeating-linear-gradient(90deg,transparent_0_7px,rgba(255,255,255,0.22)_7px_15px,transparent_15px_22px)]" />
                <span className="relative block flex-1 overflow-hidden">
                  <video
                    src={t.src}
                    poster={t.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="pointer-events-none h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent px-2.5 pb-1.5 pt-5 font-mono text-[9px] uppercase tracking-widest text-white/75">
                    {t.caption}
                    <span style={{ color: accent }}>▶</span>
                  </span>
                </span>
                <span className="h-[13px] w-full shrink-0 bg-[repeating-linear-gradient(90deg,transparent_0_7px,rgba(255,255,255,0.22)_7px_15px,transparent_15px_22px)]" />
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
