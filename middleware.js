import { NextResponse } from "next/server";
import { gateToken, GATE_COOKIE } from "@/lib/gate";

const gateHtml = (next, showError) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Melissa Casole — Private Portfolio</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100svh; display: flex; align-items: center; justify-content: center;
    background: #06070a; color: #e7e9ee;
    font-family: -apple-system, "SF Pro Text", Inter, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .glow { position: fixed; top: -20%; left: 50%; transform: translateX(-50%);
    width: 640px; height: 640px; border-radius: 50%;
    background: rgba(124,92,255,.16); filter: blur(140px); pointer-events: none; }
  .card { position: relative; width: min(420px, calc(100vw - 48px)); text-align: center; }
  .eyebrow { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 11px;
    letter-spacing: .25em; text-transform: uppercase; color: rgba(255,255,255,.45); }
  h1 { margin-top: 18px; font-size: 32px; font-weight: 600; letter-spacing: -.02em; }
  h1 em { font-style: normal; background: linear-gradient(90deg,#9a82ff,#43e5b0);
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  p.note { margin-top: 14px; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55); }
  form { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
  input[type=password] {
    width: 100%; padding: 14px 16px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.04);
    color: #fff; font-size: 15px; outline: none; text-align: center;
    transition: border-color .25s;
  }
  input[type=password]:focus { border-color: rgba(124,92,255,.7); }
  button {
    padding: 14px 16px; border-radius: 999px; border: none; cursor: pointer;
    background: #fff; color: #06070a; font-size: 14px; font-weight: 600;
    letter-spacing: .02em; transition: background .25s;
  }
  button:hover { background: #b9a6ff; }
  .err { margin-top: 4px; font-size: 13px; color: #ff7a7a; min-height: 18px; }
  .foot { margin-top: 32px; font-family: ui-monospace, monospace; font-size: 11px;
    color: rgba(255,255,255,.3); }
  .foot a { color: rgba(255,255,255,.5); }
</style>
</head>
<body>
  <div class="glow"></div>
  <main class="card">
    <p class="eyebrow">Melissa Casole · Creative Technologist</p>
    <h1>A private <em>portfolio.</em></h1>
    <p class="note">This work includes confidential client material.
       Enter the password from my resume — or reach out and I'll send it over.</p>
    <form method="POST" action="/api/unlock">
      <input type="hidden" name="next" value="${next.replace(/"/g, "")}" />
      <input type="password" name="password" placeholder="Password" autofocus autocomplete="current-password" required />
      <button type="submit">Enter portfolio →</button>
      <div class="err">${showError ? "That password isn't right — try again." : ""}</div>
    </form>
    <p class="foot"><a href="mailto:melissa.casole@yahoo.com">melissa.casole@yahoo.com</a></p>
  </main>
</body>
</html>`;

export async function middleware(req) {
  const { pathname, search, searchParams } = req.nextUrl;

  // the unlock endpoint must stay reachable
  if (pathname === "/api/unlock") return NextResponse.next();

  const cookie = req.cookies.get(GATE_COOKIE)?.value;
  if (cookie && cookie === (await gateToken())) return NextResponse.next();

  // gate everything else — pages, videos, docs, JS chunks
  const next = pathname + (search && !searchParams.has("e") ? search : "");
  return new NextResponse(gateHtml(next || "/", searchParams.has("e")), {
    status: 401,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/(.*)"],
};
