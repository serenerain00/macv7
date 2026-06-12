# Session Notes — June 12, 2026

## Where things stand (all live)

- **www.melissacasole.com** serves the new portfolio (apex 308 → www, SSL valid).
- Launcher at `/` with three experiences: `/x/cinematic`, `/x/arcade`, `/x/terminal`.
- Four project pages with drag-to-spin film-strip video walls (Arti Wall ×5 OR videos, Horizon ×2, Vision DS ×6 doc-site recordings, ProtoCue ×1).
- `/resume` digital resume + new Creative Technologist PDF at `/docs/Melissa-Casole-Resume.pdf`.
- Repo: `serenerain00/macv7` (PUBLIC) · Vercel project `macv7` (account `melissacasole-2633`) · `main` = deployed branch, `v2-gsap` = same history (can be deleted).

## Do tomorrow

1. **Rotate the Vision DS doc-site password.** The `vision / Vision123!` basic-auth creds
   were committed to the PUBLIC macv7 repo (scripts/, now scrubbed — but they remain in
   git history). The DS site is currently public anyway (protection disabled for capture),
   so decide: keep it public (then creds are moot) or re-gate it **with a new password**.
2. **Connect GitHub → Vercel auto-deploy.** Vercel dashboard → macv7 → Settings → Git →
   connect `serenerain00/macv7`. Until then, deploys are manual (`vercel deploy --prod`).
3. **QA pass on a phone** — wall drag (touch), arcade, terminal, lightbox close targets.
4. **Verify project years** in `lib/projects.js` (Arti Wall 2025, Horizon 2025, VDS 2024,
   ProtoCue 2025 were assumptions).
5. **Review the resume PDF copy** word-by-word (it's live for recruiters). Source:
   `resume-pdf/resume.html` → re-render with the Chrome command in git log / ask Claude.

## Nice-to-haves (when inspired)

- Unused assets ready to wire in: `assets-from-v6/images/elements/` (ELEMENTS/First
  Advantage), `saviynt/`, `adf/`, `visuals/*.webp`, headshot `public/images/melissa.jpg`,
  `protocue1.png` — could enrich pages or "Building the Future".
- GoDaddy DNS cosmetic cleanup: delete leftover TXT `@` (vc-domain-verify) and
  TXT `_vercel.www` records.
- Old Vercel account: delete the old portfolio project entirely.
- `gh` CLI on this machine is now `serenerain00`; switch back for work with
  `gh auth switch -u mecasole-fadv`.
- Re-record DS captures anytime: `VDS_PASS=<pw> node scripts/vds-capture.mjs`
  (env vars now required; creds no longer in code).
- Consider Vercel Analytics / OG image for link previews.

## Architecture crib sheet

- All project/experiment content: `lib/projects.js` (single source of truth).
- Resume content: `lib/resume.js` (site) + `resume-pdf/resume.html` (PDF source).
- Video wall component + tuning knobs (RADIUS/PERSPECTIVE/TILE/ROW_GAP):
  `components/v2/VideoWall.js`.
- Custom cursor (hides over `video`/`.native-cursor`): `components/v2/Cursor.js`.
- Dev server and `npm run build` share `.next` — don't run both at once.
