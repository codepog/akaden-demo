# Akaden — website

Astro + Tailwind v4, TypeScript, static output. Light theme throughout.
Design system: `DESIGN.md` — read it before changing colour, type, or the screenshot treatment.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321  — hot reload
npm run build      # static output to ./dist  (runs astro check first)
npm run preview    # serve the production build
```

## Where things live

| Path | What |
|---|---|
| `DESIGN.md` | The design system. Source of truth for this page and every later tab. |
| `src/data/site.ts` | Every word on the page except the walkthrough. Edit copy here, not in markup. |
| `src/data/walkthrough.ts` | The five stages. **Single source** — the interactive walkthrough and its text equivalent both render from it, so they cannot drift. |
| `src/components/Walkthrough.astro` | The centrepiece. Server-rendered, then progressively enhanced. |
| `src/styles/global.css` | Design tokens as Tailwind v4 `@theme` variables. |
| `src/assets/walkthrough/` | Screenshots go here. Empty until ABCloudz supplies captures. |

## How the walkthrough is built

All five stages are emitted as semantic HTML at build time. With JavaScript off they render
as a plain ordered list, which is the text equivalent WCAG requires — no duplicate DOM to
fall out of sync. With JavaScript on, the same nodes become the stepped walkthrough.

The approve gate locks stages 04 and 05 until **Approve specification** is pressed. The
"Show every stage as text" control also unlocks them, so a visitor who does not want to
interact still reaches the change-request beat instead of hitting a wall.

Colour carries meaning and is not decorative: **blue is a person or a system, amber is an
agent.** Stage 03 is the only marker that ever fills solid blue — in a run of amber agent
stages, the human moment is the one that is not an agent. Do not use amber for emphasis.

## Before this ships

Search the repo for `NEEDS-SOURCE`. Each one is a claim or an asset that is not confirmed.
Anything still marked at content review does not ship.

- **Install target** — the download and the exact steps. The CTA is a swappable slot.
- **Guardrail enforcement** — read-only credential? Human review of the generated pipeline,
  or only the spec? What "Validate" checks. Currently the strongest section on the page has
  the weakest backing.
- **Time saved** — with its denominator and method. No percentage ships without one.
- **Dinski quote** — permission scoped to this page and this product. The quote names
  Modernization Studio, so it is framed as partnership evidence, not a product endorsement.
- **Captures** — 5 stages + change request, uncropped, native retina or 2×, 16:10. Plus the
  mobile crop region per stage, which is declared in `walkthrough.ts`, not derived.
- **Open Graph image** — `public/og-image.png`. Most visitors see this before the page.

## Verified

- No horizontal overflow at 320px, in every walkthrough state.
- No heading-level skips. No image without alt text.
- Approve gate confirmed: stages 04 and 05 are disabled before approval, enabled after.
- Every palette pair measured against WCAG 2.1 AA — table in `DESIGN.md` §2.

---

## The mock IDE demo (`/demo`)

A separate page — `src/pages/demo.astro` — holding a hard-coded reconstruction of the
Akaden workspace. This is the website, not the app: every agent response is pre-written.
The requirement, specification, 39-segment pipeline, and validation warnings are the real
files from a production run; the chrome around them is a simplified rebuild.

### Adding functionality, one button at a time

`src/data/ide.ts` is the whole state machine. One object per SDLC step:

```ts
{
  n: 3, id: 'review-spec', title: 'Review specification', actor: 'you',
  files: ['requirement', 'spec'],   // what exists in the explorer by now
  open: 'spec',                     // what the editor shows
  view: 'markdown',                 // empty | markdown | pipeline | params | run
  agent: 'Specification QA Agent',  // what the composer picker shows
  toolbar: [{ label: 'Approve specification', kind: 'primary', action: 'approve' }],
  chat: [ /* pre-written turns */ ],
}
```

- **New button** → add to that step's `toolbar`. It renders and advances the step.
- **New agent message** → add to `chat`. Blocks are `p`, `h`, `ul`, `ol`, `code`.
- **New file** → add to `FILES`, then list its key in each step's `files`.
- **New editor view** → add a `<div class="view" data-view="yourname">` in `Editor.astro`
  and set `view: 'yourname'` on the step.

Chrome colours were sampled from the real IDE and live as `--ide-*` tokens at the top of
`MockIDE.astro` — panel `#F5F6F8`, editor `#FAFCFF`, accent `#3376CD`, active row `#DDE6F3`.

### The guided flow

**Next and Back are the spine.** Next performs the step and moves on; its label always names
what it does, never "Next". Back reverses. Arrow keys work. The nine dots above the bar jump
anywhere, and any SDLC row in the panel does too.

**One place to look at a time.** The pane holding the action stays bright; the other two dim
to 38% and desaturate. In the step list every row but the current one recedes, and completed
steps turn green with a check. One control per step gets a pulsing ring — the file that
landed, the agent picker, the Approve button, the cutoff field, the run log — so the tour
teaches where things live in the real product rather than just narrating.

**One moment where you actually decide.** Step 3 is the gate, and its Next button reads
"Approve specification". Same single press as every other step, so there is no extra friction,
but the label makes the approval conscious — which is the product thesis and the one thing a
pure auto-advance would throw away.

**Every value is pre-filled** — bucket, key path, cutoff, mode, batch id. Nothing on screen
should make anyone think they are missing something.

On narrow screens the bar sticks to the bottom, the buttons go full width, and the tour
switches panes for you: focus on the assistant brings the Assistant tab forward, focus on the
editor brings it back.

### Adding a step

```ts
instruct:  'What just happened, in plain language.',
focus:     'ed',                        // side | ed | chat — everything else dims
ring:      '[data-param="dateOfBirthCutoff"]',  // any selector inside the IDE
nextLabel: 'Run the job',               // names the action, never "Next"
```

The ringed element pulses, suppressed under `prefers-reduced-motion`.

### What already works


Next / Back / arrow keys / dots / SDLC rows all navigate · dimming that leaves one pane bright
· a ring on one control per step · pre-filled parameters · completion checks in the step list · files appear as the run progresses · click any file to
open it · markdown renders at full fidelity · the pipeline renders as a 39-segment run list ·
the agent picker lists all six agents · the date-of-birth cutoff typed at step 8 flows into
the run log at step 9 · a closing state with Start over · panes collapse to Steps / Editor /
Assistant tabs under 1180px, and the whole thing works at 390px with no horizontal scroll.

### Not built yet

Editable spec clause propagating into the pipeline · the change-request beat · expandable
pipeline segments · real dropdown contents for Auto / Skills / Tools · file downloads.
Steps 6 and 7 (Deploy, Publish) are thin — they have no distinct visual yet, so both ring the
pipeline. A deployment status strip would give them something of their own.

## Supplied workspace demo (`/akaden-workspace-demo.html`)

The supplied standalone interactive demo is adapted for the current **Akaden** name and copied to
`public/akaden-workspace-demo.html`; the untouched original is retained at
`docs/reference/demo-original.html`. The adapted version appears directly below the landing-page
hero as a full inline interactive experience. The enclosing frame reads the demo document's height
and expands to show it in full, so visitors use the complete workspace without leaving the page.

`docs/reference/dataconnect-sdlc-website-spec.md` is also retained unchanged as the supplied
legacy reference. It informs the design, but its legacy terminology is not shown in the live site.

## Share a preview with GitHub Pages

The repository includes `.github/workflows/deploy.yml`. Once it is pushed to the `main` branch:

1. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. The workflow publishes each push to `main` at `https://codepog.github.io/akaden-demo/`.

The Astro configuration automatically uses the repository path in GitHub Actions while keeping
local development at `http://localhost:4321/`.
