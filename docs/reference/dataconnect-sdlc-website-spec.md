# DataConnect SDLC — Website Specification

**Owner:** ABCloudz
**Status:** Draft for review — not yet approved for build
**Target launch:** On or before EDUCAUSE Demo Day, September 14, 2026

---

## 1. Business context

ABCloudz builds and migrates data integrations for higher education institutions running Ellucian Banner SaaS. Historically this work is done by hand in the Ellucian Integration Designer: an engineer reverse-engineers how Banner is structured, hand-configures each field mapping, and then discovers mistakes by reading error logs. A single pipeline takes weeks. A SaaS migration can involve 50–200 of them.

DataConnect SDLC is a multi-agent system that inverts this. An engineer describes a requirement, a Specification Builder Agent drafts a written specification, **a human reviews and approves it**, and a Pipeline Builder Agent generates and deploys the pipeline from the approved spec. When the requirement later changes, the engineer edits the specification and regenerates — rather than hand-patching the pipeline.

The product is currently in production use by ABCloudz's own delivery team (15 engineers, plus 2 US-based solutions architects). The eventual audience is institutions running their own integrations.

**Core thesis — the sentence the whole site exists to land:**

> You stop maintaining pipelines. You start maintaining specifications.

Supporting line: *The pipeline is the output. The spec is the asset.*

### Positioning

"Spec-driven development" became a named, crowded category during 2025–2026 (GitHub Spec Kit, AWS Kiro, Tessl, OpenSpec, BMAD, Cursor Plan Mode). The generic claim no longer differentiates.

**Our differentiation:** everyone else does spec-driven development for general software. We do it for Ellucian data pipelines, with agent skills that already understand Banner, Ethos, and Data Connect. The site must make this explicit — domain specificity is the wedge, not the methodology.

### Relationship assets

- ABCloudz is an **Ellucian Partner Network** member (badge available on abcloudz.com).
- **Jeff Dinski, Chief Strategy and Corporate Development Officer at Ellucian**, has a public testimonial on abcloudz.com referencing ABCloudz tooling and Ellucian SaaS outcomes.
- ABCloudz has a published case study on a large US community college system modernizing to cloud-native analytics using Ellucian Data Connect.

---

## 2. Goals and non-goals

### Goals

1. Explain what DataConnect SDLC is to a visitor who has never heard of spec-driven development.
2. Make the spec-review gate visible and central — the human approves before anything is built.
3. Show the product working, using real UI.
4. Drive the visitor to **install the tool**.
5. Establish credibility with institutional buyers (Ellucian partnership, production usage, security posture).

### Non-goals for v1

- Not a documentation site. Setup and usage instructions come in a later phase as a separate tab.
- Not a live sandbox. Visitors do not run real generations against real systems.
- Not a lead-capture funnel. No gated content, no "book a demo" as the primary CTA.
- Not a general ABCloudz services page. This is a product page.

---

## 3. Audience

**Primary:** Higher-education enterprise IT — integration engineers, ERP/application directors, data platform leads, and CIOs at institutions running Ellucian Banner. Many will arrive directly from a link dropped in the EDUCAUSE Demo Day webinar chat, on a laptop or phone, within minutes of a 10-minute talk.

**Secondary:** Ellucian partners and internal ABCloudz delivery teams.

**Critical audience assumption:** the visitor is cold. They are technically sophisticated but have no prior exposure to spec-driven development, and they are institutionally cautious about AI touching student data. The page must teach before it sells, and must address data safety without being asked.

---

## 4. Success criteria

The site is complete when:

- A visitor with no prior context can state what the product does after 30 seconds on the page.
- The spec-review gate is encountered, not just described — the visitor takes an action to approve.
- Real product UI appears in at least five distinct places.
- The install path is reachable from the hero and from the page footer.
- The page passes WCAG 2.1 AA (see §8).
- The page is fully usable on a phone in portrait.
- Nothing on the page resembles real student data.

---

## 5. Design direction

### The core tension

`abcloudz.com` is a **services company site**: deep mega-navigation, service taxonomy, logo wall, testimonial carousel, animated stat counters, and every path ending at "Contact us." DataConnect SDLC is a **product site** ending at "Install."

**Resolution:** inherit the ABCloudz *brand* (blue/white palette, logo lockup, partner badges, stat-counter treatment) but adopt *page architecture* from developer-tool sites. The site should read as a family member of abcloudz.com, not a clone of it.

### References and what to take from each

| Reference | What to take |
|---|---|
| warp.dev | Visual sharpness; product UI treated as the primary visual |
| kiro.dev | Explanatory depth; how to teach the spec → build → validate loop |
| linear.app | Typographic restraint, pacing, one idea per section |
| raycast.com | Section simplicity; uncluttered landing structure |
| retool.com | The interactive moment on the page |
| planetscale.com | A single comprehensive diagram as the closing section |

The underlying tradition across these is **Swiss/International typographic style**: grid discipline, strong hierarchy, purposeful whitespace, information first. Not the Apple aesthetic — that is built to sell objects people already understand, and is too text-sparse for a page whose job is teaching.

### Hard constraints

- **Flat and upright.** No 3D tilt, no perspective warp, no floating rotated panels. Product UI sits square to the viewer with honest crops and at most a soft shadow.
- **No scroll drama.** No parallax, no cinematic scroll-jacking, no rotating carousels of tilted bars.
- **Motion is minimal and functional.** Reserve it for the walkthrough advancing and for hover states. Respect `prefers-reduced-motion`.
- **Screenshot discipline.** All five walkthrough captures share one aspect ratio and one background treatment, so the walkthrough does not jump as it advances. Crop tight; no full desktop windows, no visible file trees, no OS chrome.

### Open decision — light or dark

Warp, Linear, and Raycast are dark. ABCloudz is white and royal blue. Two viable paths:

- **A — Light (recommended default).** Stays consistent with the parent brand and with the deck. Reference the light end of the set: Stripe, Resend, Hex, Clerk.
- **B — Dark product surface, light page.** Page stays white/blue; the walkthrough section sits on a dark surface so screenshots pop. Highest contrast between "explanation" and "product."

Path B is likely the strongest if the product UI is itself dark-themed. **This must be decided before the design system is written**, because it determines which reference tokens are usable.

### Deliverable: DESIGN.md

Before any code, produce a single `DESIGN.md` containing palette (4–6 named hex values), type scale and typeface roles, spacing scale, screenshot treatment rules, and motion rules. It is the source of truth for the landing page and every later page including the setup tab.

### Design tooling

Install before Phase 0 so `DESIGN.md` is produced with them rather than retrofitted.

**Required — Anthropic official (`github.com/anthropics/skills`)**

| Skill | Purpose | Install |
|---|---|---|
| `frontend-design` | The foundational one. Forces an explicit palette, type pairing, layout concept, and one signature element to be planned *before* any code is written. The most-installed design skill available (~797k installs as of August 2026). | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| `webapp-testing` | Automated verification for Phase 4 — responsive behavior, keyboard navigation, focus states. Directly supports the §8 accessibility requirements. | `npx skills add https://github.com/anthropics/skills --skill webapp-testing` |

Also worth reading: Anthropic's **Frontend Aesthetics Cookbook**, the source of the anti-slop guidance below.

**Recommended — community, for aesthetic direction**

| Repo | Use for |
|---|---|
| `claudekit/frontend-design-pro-demo` | 11 named aesthetics including **Swiss Minimalism** — the closest match to the direction in this spec |
| `VoltAgent/awesome-claude-design` | 68 ready-made `DESIGN.md` files by aesthetic. Take the Linear and Stripe families as starting points |
| `Owl-Listener/designer-skills` | The broadest design collection (63 skills, 27 commands) if deeper coverage is wanted later |
| `wilwaldon/Claude-Code-Frontend-Design-Toolkit` | Curated index of what actually improves frontend output, including token/theme generators |

**Explicitly excluded**

- `anthropics/skills → web-artifacts-builder` — for bundling single-file claude.ai artifacts, not for a standalone Astro site. Wrong tool here.
- `freshtechbro/claudedesignskills` and similar 3D/animation collections (Three.js, GSAP ScrollTrigger, Locomotive, Vanta, Spline) — these produce exactly the scroll drama and floating rotated panels prohibited in §5 Hard constraints.

⚠️ A repository named `anthropic-claude-design/claude-design`, claiming to offer a "Claude Design download," is not affiliated with Anthropic. Claude Design is a product at `claude.ai/design`; there is no download.

### Anti-slop guardrails

These skills exist because models converge toward generic, on-distribution output — the look commonly called "AI slop." The site must not read that way to a technical audience, so treat the following as design constraints alongside §5 Hard constraints.

**Never use:**

- Purple or violet gradients of any kind.
- Inter as the primary typeface — it is the single strongest tell.
- Uniform rounded corners applied indiscriminately across every surface.
- Excessive centered layouts. Centering everything is a default, not a decision.

**Avoid these three recognizable AI clusters:**

1. Warm cream background (~`#F4F1EA`) with high-contrast serif display and terracotta accent (~`#D97757`).
2. Near-black background with a single acid-green or vermilion accent.
3. Broadsheet layout — hairline rules, zero border-radius, dense newspaper columns.

**Structure must encode meaning.** Numbered markers (01 / 02 / 03) are only justified where order carries real information. On this site they *are* justified for the five walkthrough stages — that is a genuine sequence — and nowhere else.

**Spend boldness in one place.** The signature element of this site is the **approve gate at Review Specification** (§7.4). Everything around it stays quiet and disciplined. Any decoration that does not serve that moment gets cut.

**Copy is design material.** Name things by what the user controls, not how the system is built. Active voice on every control; an action keeps the same name through the whole flow. Sentence case, plain verbs, no filler.

---

## 6. Site structure

Single scrolling page for v1. Tab navigation is stubbed but only "Product" is live.

### 6.1 Hero

- Product name and one-line description.
- A subheadline that does real explanatory work — the visitor is cold. Do not rely on the phrase "spec-driven" alone to carry meaning.
- The preset prompt chips that begin the walkthrough (see §7).
- Secondary link to Install.

### 6.2 Interactive walkthrough

The centerpiece. Full specification in §7.

### 6.3 Why the specification matters

The teaching section, at Kiro-level depth. Covers:

- Documentation that cannot go stale, because the documentation is what builds the pipeline.
- Integrations live in git — reviewed, versioned, diffable.
- The spec is a human-readable audit trail.
- Knowledge survives staff turnover.

### 6.4 Guardrails

Directly addresses the "is AI writing to our SIS?" objection before it is asked. Anchored in real specification language, e.g.:

> *The integration must not update Banner data.*
> *It must not rely on direct database access or direct Banner table reads.*

The point to land: constraints are written and approved by a human *before* generation, not promised by a vendor afterward.

### 6.5 Proof

- Built for ABCloudz's own delivery team first; 15 engineers in production.
- Ellucian Partner Network badge.
- Jeff Dinski testimonial.
- Community college case study link.

### 6.6 The whole picture

A single comprehensive static diagram in the PlanetScale mode, showing the full system: source systems (Banner/SIS, LMS, data warehouse, legacy, future systems), the agent layer, git, and the engineer supervising. The existing "Manual SDLC → Agentic SDLC" deck artwork is the starting point.

Bookend logic: the hero shows *one* flow interactively; this section shows the *whole* system statically.

### 6.7 Install

Primary CTA. Exact content pending — ABCloudz to supply install instructions.

### 6.8 Footer

ABCloudz logo and link, partner badges, contact, EDUCAUSE Denver mention if still timely.

---

## 7. Interactive walkthrough specification

### 7.1 Intent

Let the visitor watch a requirement become a deployed pipeline, using real product UI, in five stages — and make them participate at the one stage that matters.

### 7.2 Honesty requirement

**v1 must not present a free-text input that returns a canned result.** Technical visitors detect this within seconds, and once they do they distrust the entire page.

v1 uses **preset prompt chips**. Three options, each playing a real pre-captured walkthrough:

1. "Export alumni contacts to S3"
2. "Sync course enrollments to the LMS"
3. "Nightly financial aid feed"

Three chips also demonstrate three use cases, which quietly establishes that the product is not only for migrations.

A genuinely wired free-text input is a **later phase**, not v1.

### 7.3 Stages

| # | Stage | Shows |
|---|---|---|
| 1 | Prepare Workspace | IDE with business and technical context loaded |
| 2 | Specification Builder Agent | The agent conversation drafting the spec |
| 3 | **Review Specification** | The specification document, legible |
| 4 | Pipeline Builder Agent | Generation in progress; artifacts appearing |
| 5 | Deploy and Validate | The pipeline live in the Ellucian tenant |

### 7.4 The approve gate — required

Stages 1, 2, 4, and 5 are things the system does. **Stage 3 is the thing the human does, and it is the entire thesis of the product.**

The walkthrough **must stop at stage 3** and require the visitor to press **Approve** before continuing. If it auto-plays through, the page becomes an animation of an AI doing magic — precisely the impression the product exists to avoid.

At stage 3, show a legible excerpt of the specification. Recommended excerpt, because it is a decision the audience recognizes as institutional rather than technical:

```
Pick the name in this order:

1. Preferred name.
2. Legal/official name.
3. Any available name as fallback.
```

### 7.5 Iterate affordances

The deck's two `Iterate` loops become real controls:

- **At stage 2:** a "Regenerate" option returning to the drafting state.
- **After stage 5:** the change-request beat — *"Six months later, Advancement needs a country column."* Edit the spec, regenerate, redeploy, acceptance criteria pass.

The change-request beat is the highest-value element on the page. It demonstrates maintenance, which no competitor page demonstrates, and it reaches visitors already on Ellucian SaaS with no migration ahead of them.

### 7.6 Mobile behavior

A five-stage horizontal walkthrough with screenshots does not survive a phone. Significant traffic will arrive on mobile from the webinar chat link.

**Required:** on narrow viewports the walkthrough stacks vertically, one stage per card, advancing on tap. The approve gate is preserved. Screenshots are cropped to a mobile-legible region rather than scaled down whole.

---

## 8. Technical requirements

### Stack

- **Astro + Tailwind CSS.** Astro ships zero JS by default, supports islands for the one interactive component, has content collections ready for the future setup/docs tab, and builds to static files deployable anywhere.
- No backend, no database, no API for v1. Preset walkthroughs are static assets.
- TypeScript.

### Accessibility — hard requirement

**Target: WCAG 2.1 AA, Section 508 conformant.**

This is not optional polish. Higher-education institutions run accessibility review as part of procurement and frequently request a VPAT. An inaccessible vendor site presented to an EDUCAUSE audience is a material credibility problem in this specific community.

Requirements:
- All walkthrough controls keyboard-operable with visible focus states.
- The walkthrough must not be the only route to the information — provide a text equivalent of each stage.
- Meaningful alt text on every screenshot; decorative images marked as such.
- Colour contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI boundaries.
- `prefers-reduced-motion` respected; no motion required to reach any content.
- Semantic headings in order; no skipped levels.

### Data safety

**No real or realistic student data anywhere on the site, including inside screenshots.** Any `output.csv` or record view must use obviously synthetic names and clearly fake phone numbers and addresses. Redact or replace any tenant identifiers, institution names, and internal URLs in captures.

### Performance and other

- Static build, CDN-served. Lighthouse performance ≥ 90 on mobile.
- Screenshots served as optimized WebP/AVIF with appropriate `srcset`.
- Responsive from 320px up.
- Privacy-respecting analytics only; no third-party ad trackers.
- Open Graph and Twitter card metadata — the URL will be pasted into webinar chat and Slack.

---

## 9. Assets required from ABCloudz

Build cannot start without these.

**Screenshots** — one per walkthrough stage, plus the change-request state. Consistent aspect ratio and background:
1. Prepare Workspace (IDE with context loaded)
2. Specification Builder Agent (conversation)
3. Review Specification (the document, legible)
4. Pipeline Builder Agent (generation in progress)
5. Deploy and Validate (pipeline in Ellucian tenant)
6. Change request (spec edit → regenerated pipeline)

**Copy and content**
- Install instructions, exact.
- Confirmed production numbers (engineer count, time saved, and the precise denominator for any percentage claim).
- Approved wording for the Ellucian relationship.
- Jeff Dinski testimonial text and permission to reuse.

**Brand**
- ABCloudz logo files (SVG).
- DataConnect SDLC product icon (SVG).
- Ellucian Partner Network badge.
- Brand typeface files or licensed webfont names.

---

## 10. Build phases

**Phase 0 — Decisions and assets.** Install the §5 design tooling. Resolve §11 open decisions. Collect §9 assets. Write `DESIGN.md`, then review it against the anti-slop guardrails before accepting it — if any part of it reads like the default output for any similar page rather than a choice made for this brief, revise it and note what changed.

**Phase 1 — Local scaffold.** Astro + Tailwind project, `DESIGN.md` tokens wired into the Tailwind theme, page shell, nav, footer, deploy pipeline stubbed.

**Phase 2 — Static sections.** Build §6.1, 6.3, 6.4, 6.5, 6.6, 6.7 with real copy. Walkthrough is a static placeholder at this stage.

**Phase 3 — Interactive walkthrough.** Build §7 as an Astro island. Preset chips, five stages, approve gate, iterate affordances, change-request beat.

**Phase 4 — Responsive and accessibility.** Mobile stack behavior, keyboard navigation, focus states, contrast audit, reduced-motion, alt text, Lighthouse pass. Use `webapp-testing` to verify rather than eyeballing.

**Phase 5 — Review and deploy.** Content review, data-safety audit of every screenshot, then cloud deploy.

---

## 11. Open decisions

Answer before Phase 1:

1. **Light or dark** (§5). Determines the whole design system.
2. **Is the product UI light-themed or dark-themed?** Determines whether option B is available.
3. **Domain.** Subdomain of abcloudz.com (e.g. `dataconnect.abcloudz.com`) or standalone? Subdomain inherits SEO and trust; standalone reads more like a product.
4. **Install shape.** Copyable command, download, or link into docs? Shapes the hero and footer CTAs.
5. **Navigation now or later?** Stub the tab bar in v1, or add it when the setup tab ships?
6. **Free-text input.** Confirm v1 is presets-only.

---

## 12. Local development

```bash
# One-time
npm create astro@latest dataconnect-sdlc -- --template minimal --typescript
cd dataconnect-sdlc
npx astro add tailwind

# Daily
npm run dev        # http://localhost:4321 with hot reload
npm run build      # static output to ./dist
npm run preview    # serve the production build locally
```

Screenshots live in `src/assets/walkthrough/`. Copy lives in content files, not hardcoded in components, so it can be edited without touching markup.

Initialize git at Phase 1 and commit per phase.

---

## 13. Deployment

Static output deploys to any host. Given ABCloudz's AWS Advanced Tier partnership, the natural fit is **S3 + CloudFront** (or AWS Amplify Hosting for a simpler managed path with built-in CI from git).

Requirements:
- HTTPS with a valid certificate.
- Preview/staging environment separate from production.
- Deploy on push to `main` once the site is stable.
- The deploy step happens only after the Phase 5 content and data-safety review.

---

## 14. Future scope

Not in v1; the architecture should not preclude them.

- **Setup tab** — installation, configuration, and usage documentation, sharing `DESIGN.md`.
- **Live sandbox** — a genuinely wired, rate-limited free-text input.
- **Spec library** — published example specifications by integration type, reinforcing the compounding-asset argument.
- **Case studies** — named institutional outcomes as they become publishable.

---

## 15. Acceptance criteria

The site is ready to launch when:

- All §4 success criteria are met.
- The walkthrough stops at Review Specification and requires an explicit approval action.
- The change-request beat is present and functional.
- Every screenshot has been audited for real data, tenant identifiers, and institution names.
- WCAG 2.1 AA is verified by automated scan and manual keyboard pass.
- The page is usable on a 320px viewport.
- Every claim on the page has a confirmed source and, for percentages, a stated denominator.
- The install path works end to end from a clean machine.
