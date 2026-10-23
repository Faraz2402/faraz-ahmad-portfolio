# MASTER BUILD PLAN — FARAZ AHMAD
### Professional Portfolio · Procurement & Spend Analytics
*Creative brief + implementation instructions for Claude Code*

---

## PART A — CREATIVE BRIEF

---

## 1. Website Overview

| | |
|---|---|
| **Client** | Faraz Ahmad |
| **Type** | Professional portfolio (personal brand, career-facing) |
| **Primary audience** | Recruiters, hiring managers, procurement / finance / legal leaders |
| **Secondary audience** | Industry peers, consulting partners, transformation leads |
| **Primary goal** | Convert visitors into LinkedIn connections |
| **Primary CTA** | **Connect on LinkedIn** → `https://www.linkedin.com/in/faraz-ahmad24/` |
| **Format** | Single-page, scroll-driven cinematic story |
| **Stack** | Static: `index.html`, `style.css`, `script.js`, `/assets` · GSAP + ScrollTrigger + Lenis via CDN |

**The one-line idea:** *A procurement portfolio that feels like a film about clarity* — the visitor scrolls from noise (fragmented data, unmanaged contracts, slow workflows) into signal (visibility, control, measurable results), and Faraz is the person who makes that shift happen.

---

## 2. Core Positioning

**Positioning statement**
For procurement, finance and legal teams who are drowning in fragmented supplier data and reactive processes, Faraz Ahmad is the procurement analytics professional who turns spend, supplier and contract data into decisions — and decisions into measurable results. Unlike analysts who stop at the dashboard, Faraz starts with the business problem and finishes with the operational outcome.

**Headline (hero)**
> **Spend, made visible.**
> *Procurement analytics that turns data into decisions.*

**Alternate headlines (for kinetic rotation / A-B)**
- Clarity is the cheapest cost saving.
- From fragmented data to measurable control.
- Not dashboards. Decisions.

**Sub-headline**
> I help procurement, finance and legal teams make smarter sourcing decisions, control supplier and contract risk, and run leaner Procure-to-Pay operations — using Power BI, ERP data and process design.

**Proof line**
> $306M in spend analysed · 12,000 contracts governed · 8 years across finance, data and procurement.

**Differentiator (repeat throughout)**
> **Dashboards are the beginning, not the deliverable.**

---

## 3. Brand Personality

| Trait | What it means on screen |
|---|---|
| **Cinematic** | Pinned, scroll-scrubbed video chapters; slow reveals; letterboxed transitions |
| **Premium / Luxury** | Generous negative space, restrained palette, editorial serif accents, hairline rules |
| **Futuristic** | Data-glow lines, monospaced metadata, subtle grid, particle "spend network" |
| **Warm / Welcoming / Friendly** | Warm amber highlight, first-person copy, human portrait, soft easing |
| **Bold** | Viewport-filling numerals and headlines |
| **Playful** | Magnetic buttons, cursor that reacts to data, counters that "tick", easter-egg hover states on stats |
| **Creative** | Kinetic typography — words split, slide, re-assemble |

**Voice:** confident, plain-spoken, numbers-first. Short sentences. No buzzword soup. Every claim paired with a figure.

**Archetype:** *The Translator* — fluent in finance, data, and operations; converts complexity into action.

---

## 4. Visual Direction

**Concept: "Night Ledger."** A deep midnight-navy world, lit by clean electric-blue data light and one warm amber accent — like a boardroom at night where the only light comes from the numbers that matter.

- **Base:** near-black navy, layered with soft radial glows (never flat black).
- **Signal:** electric blue / cyan for data, lines, charts, progress.
- **Warmth:** amber-gold for highlights, key numbers, the CTA — the "human" colour.
- **Text:** warm ivory, not pure white.
- **Texture:** fine animated film grain (3–4% opacity) + faint 12-column grid lines at section intros.
- **Imagery:** the three cinematic Higgsfield clips + Faraz's portrait, colour-graded to the palette (navy shadows, warm skin, blue rim light).
- **Graphic motif:** thin connecting lines and nodes ("supplier network") that draw themselves on scroll — reused in hero canvas, pillar dividers, story timeline, and footer.

---

## 5. Higgsfield Seedance 2.0 — Asset Generation

### 5.1 Identity reference (mandatory for every generation)

```
Reference image: ./Media/Faraz professional.jpg
```

Upload this image as the **character / identity reference** for every Seedance 2.0 generation so Faraz's face stays consistent across all three clips.

**Identity notes to include in every prompt:**
> South Asian man, early 30s, short neat black hair swept to the side, clean-shaven with light stubble shadow, dark brown eyes, calm confident expression. Wearing a tailored charcoal suit, crisp white shirt, dark patterned tie. Professional, composed, approachable.

### 5.2 Global generation settings

| Setting | Value |
|---|---|
| Model | Higgsfield **Seedance 2.0** |
| Resolution | **1080p** (1920×1080) |
| Aspect ratio | **16:9** |
| Duration | **8–12 s** per clip (target 10 s) |
| Camera | Single continuous move per clip, slow, stabilised |
| Look | Photoreal, cinematic, shallow depth of field, anamorphic feel, soft film grain |
| Grade | Deep navy shadows, electric-blue practical light from screens, one warm amber key/rim light on Faraz |
| Negative prompt | no logos, no brand names, no readable text, no gibberish text, no watermarks, no cartoon look, no distorted hands, no extra fingers, no face morphing, no fast cuts, no lens flares overload |

### 5.3 Clip mapping

| File | Scene | Used in |
|---|---|---|
| `assets/video/scene-1-analytics.mp4` | Turning Data into Decisions | Hero background + Pillar 01 chapter |
| `assets/video/scene-2-p2p.mp4` | Making Procurement Work Smarter | Pillar 02 chapter |
| `assets/video/scene-3-governance.mp4` | Building Control, Reducing Risk | Pillar 03 chapter |
| `assets/img/scene-*-poster.jpg` | First frame of each clip | Poster / mobile fallback |
| `assets/img/faraz-portrait.jpg` | Optimised copy of reference portrait | Story section |

---

## 6. Three Cinematic Scenes

Three **separate, standalone** clips. Shared visual language; each tells its own story and lands on one outcome.

### SCENE 1 — PROCUREMENT & SPEND ANALYTICS · *"Turning Data into Decisions"*

**Story beat:** Chaos → pattern → decision.

**Seedance 2.0 prompt:**
> Cinematic photoreal shot, 16:9, 1080p, 10 seconds. A modern dark corporate analytics room at night, deep navy walls, a wall of large frameless glass displays glowing with electric-blue spend dashboards: bar charts, supplier network graphs with glowing nodes, category treemaps, trend lines. At first the data is scattered and noisy — thousands of tiny floating points. The camera starts behind the man from the reference image (South Asian man, short neat black hair, charcoal suit, white shirt, dark tie) and slowly pushes forward past his shoulder toward the screens. As the camera moves, the scattered points flow together and organise into clean, clear charts, one large cluster highlights in warm amber to show spending concentration. He turns his head slightly, calm and focused, profile lit by blue screen light with a warm amber rim light. Shallow depth of field, soft film grain, smooth stabilised dolly. No logos, no readable text.

**Mood:** strategic, analytical, confident.
**End frame:** clean dashboard wall, amber highlight cluster, Faraz in soft-focus profile — holds for 1 s (good scrub end-state).
**On-screen copy (HTML, overlaid):** *"$306M in spend. 973 suppliers. One clear picture."*

### SCENE 2 — P2P OPTIMISATION & TRANSFORMATION · *"Making Procurement Work Smarter"*

**Story beat:** Disconnected steps → one flowing system.

**Seedance 2.0 prompt:**
> Cinematic photoreal shot, 16:9, 1080p, 10 seconds. A sleek modern enterprise operations space at night, dark navy and glass. Floating holographic cards representing purchase requests, approvals, purchase orders and supplier records hang in the air, disconnected and slightly out of order. The man from the reference image (South Asian man, short neat black hair, charcoal suit, white shirt, dark tie) stands among them and calmly gestures; thin glowing electric-blue lines begin to connect the cards into one smooth flowing pipeline that streams left to right, linking three softly glowing hubs. The camera tracks laterally alongside the flowing workflow, then gently cranes up to reveal the complete integrated system glowing in balance, a warm amber pulse travelling through it. Realistic lighting, shallow depth of field, soft film grain, smooth stabilised motion. No logos, no readable text.

**Mood:** efficient, structured, results-oriented.
**End frame:** wide reveal of the complete, connected pipeline with amber pulse.
**On-screen copy:** *"PO processing: 6 days → 4.8. Supplier data errors: −40%."*

### SCENE 3 — SUPPLIER & CONTRACT GOVERNANCE · *"Building Control, Reducing Risk"*

**Story beat:** Hidden risk → caught early → governed ecosystem.

**Seedance 2.0 prompt:**
> Cinematic photoreal shot, 16:9, 1080p, 10 seconds. A refined, dimly lit executive office at night with a large curved glass display showing a digital portfolio of contracts as a horizontal glowing timeline, renewal markers, and supplier performance rings in electric blue. A few contract nodes pulse in warm amber as early risk alerts. The man from the reference image (South Asian man, short neat black hair, charcoal suit, white shirt, dark tie) stands at the display, touches one amber alert and it resolves to calm blue. The camera glides slowly along the timeline from left to right, then pulls back to reveal a balanced, connected constellation of suppliers and contracts, every node steady blue, Faraz in the foreground looking assured. Trustworthy, precise, premium. Shallow depth of field, soft film grain, smooth stabilised camera. No logos, no readable text.

**Mood:** trustworthy, precise, risk-aware.
**End frame:** calm, fully-blue governed constellation with Faraz in foreground.
**On-screen copy:** *"Unreviewed contract exposure: $18M → $13M."*

---

## 7. Website Structure

```
00  Preloader            — counter 0 → 100, name reveal
01  Hero                 — kinetic headline over Scene 1 ambient video
02  Stats strip          — animated counters marquee
03  Mission              — scroll-revealed manifesto (word-by-word highlight)
04  Three Pillars        — pinned cinematic chapters, scroll-scrubbed video ×3
05  Story                — portrait + horizontal timeline (Finance → Data → Procurement)
06  Services / Toolkit   — "How I work" + systems & tools
07  Featured Work        — 4 case studies (horizontal scroll on desktop)
08  Final CTA            — giant "Let's connect." + LinkedIn magnetic button
09  Footer               — signature, links, back-to-top
```

Fixed UI: minimal top nav (FA monogram · Work · Story · Connect), scroll-progress hairline, custom cursor (desktop), grain overlay.

---

## 8. Hero Section

- **Background:** `scene-1-analytics.mp4` muted, autoplay, loop, `playsinline`, darkened by a navy gradient vignette (bottom 60%) + blue radial glow. Fallback: animated canvas "spend network" (nodes + lines drifting, reacting to cursor).
- **Eyebrow (mono, small caps):** `PROCUREMENT · SPEND ANALYTICS · CONTRACT GOVERNANCE`
- **Headline (huge, 2 lines, split by characters):**
  `Spend,` / `made visible.` — "visible" in Instrument Serif italic, amber.
- **Sub:** "I help procurement, finance and legal teams make smarter sourcing decisions, control supplier and contract risk, and run leaner Procure-to-Pay operations."
- **CTAs:** primary `Connect on LinkedIn ↗` (amber, magnetic) · secondary `See the impact ↓` (ghost, scrolls to stats).
- **Meta row (bottom):** `Faraz Ahmad` · `8 yrs finance → data → procurement` · `Scroll` indicator (animated line).
- **Intro animation:** chars rise from masked lines (stagger 0.025), video fades from black + scales 1.15 → 1, nav and meta fade in last.
- **On scroll:** headline scales down and drifts up with parallax; video darkens and blurs slightly as Stats enter.

---

## 9. Animated Stats Strip

Full-width band, hairline borders top/bottom. Counters animate when in view (ScrollTrigger, once). Below, an infinite marquee of secondary stats moves with scroll velocity.

**Primary counters (4 large):**
| Value | Label |
|---|---|
| **$306M** | annual spend analysed |
| **12,000** | contracts made visible |
| **16,000** | suppliers governed |
| **30%** | procurement efficiency gain |

**Marquee (secondary):** `−20% PO processing time` ✦ `−40% supplier data errors` ✦ `−28% unreviewed contract exposure` ✦ `$40K+ surprise renewals stopped` ✦ `30% faster sourcing cycles` ✦ `40% faster deliveries` ✦ `973 suppliers mapped` ✦

Hover on a primary stat: number glows amber and a one-line context tooltip appears (e.g. "Power BI spend analytics at Conga").

---

## 10. Mission Section

Large-type manifesto. Words start at 15% opacity and light to 100% as you scroll (scrubbed).

> **Most procurement teams don't have a data problem. They have a clarity problem.**
> Spend sits across systems. Contracts outlive their owners. Renewals arrive as surprises.
> My work is to turn that noise into visibility, visibility into control, and control into **measurable results** — lower cost, lower risk, faster operations.

Key words ("clarity", "visibility", "control", "measurable results") turn amber once lit.

---

## 11. Three Pillars Section

Section intro: `What I do` — "Three disciplines. One outcome: better decisions."

Each pillar is a **pinned, full-viewport chapter** (≈ 250vh scroll each). The clip scrubs frame-accurately with scroll; copy layers animate on top. Between chapters: a letterbox wipe (black bars close → open) as the transition.

**PILLAR 01 — Procurement & Spend Analytics** *(Scene 1)*
- Title: **Turning data into decisions.**
- Body: I turn complex procurement and supplier data into clear, actionable insight with Power BI, Excel and rigorous analysis — exposing fragmentation, concentration and savings opportunities so sourcing decisions are made on evidence.
- Proof chips: `$306M spend` · `973 suppliers` · `+30% efficiency`

**PILLAR 02 — P2P Optimisation & Transformation** *(Scene 2)*
- Title: **Making procurement work smarter.**
- Body: I simplify Procure-to-Pay processes and strengthen controls across SAP MM, Oracle NetSuite, Salesforce and Ariba — fewer handoffs, cleaner data, faster cycles.
- Proof chips: `PO time −20%` · `Data errors −40%` · `Sourcing 10 → 7 days`

**PILLAR 03 — Supplier & Contract Governance** *(Scene 3)*
- Title: **Control before it's a crisis.**
- Body: I give procurement, finance and legal teams visibility into contract ownership, renewals, compliance and supplier risk — so issues surface early, not at renewal.
- Proof chips: `12,000 contracts` · `16,000 suppliers` · `Exposure $18M → $13M`

Chapter layout: index number (`01 / 03`) huge outline numerals left; text card bottom-left with glass blur; progress rail on the right showing scrub position.

---

## 12. Story Section

**Title:** *From the ledger to the leadership table.*

Left: Faraz's portrait (`assets/img/faraz-portrait.jpg`), duotone-graded (navy shadows / warm highlights), revealed with a clip-path wipe and slow parallax. Right: narrative.

**Copy:**
> I started in finance and data analysis — learning how a business really runs through its numbers, its controls and its decisions. Over eight years, that foundation carried me into procurement and spend analytics, where I found the work I love: taking messy, fragmented data and turning it into something leaders can act on.
>
> At **Conga**, I built a Power BI spend analytics solution covering $306M across 973 suppliers that exposed fragmentation and fuelled supplier consolidation. At **Infosys, supporting BP**, I sharpened reporting across 12,000 contracts and 16,000 suppliers — and found that 5% of contracts had non-employees in key roles, a quiet risk that could leave contracts unmanaged the day their access ended.
>
> I don't treat a dashboard as the finish line. I start with the business problem, find what the data is really saying, and work across procurement, finance, legal and technology until it becomes action.

**Horizontal timeline (scrubbed draw-on line with nodes):**
1. **Finance & Data Analysis** — controls, reporting, decision support
2. **Manufacturing Procurement (SAP MM)** — sourcing 10 → 7 days, deliveries 5 → 3 days
3. **P2P & Operations** — PO time −20%, supplier data errors −40%, $40K+ renewals saved
4. **Conga** — $306M spend analytics, +30% efficiency
5. **Infosys · BP** — 12K contracts, 16K suppliers, contract risk surfaced

*(Order reflects narrative progression; exact dates to be confirmed by Faraz — no dates are shown until provided.)*

---

## 13. Service Section — "How I Work" + Toolkit

**Title:** *Problem → Insight → Action.*

Three-step process cards (stacking cards on scroll):
1. **Find the real problem.** Start with the business question — cost, risk, speed — not the chart.
2. **Make the data honest.** Clean, connect and model spend, supplier and contract data until it tells the truth.
3. **Turn insight into operations.** Workflows, controls, trackers and governance that keep the result in place.

**Who I work with:** Procurement · Finance · Legal · IT / Technology

**Toolkit (pill grid with hover glow):** Power BI · Excel · SAP MM · Oracle NetSuite · Salesforce · SAP Ariba · Spend Analytics · Supplier Master Data · Contract Lifecycle · Procure-to-Pay · Process Optimisation · Data Modelling

---

## 14. Featured Work Section

**Title:** *Selected impact.* Horizontal-scroll gallery (desktop, pinned) / vertical stack (mobile). Each card: number, client/context, challenge, what I did, outcome (big number).

| # | Card | Challenge | What I did | Outcome |
|---|---|---|---|---|
| 01 | **Conga — Spend Analytics** | $306M spend scattered across 973 suppliers, no single view | Built & deployed a Power BI spend analytics solution exposing fragmentation and concentration | **+30%** procurement efficiency via supplier consolidation |
| 02 | **Infosys · BP — Contract Visibility** | 12,000 contracts, 16,000 suppliers, unclear ownership & renewals | Enhanced Power BI reporting on ownership, renewals and risk; flagged 5% of contracts with non-employees in key roles | Risks surfaced earlier; stronger contract governance |
| 03 | **Contract Exposure Review** | $18M in unreviewed contract value | Compliance reviews and governance controls | **−28%** exposure ($18M → $13M) |
| 04 | **Renewal & License Tracker** | Missed auto-renewals across 100+ subscriptions | Built an Excel renewal and license tracker with alerts | **$40K+** unplanned annual renewals eliminated |
| 05 | **P2P & Master Data** | Slow POs, error-prone supplier records | Process redesign and data controls | PO **6 → 4.8 days**; **−40%** data errors |
| 06 | **Manufacturing Sourcing (SAP MM)** | Slow sourcing and delivery | Sourcing process and route/schedule redesign | Sourcing **10 → 7 days**; delivery **5 → 3 days** |

Card hover: tilt 3D (max 4°), amber outcome number scales, background node-graph brightens.

---

## 15. Final CTA Section

Full-viewport, dark with a single expanding blue-amber radial glow that follows the cursor.

- Eyebrow: `Open to procurement analytics & transformation roles`
- Giant kinetic line: **Let's make your spend** / ***make sense.***
- Sub: "Recruiters, hiring managers and procurement leaders — I'd love to hear what you're solving."
- Button: huge circular magnetic **Connect on LinkedIn ↗** → `https://www.linkedin.com/in/faraz-ahmad24/` (`target="_blank" rel="noopener"`).
- Infinite marquee behind: `CONNECT ✦ COLLABORATE ✦ CLARIFY ✦`

---

## 16. Footer

- Large wordmark **FARAZ AHMAD** spanning full width (outlined, fills amber on hover).
- Line: "Procurement & Spend Analytics · P2P Transformation · Supplier & Contract Governance"
- Links: LinkedIn ↗ · Back to top ↑
- `© 2026 Faraz Ahmad. Built with clarity.`
- Local time widget optional — omitted (location not provided).

---

## PART B — DESIGN SYSTEM

---

## 17. Complete Visual Style Guide

### Colour tokens

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#05070D` | Deepest background |
| `--navy` | `#0A1020` | Primary background |
| `--navy-2` | `#111A33` | Raised surfaces, cards |
| `--line` | `rgba(170,190,255,0.12)` | Hairlines, borders |
| `--ivory` | `#F2EEE6` | Primary text |
| `--mist` | `#9AA6C3` | Secondary text |
| `--blue` | `#4C8DFF` | Data, links, lines |
| `--cyan` | `#6FE3FF` | Glow highlights, active states |
| `--amber` | `#FFB45C` | CTA, key numbers, emphasis |
| `--amber-soft` | `#FFD7A3` | Hover / gradient end |

**Gradients:** `--glow-blue: radial-gradient(60% 60% at 50% 40%, rgba(76,141,255,.25), transparent 70%)` · `--glow-amber: radial-gradient(40% 40% at 50% 50%, rgba(255,180,92,.22), transparent 70%)`

**Rules:** amber is rare — max one amber element per viewport besides numbers. Never pure `#000` or `#fff`. Contrast ≥ 4.5:1 for body text.

### Surfaces
Glass cards: `background: rgba(17,26,51,.55); backdrop-filter: blur(14px); border: 1px solid var(--line); border-radius: 20px;`

### Grain
Fixed full-screen pseudo-element with an inline SVG `feTurbulence` noise, `opacity: .05`, `mix-blend-mode: overlay`, animated via `steps()` keyframe jitter (8 frames, 0.6 s).

### Spacing & grid
12-col grid, `max-width: 1440px`, gutters `clamp(16px, 3vw, 40px)`. Section padding `clamp(96px, 16vh, 200px)`. 8-pt spacing scale.

---

## 18. Typography

All from Google Fonts.

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / headlines | **Syne** | 700–800 | `clamp(3.5rem, 11vw, 12rem)`, line-height .9, tracking −0.04em |
| Editorial accent | **Instrument Serif** *Italic* | 400 | Same size as display, used for 1–2 words |
| Body | **Inter** | 400/500 | `clamp(1rem, 1.1vw, 1.2rem)`, line-height 1.6 |
| Data / labels / eyebrows | **JetBrains Mono** | 400/500 | `0.75–0.85rem`, uppercase, tracking 0.12em |
| Stats numerals | **Syne** | 800 | `clamp(3rem, 8vw, 8rem)`, tabular feel |

Kinetic rules: headlines split into lines → words → chars (custom splitter in `script.js`, no paid SplitText). Each line wrapped in `overflow:hidden` mask.

---

## 19. Animation Direction

- **Easing:** `power4.out` for reveals, `expo.inOut` for transitions, `none` for scrubs. Default durations 0.9–1.4 s.
- **Signature moves:**
  1. **Mask rise** — chars rise from below a line mask, stagger 0.02–0.03.
  2. **Light-up text** — word opacity scrubbed 0.15 → 1 (Mission).
  3. **Letterbox wipe** — black bars close/open between pillar chapters.
  4. **Draw-on lines** — SVG `stroke-dashoffset` scrubbed (timeline, network dividers).
  5. **Counters** — numbers tween with snap, format with `$`, `K`, `M`, `%`.
  6. **Clip-path reveals** — images open from `inset(100% 0 0 0)` to `inset(0)`.
  7. **Velocity marquees** — marquee speed/direction react to Lenis scroll velocity.
- **Restraint:** one hero motion per viewport. Nothing bounces. Nothing spins.
- **Reduced motion:** `prefers-reduced-motion` → disable Lenis, scrubs become simple fades, video shows poster, marquees static.

---

## 20. Interaction Design

- **Custom cursor (desktop, pointer:fine):** 8px ivory dot + 36px ring that lags (lerp 0.15). Grows to 80px with label on cards ("View"), links ("Open"), video ("Scroll"). `mix-blend-mode: difference`.
- **Magnetic buttons:** CTA buttons follow cursor within 80px radius (strength 0.35), spring back with `elastic.out(1, .4)`.
- **Hover states:** links get a sliding underline; stat numbers glow amber; tool pills fill with blue gradient; work cards tilt.
- **Hero canvas:** nodes gently repel from cursor; lines connect nodes within 140px.
- **Nav:** hides on scroll down, reveals on scroll up; turns glass after 80px.
- **Anchor links:** use `lenis.scrollTo(target, { duration: 1.6 })`.
- **Focus states:** visible 2px cyan outline offset 4px for keyboard users.

---

## 21. Scroll Behaviour

- **Lenis** smooth scroll (`lerp: 0.085`, `smoothWheel: true`), driven by `gsap.ticker`, synced with `ScrollTrigger.update`.
- **Pinned sections:** Pillars (3 chapters, ~250vh each), Featured Work (horizontal, length = track width), Process cards (stack).
- **Video scrubbing:** for each pillar, `ScrollTrigger` `scrub: true` maps progress → `video.currentTime = progress * duration`, applied inside `requestAnimationFrame` with lerp smoothing (0.12) to avoid seek jank. Videos must be encoded all-intra (see §23).
- **Scroll progress:** 1px blue hairline across top, scaleX from 0 → 1.
- **Section transitions:** background colour shifts between `--navy` and `--ink` via ScrollTrigger to create chapter rhythm.

---

## 22. Mobile Behaviour

- Breakpoints: `≤ 1024px` tablet, `≤ 640px` mobile.
- Lenis kept on touch with `syncTouch: false` (native touch scroll) for reliability.
- **Video:** no scrubbing on mobile (seek performance is poor). Pillar chapters become stacked sections; each video autoplays muted/looped when in view (IntersectionObserver), pauses when out. Posters load first.
- Horizontal Featured Work → vertical cards with swipe-free stack.
- Headlines clamp down to ~3.2rem; stats become a 2×2 grid.
- Custom cursor & magnetic effects disabled (`pointer: coarse`).
- Nav collapses to monogram + "Connect" button + full-screen menu overlay.
- Tap targets ≥ 44px; 16px side gutters; no horizontal overflow (`overflow-x: clip` on body).

---

## PART C — TECHNICAL IMPLEMENTATION (for Claude Code)

---

## 23. Technical Implementation

### 23.1 File structure
```
/Portfolio Website
├── index.html
├── style.css
├── script.js
├── BUILD-PLAN.md
├── Media/
│   └── Faraz professional.jpg        ← identity reference (source, not served)
└── assets/
    ├── video/
    │   ├── scene-1-analytics.mp4
    │   ├── scene-2-p2p.mp4
    │   └── scene-3-governance.mp4
    ├── img/
    │   ├── faraz-portrait.jpg         ← optimised copy (≤ 200 KB, 1200px tall)
    │   ├── scene-1-poster.jpg
    │   ├── scene-2-poster.jpg
    │   ├── scene-3-poster.jpg
    │   └── og-image.jpg
    └── favicon.svg                    ← "FA" monogram
```
All paths relative (`assets/...`). No build step.

### 23.2 CDN dependencies (pinned versions, `defer`, end of body)
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js" defer></script>
<script src="script.js" defer></script>
```
Fonts: one Google Fonts `<link>` with `display=swap` + `preconnect`.

### 23.3 Video encoding for scrubbing
Seedance outputs must be re-encoded so every frame is seekable:
```bash
ffmpeg -i scene-1-raw.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 22 -g 1 -keyint_min 1 -pix_fmt yuv420p -movflags +faststart -an assets/video/scene-1-analytics.mp4
```
- Target ≤ 8 MB per clip. If larger, add a 1280px version (`*-720.mp4`) and pick via `matchMedia`.
- Posters: `ffmpeg -i assets/video/scene-1-analytics.mp4 -frames:v 1 -q:v 3 assets/img/scene-1-poster.jpg`
- Video tags: `muted playsinline preload="auto"` (pillars) / `autoplay loop` (hero), with `poster`.

**Until the clips exist:** each video slot renders a styled fallback — the poster gradient + an animated canvas data-scene (nodes/lines/bars per pillar theme) — so the site is fully presentable without video. Dropping correctly named MP4s into `/assets/video` activates them automatically (JS checks `video.readyState` / `error` event).

### 23.4 script.js architecture
```
init()
 ├─ preloader()           counter + font/poster readiness, then intro timeline
 ├─ initLenis()           Lenis + gsap.ticker + ScrollTrigger sync
 ├─ splitText(el)         lines/words/chars splitter (aria-label keeps original text)
 ├─ heroIntro()
 ├─ heroCanvas()          network particles, pauses offscreen
 ├─ stats()               counters + velocity marquee
 ├─ mission()             light-up words
 ├─ pillars()             pin + video scrub + letterbox + overlays (desktop) / IO autoplay (mobile)
 ├─ story()               portrait reveal + timeline draw
 ├─ process()             stacking cards
 ├─ work()                horizontal pin scroll
 ├─ finalCTA()            glow follow + kinetic headline
 ├─ cursor() / magnetic() desktop only
 └─ nav()                 hide/show, progress bar, anchor scroll
```
Use `gsap.matchMedia()` to separate desktop / mobile / reduced-motion setups. Call `ScrollTrigger.refresh()` after fonts (`document.fonts.ready`) and video metadata load.

### 23.5 Performance
- Lighthouse targets: Performance ≥ 90 desktop, ≥ 80 mobile; CLS < 0.05.
- Only `transform` / `opacity` / `clip-path` animated; `will-change` set only during animation.
- Canvas loops pause via IntersectionObserver when offscreen and on `visibilitychange`.
- Images: `loading="lazy"`, `decoding="async"`, explicit `width`/`height`.
- Hero video `preload="metadata"` on mobile; pillar videos lazy-attach `src` when within 1 viewport.
- Single grain overlay (SVG data URI), no PNG noise files.

### 23.6 SEO & accessibility
- `<title>Faraz Ahmad — Procurement & Spend Analytics</title>`
- Meta description: "Faraz Ahmad helps procurement, finance and legal teams make smarter sourcing decisions, control supplier and contract risk, and improve P2P efficiency with Power BI and data analytics."
- Open Graph + Twitter card using `assets/img/og-image.jpg`.
- JSON-LD `Person` schema (name, jobTitle "Procurement & Spend Analytics Professional", sameAs LinkedIn).
- Semantic landmarks (`header`, `main`, `section[aria-labelledby]`, `footer`); videos `aria-hidden` (decorative) with text equivalents in copy; split text keeps `aria-label` on parent.
- Skip-to-content link.

### 23.7 Build checklist
1. Scaffold files and folder structure.
2. Copy & optimise portrait → `assets/img/faraz-portrait.jpg`.
3. Build HTML with all sections and final copy from this plan.
4. Write CSS tokens, typography, layout, components, responsive rules.
5. Write `script.js` modules in the order above.
6. Implement video-fallback canvases so the site works before clips are generated.
7. Test at 1440, 1024, 768, 375 widths; test reduced-motion; check console is clean.
8. Generate the 3 Higgsfield Seedance 2.0 clips (with user approval — consumes credits), re-encode, drop into `/assets/video`, verify scrubbing.

---

*End of Master Build Plan.*
