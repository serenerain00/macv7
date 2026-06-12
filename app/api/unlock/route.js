import { NextResponse } from "next/server";
import { gateToken, GATE_COOKIE } from "@/lib/gate";

export async function POST(req) {
  const form = await req.formData();
  const password = form.get("password");
  let next = String(form.get("next") || "/");
  // only same-site paths — no open redirects
  if (!next.startsWith("/") || next.startsWith("//")) next = "/";

  if (password && password === process.env.SITE_PASSWORD) {
    const res = NextResponse.redirect(new URL(next, req.url), 303);
    res.cookies.set(GATE_COOKIE, await gateToken(), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  // bounce back to the gate with the error flag
  const back = new URL(next, req.url);
  back.searchParams.set("e", "1");
  return NextResponse.redirect(back, 303);
}
