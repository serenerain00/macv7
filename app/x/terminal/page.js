"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects, tools, experiments, experimentsIntro } from "@/lib/projects";

const BOOT_LINES = [
  "MC-OS v7.0 — Creative Technologist Kernel",
  "Loading modules: ai ✓  code ✓  design-systems ✓  cognitive-psych ✓",
  "Mounting /work .................. 4 flagship builds found",
  "Mounting /experiments ........... continuous",
  "Identity check: NOT a traditional UX portfolio ✓",
  "",
  "When ideas are difficult to explain, I build them.",
  "",
  'Type "help" (or click a command) to begin.',
];

const HELP = [
  ["help", "list available commands"],
  ["work", "list the 4 flagship projects"],
  ["open <project>", "open a project, e.g. open arti-wall"],
  ["whoami", "who is Melissa Casole"],
  ["future", "smaller experiments + internal tools"],
  ["stack", "tools + how each is actually used"],
  ["resume", "open the character sheet / resume"],
  ["contact", "get in touch"],
  ["gui", "switch to the cinematic experience"],
  ["clear", "clear the terminal"],
  ["exit", "back to the experience picker"],
];

const SUGGESTIONS = ["help", "work", "whoami", "future", "stack", "resume", "contact"];

let keySeq = 0;
const line = (text, cls = "") => ({ id: ++keySeq, text, cls });

export default function Terminal() {
  const router = useRouter();
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Boot sequence: lines appear one by one
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setHistory((h) => [...h, line(BOOT_LINES[i], i < 5 ? "text-white/45" : "text-signal")]);
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(timer);
        setBooted(true);
      }
    }, 230);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const print = (lines) =>
    setHistory((h) => [...h, ...lines.map((l) => (typeof l === "string" ? line(l) : l))]);

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setCmdHistory((c) => [cmd, ...c]);
    setHistIdx(-1);
    print([line(`melissa@portfolio:~$ ${cmd}`, "text-white/85")]);

    const [name, ...args] = cmd.toLowerCase().split(/\s+/);

    switch (name) {
      case "help":
        print(
          HELP.map(([c, d]) =>
            line(`  ${c.padEnd(16)} ${d}`, "text-white/60")
          )
        );
        break;

      case "work":
      case "ls":
      case "projects":
        print([
          line("drwxr-xr-x  4 melissa  builders", "text-white/40"),
          ...projects.map((p) =>
            line(
              `  ${p.index}  ${p.slug.padEnd(22)} ${p.theme}`,
              "text-signal"
            )
          ),
          line(""),
          line('  → "open arti-wall" to play one', "text-white/40"),
        ]);
        break;

      case "open":
      case "cd": {
        const q = args.join("-");
        const p =
          projects.find((x) => x.slug === q) ||
          projects.find((x) => x.slug.includes(args[0] || "§"));
        if (p) {
          print([line(`Opening ${p.title}…`, "text-accent-glow")]);
          setTimeout(() => router.push(`/work/${p.slug}`), 500);
        } else {
          print([
            line(`open: project not found: ${args.join(" ") || "(none)"}`, "text-red-400"),
            line('  try "work" to list projects', "text-white/40"),
          ]);
        }
        break;
      }

      case "whoami":
        print([
          line("Melissa Casole — Creative Technologist · AI Product Designer", "text-white"),
          line(""),
          line("  Not a UX manager. Not a researcher. A builder.", "text-white/60"),
          line("  I reduce uncertainty by building realistic experiences", "text-white/60"),
          line("  stakeholders can see, test, and understand.", "text-white/60"),
          line(""),
          line("  Specs: AI · code · design systems · cognitive psychology", "text-signal"),
        ]);
        break;

      case "future":
      case "experiments":
        print([
          line("Building the Future", "text-white"),
          line(`  ${experimentsIntro}`, "text-white/45"),
          line(""),
          ...experiments.map((x) =>
            line(`  ◆ ${x.title.padEnd(38)} ${x.blurb}`, "text-signal")
          ),
        ]);
        break;

      case "stack":
      case "tools":
        print(
          tools.map((t) =>
            line(`  ${t.name.padEnd(14)} ${t.use}`, "text-white/60")
          )
        );
        break;

      case "resume":
      case "cv":
        print([line("Loading character sheet…", "text-accent-glow")]);
        setTimeout(() => router.push("/resume"), 500);
        break;

      case "contact":
      case "hire":
        print([
          line("  email    melissa.casole@yahoo.com", "text-signal"),
          line("  status   open to Creative Technologist / AI Product Design roles", "text-white/60"),
          line(""),
          line("  → launching mail client…", "text-white/40"),
        ]);
        setTimeout(() => (window.location.href = "mailto:melissa.casole@yahoo.com"), 700);
        break;

      case "gui":
      case "cinematic":
        print([line("Switching to GUI mode…", "text-accent-glow")]);
        setTimeout(() => router.push("/x/cinematic"), 500);
        break;

      case "arcade":
        print([line("INSERT COIN…", "text-signal")]);
        setTimeout(() => router.push("/x/arcade"), 500);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
      case "quit":
        print([line("Goodbye. (Saving game…)", "text-white/40")]);
        setTimeout(() => router.push("/"), 500);
        break;

      case "sudo":
        print([line("melissa is already root on this portfolio.", "text-red-400")]);
        break;

      default:
        print([
          line(`command not found: ${name}`, "text-red-400"),
          line('  type "help" for the menu', "text-white/40"),
        ]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[next]) {
        setHistIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? cmdHistory[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = [...SUGGESTIONS, "open arti-wall"].find((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="scanlines crt-vignette crt-flicker relative flex h-[100svh] flex-col overflow-hidden bg-[#04060a] font-mono text-sm leading-relaxed md:text-[15px]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* glow bed */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,229,176,0.06),transparent_70%)]" />

      {/* title bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <p className="text-xs text-white/40">melissa@portfolio — zsh</p>
        <button
          onClick={() => router.push("/")}
          className="text-xs uppercase tracking-widest text-white/40 hover:text-white"
        >
          exit ⏎
        </button>
      </div>

      {/* scrollback */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5 md:px-8">
        {history.map((l) => (
          <pre key={l.id} className={`whitespace-pre-wrap ${l.cls || "text-white/75"}`}>
            {l.text || " "}
          </pre>
        ))}

        {booted && (
          <div className="mt-1 flex items-center gap-2">
            <span className="shrink-0 text-signal">melissa@portfolio:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="w-full bg-transparent text-white caret-signal outline-none"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal input"
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* clickable commands for the non-typers */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 border-t border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="mr-1 text-[11px] uppercase tracking-widest text-white/30">
          Quick cmds:
        </span>
        {SUGGESTIONS.map((c) => (
          <button
            key={c}
            onClick={() => {
              run(c);
              inputRef.current?.focus();
            }}
            className="rounded border border-white/15 bg-white/[0.03] px-2.5 py-1 text-xs text-signal/90 transition-colors hover:border-signal/50 hover:bg-signal/10"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
