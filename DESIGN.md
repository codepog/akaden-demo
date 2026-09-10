# Akaden design system

The site should feel like a composed enterprise product surface, not a generic “AI startup” page. The visual reference is the Microsoft Dynamics 365 product site: large editorial type, strong color fields, product imagery as the primary visual, restrained cards, square calls to action, and consistent section rhythm.

Akaden does not copy Microsoft branding, artwork, component code, or exact layouts.

## Principles

1. **Product first.** Real Akaden UI is the dominant image. Decorative graphics provide depth but never replace product evidence.
2. **Specific language.** Lead with “AI-assisted IDE for Ellucian pipeline development,” not a broad cloud-modernization claim.
3. **Enterprise restraint.** Use a few large surfaces, generous space, and clear hierarchy. Avoid floating glass cards, glowing AI orbs, chat bubbles, and ornamental gradients around every element.
4. **Honest evidence.** Internal use is identified as internal. Unverified multipliers, customer adoption, endorsements, and security statements do not ship.
5. **People stay visible.** AI-assisted work and human decisions are visually distinct throughout the lifecycle.

## Color

| Token | Value | Use |
|---|---:|---|
| Ground | `#FFFFFF` | Primary surface |
| Paper | `#F4F6F9` | Alternating sections |
| Ink | `#111827` | Primary text |
| Soft ink | `#4B5568` | Supporting text |
| Navy | `#112A55` | Navigation, workflow, CTAs |
| Blue | `#1769E0` | Links, systems, human-controlled work |
| Pale blue | `#DCEEFF` | Supporting surfaces |
| Amber | `#FFBF2E` | AI-assisted lifecycle steps only |

The hero and final CTA may use one broad blue/purple color field. Small components remain flat and quiet.

## Type

- Figtree for display and body copy.
- JetBrains Mono for eyebrows, lifecycle numbers, and technical labels.
- Headings use medium-to-semibold weights, tight tracking, and short line lengths.
- Body copy stays below roughly 66 characters per line when possible.

## Components

- **Global navigation:** white, sticky, simple wordmark and product descriptor.
- **Announcement:** temporary event context above the global navigation.
- **Section navigation:** compact sticky anchor bar on larger pages.
- **Buttons:** square-cornered, high-contrast fills; every visible button must work.
- **Product frames:** one restrained border, modest radius, no perspective distortion.
- **Cards:** radius is limited to overview cards and product frames; evidence and workflow cards remain squared.
- **FAQ:** native disclosure elements with visible focus and 44px minimum targets.
- **Dialog:** native modal dialog, close button focused on open, Escape support, focus restoration, and iframe unloaded on close.

## Responsive behavior

- Two-column compositions become one column below 980px.
- The eight-stage lifecycle becomes a single vertical sequence on phones.
- Global page width must never exceed the viewport at 390px.
- Text and interaction targets must remain usable without hover.

## Content boundaries

Do not publish a product claim until its owner can explain how it is measured or enforced. In particular, verify security, data movement, model retention, hosting, ownership, and performance claims before adding them to the page.
