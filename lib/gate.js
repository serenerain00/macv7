// Shared between edge middleware and the unlock route — Web Crypto only.
export async function gateToken() {
  const secret =
    process.env.SITE_SESSION_SECRET || process.env.SITE_PASSWORD || "";
  const data = new TextEncoder().encode("mc-gate-v1:" + secret);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const GATE_COOKIE = "mc_gate";
