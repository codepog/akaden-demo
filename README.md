# Akaden product site

Static Astro site for Akaden, the AI-assisted IDE for Ellucian pipeline development.

The public page is designed as the foundation of the permanent product site. Its content is intentionally conservative: it describes the product direction and internal use without claiming external adoption, unverified performance multipliers, or security guarantees that have not been documented.

## Run locally

```bash
pnpm install
pnpm dev
pnpm build
```

GitHub Actions builds and deploys `main` to [codepog.github.io/akaden-demo](https://codepog.github.io/akaden-demo/).

## Key files

| Path | Purpose |
|---|---|
| `src/pages/experiment.astro` | Permanent landing-page structure, presentation, and demo dialog |
| `src/data/site.ts` | Public product copy and lifecycle content |
| `src/components/Nav.astro` | Global product navigation |
| `src/components/Footer.astro` | Footer and verified links |
| `src/pages/overview-demo-embed.astro` | Embedded interactive walkthrough |
| `src/components/AkadenLogoDemo.astro` | Interactive walkthrough implementation |
| `src/styles/global.css` | Shared tokens, typography, and accessibility defaults |

`src/pages/index.astro` renders `experiment.astro`, so the redesigned product page is the site root.

## Current product story

The page explains Akaden in this order:

1. AI-assisted IDE for Ellucian pipeline development.
2. Existing knowledge becomes a reviewable specification.
3. The team approves the plan before generation.
4. Akaden generates the pipeline and test cases.
5. Developers revise through AI or edit manually.
6. People approve deployment and monitor what shipped.
7. Internal ABCloudz use is the current evidence base.

Blue denotes a team decision or system step. Amber denotes AI-assisted work. The restrained cards, product-led hero, large editorial typography, and color-block section rhythm are influenced by enterprise product sites such as Microsoft Dynamics 365 without copying Microsoft brand assets.

## Intentional launch decisions

- The unrelated YouTube playlist has been removed.
- The broken `#demo` and `#accessibility` links have been removed.
- Unsupported `5–50x` and `15 engineers` claims are not shown.
- The general Ellucian/ABCloudz quotation is not presented as Akaden product proof.
- Contact CTAs are omitted until an Akaden-specific owner and destination exist. No blank link ships.
- The current interactive demo remains available as the working conversion path.
- The hero preview is ready to be replaced by the final recorded product walkthrough.

## Before external commercial launch

Confirm and document:

- Exact Ellucian products and prerequisites supported.
- Hosting and deployment architecture for web and desktop versions.
- What content is sent to Anthropic Claude Sonnet, plus retention and training boundaries.
- Protection of credentials, FERPA-regulated information, prompts, logs, and generated artifacts.
- Ownership language for specifications and generated code.
- Support, monitoring, audit, rollback, and implementation responsibilities.
- The final Akaden-specific inquiry destination.
- At least one measured internal or customer outcome before publishing a performance claim.

When the recorded video is ready, replace the hero preview behavior with the approved video URL while keeping the interactive walkthrough as the secondary product experience.
