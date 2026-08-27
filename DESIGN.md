# Akaden — Design System

Source of truth for the landing page and every later page, including the Setup tab.
Derived from the supplied product reference and the ABCloudz brand.

**Decision log**
- Light throughout (spec §11.1, Path A). Confirmed by Bob, 25 Aug 2026.
- Product name is **Akaden**. Legacy naming is retained only in the archived reference files.
- Domain: `localhost` for now; canonical URL is a single constant in `src/data/site.ts`.
- Nav bar present from v1. Only **Product** is live; other tabs render as disabled.

---

## 1. The one idea the system encodes

The deck already draws a distinction and never names it: **systems and people are blue,
agents are amber.** Every robot in the deck is `#FFBF2E`. Every database, engineer, and
tenant is blue. The spotlight the engineer shines onto the agents is pale amber.

That is the design system. It is not decoration — it is the product thesis rendered as color:

| Colour | Means | Where it appears |
|---|---|---|
| Blue | A person or a system | Stages 01, 03, 05. Nav, headings, body, install CTA. |
| Amber | An agent is acting | Stages 02 and 04. Iterate loops. Nothing else. |

**Amber is never used for emphasis, decoration, or hover.** If something is amber, an agent
is doing it. This rule is what makes stage 03 legible without a caption: in a run of amber
agent stages, Review Specification is the one solid blue block. The human moment is the
one that is not an agent.

---

## 2. Palette

Sampled from the deck, not invented. Every ratio below is computed, not estimated.

| Token | Hex | Role |
|---|---|---|
| `--ground` | `#FFFFFF` | Page ground |
| `--paper` | `#F4F7FC` | Alternating section ground. Cool, biased toward the accent. |
| `--blue` | `#2153C4` | Primary. Headings, CTA fill, stage 03. The ABCloudz royal blue. |
| `--blue-deep` | `#002163` | Navy. Footer ground, display headings, high-contrast type. |
| `--blue-bright` | `#146AD8` | Links, hover. |
| `--tint` | `#D5E9FF` | Pale blue fills and mats. Decorative only. |
| `--agent` | `#FFBF2E` | Agents only. See §1. |
| `--agent-tint` | `#F7DF97` | Agent backgrounds, the iterate loop. |
| `--ink` | `#0E1A33` | Body text and the focus ring. Near-black biased navy, never `#000`. |
| `--ink-soft` | `#4A5A78` | Secondary text, captions. |
| `--rule` | `#DCE5F2` | Decorative hairlines between sections. Carries no meaning. |
| `--rule-strong` | `#7188A8` | Real boundaries: screenshot bezels, control borders, chips. |

Reserved, not in the system: the poster's magenta. The Akaden poster is a dark-ground
artwork with a magenta accent; the website is light and runs on blue + amber. Magenta
stays with the poster unless a later brief brings it in deliberately.

### Contrast — measured (WCAG 2.1 AA, spec §8)

| Pair | Ratio | Verdict |
|---|---|---|
| `--ink` on `--ground` | 17.29 | AA body |
| `--ink` on `--paper` | 16.11 | AA body |
| `--ink-soft` on `--ground` | 6.94 | AA body |
| `--blue` on `--ground` | 6.78 | AA body |
| `--ground` on `--blue` (CTA text) | 6.78 | AA body |
| `--blue-bright` on `--ground` | 5.14 | AA body |
| `--blue-bright` on `--paper` | 4.79 | AA body |
| `--blue-deep` on `--ground` | 15.02 | AA body |
| `--ink` on `--agent` | 10.50 | AA body |
| `--rule-strong` on `--ground` | 3.63 | AA non-text (1.4.11) |
| `--rule-strong` on `--paper` | 3.38 | AA non-text (1.4.11) |

**Three rules this table produced, and they are binding.**

1. **Amber is a fill, never a text colour.** `--agent` on white is 1.65:1 — it fails badly.
   Amber always carries `--ink` on top. There is no `text-agent` utility in the stylesheet.
2. **`--blue-bright` is `#146AD8`, not the deck's `#1675EA`.** The deck value measures 4.41:1
   on white, which misses AA body text by a hair — invisible in a deck, a real failure in a
   link. Darkened until it passes on both grounds.
3. **Focus rings are `--ink` with a 2px offset.** A blue ring on the blue CTA fill is 1.16:1
   and effectively invisible. The offset puts the ring on the page ground instead of the
   button, where `--ink` measures 17.29:1 and works on every surface on the site.

`--rule` and `--tint` measure about 1.25:1 on white. That is fine — they divide, they do not
bound. Anything that defines the edge of a control or a capture uses `--rule-strong`.

## 3. Type

Two families. Neither is Inter (spec §5).

| Role | Face | Weights | Notes |
|---|---|---|---|
| Wordmark | Figtree | 900 italic | AKADEN only. Echoes the poster's heavy oblique lockup. |
| Display / body | Figtree | 400, 500, 700, 800 | Geometric-humanist. Closest Google Fonts match to the deck's face. |
| Data / spec | JetBrains Mono | 400, 500, 700 | Stage numbers, spec excerpts, install command, eyebrow labels. |

Mono is load-bearing, not ornamental: the product is about specifications, so specification
text is set in the voice a spec is actually written in.

**Scale** (1.25 major third, 16px base)

```
display   clamp(2.75rem, 6vw, 4.5rem)   800   -0.03em   1.02
h2        clamp(1.9rem, 3.6vw, 2.75rem) 800   -0.022em  1.1
h3        1.375rem                      700   -0.012em  1.25
lead      clamp(1.06rem, 1.6vw, 1.25rem) 400  -0.005em  1.5
body      1.0625rem                     400   0         1.65
small     0.9375rem                     400   0         1.55
label     0.6875rem  mono               500   0.12em    uppercase
```

Running text caps at 66ch. Headings get `text-wrap: balance`.

---

## 4. Spacing

4px base. Use only: `4 8 12 16 24 32 48 64 96 128 160`.
Section rhythm: 96px mobile, 128px tablet, 160px desktop.
Grid: 1200px max content, 24px gutters, 16px below 480px.

---

## 5. Screenshot treatment

The product UI theme is still unconfirmed (spec §11.2), so the rule is written to hold
either way and the bezel does the work.

- One aspect ratio across all five stages: **16:10**. Captures crop to it; they never letterbox.
- Every capture sits in a **bezel**: 1px `--rule` border, 8px radius, `--tint` inner mat at
  12px, and a single soft shadow `0 1px 2px rgba(0,33,99,.06), 0 8px 24px rgba(0,33,99,.08)`.
  A dark product UI reads as a contained surface; a light one keeps a defined edge.
- Flat and upright. No tilt, no perspective, no floating panels (spec §5).
- Mobile serves a separate **4:3 crop** of the same source capture, chosen per stage for the
  region that carries the meaning. Declared in `src/data/walkthrough.ts`, not derived automatically.
- Formats: AVIF, WebP fallback, explicit `width`/`height`, `loading="lazy"` everywhere except
  stage 01 which is `eager` + preloaded as the likely LCP element.
- Until real captures arrive, each slot renders a **placeholder frame** at the correct ratio,
  visibly labelled, so nothing ships by accident.

---

## 6. Motion

- Transitions: 160ms ease-out on hover and focus. Stage advance: 220ms cross-fade plus a
  6px rise. Nothing else moves.
- No parallax, no scroll-jacking, no carousels, no counters (spec §5).
- `prefers-reduced-motion: reduce` removes all transitions and transforms. No content is
  reachable only through motion.

---

## 7. Components

**Nav** — sticky, 64px, white with a `--rule` bottom hairline. Wordmark left, tabs centre-left,
install right. Inactive tabs are `--ink-soft` with `aria-disabled` and a "Soon" mono chip.

**Buttons** — Primary: `--blue` fill, white text, 6px radius, 12/24 padding. Secondary: 1px
`--rule` border on white. Focus: 2px `--blue-bright` ring, 2px offset. Never amber.

**Walkthrough rail** — five markers `01`–`05` in mono. Agent stages (02, 04) carry an amber
dot; human/system stages (01, 03, 05) carry a blue one; the active stage fills. Stage 03 is the
only marker that is ever a **solid** blue block.

**Radius** — 6px on controls, 8px on screenshot bezels, 12px on section panels. Not applied
uniformly to every surface (spec §5).

---

## 8. Anti-slop review

Checked against spec §5 before accepting this system.

| Guardrail | Status |
|---|---|
| No purple or violet gradients | Pass — no gradients at all |
| Inter not used | Pass — Figtree + JetBrains Mono |
| No uniform rounded corners | Pass — three deliberate radii by element class |
| Not excessively centred | Pass — hero and every section are left-aligned to the grid |
| Not cream + serif + terracotta | Pass — white + royal blue + amber |
| Not near-black + acid accent | Pass — light throughout |
| Not broadsheet hairline columns | Pass — single measured column, generous rhythm |
| Numbered markers only where order is real | Pass — `01`–`05` on the walkthrough only |

**What changed after review.** The first pass used amber as a general accent — CTA hovers,
section eyebrows, the underline on the hero. That is the default move and it destroyed the
one thing the deck's colour language was already doing. Amber was pulled back to agents only,
and the boldness was moved to where the spec says it belongs: the approve gate at stage 03.

## 9. Story order

The product UI is the first visual, never a decorative placeholder. The page teaches in this
order: explain the handoff, show one complete workspace run, unpack the ownership of each stage,
then explain guardrails, maintenance, proof, and the broader system. The real workspace is the
evidence; prose after it gives a cold visitor the language to explain what they just saw.

No empty screenshot frame ships in the primary flow. Until a capture is available, the relevant
stage uses a compact evidence panel rather than pretending to show product UI. This preserves the
honesty rule and keeps the review gate as the one deliberately bold moment.
