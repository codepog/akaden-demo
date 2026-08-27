/**
 * The five walkthrough stages.
 *
 * SINGLE SOURCE. Both the interactive island and the always-visible text
 * equivalent below it render from this file. Authoring them separately is how
 * the accessible version drifts out of date (spec §8 + §12).
 *
 * `actor` drives colour, and it is the product thesis rendered as colour:
 *   'human'  → blue      the person is doing this
 *   'agent'  → amber     an agent is doing this
 *   'system' → blue      a system is doing this
 * Stage 03 is the only stage rendered as a SOLID blue block. In a run of amber
 * agent stages, the human moment is the one that is not an agent.
 */

export type Actor = 'human' | 'agent' | 'system';

export interface Stage {
  /** Two-digit marker. Order carries real information here, so numbering is earned. */
  n: string;
  id: string;
  title: string;
  /** The deck's own caption for this stage. */
  caption: string;
  /** What the visitor should understand. Read by the text equivalent verbatim. */
  body: string;
  actor: Actor;
  /** Real alt text, not a filename. Written per stage, never generated. */
  alt: string;
  /** Desktop capture, 16:10. null until ABCloudz supplies it. */
  shot: string | null;
  /** Mobile crop region of the same source capture, 4:3. Editorial choice, declared not derived. */
  shotMobile: string | null;
  /** Which region of the frame the mobile crop should take. Briefing note for capture day. */
  mobileCrop: string;
  /** Present on stages that loop back. The deck shows two Iterate loops. */
  iterate?: string;
}

export const stages: Stage[] = [
  {
    n: '01',
    id: 'prepare-workspace',
    title: 'Prepare workspace',
    caption: 'Input business and technical context',
    body:
      'You load the workspace with what the agents need to know: the business requirement, ' +
      'the technical context, and the conventions your institution already follows. Nothing ' +
      'is generated yet. This is the step where your knowledge enters the system instead of ' +
      'staying in one engineer’s head.',
    actor: 'human',
    alt: 'The Akaden workspace with business and technical context files loaded, before any generation has started.',
    shot: null,
    shotMobile: null,
    mobileCrop: 'The context file list — the panel that shows what has been loaded.',
  },
  {
    n: '02',
    id: 'specification-builder',
    title: 'Specification Builder Agent',
    caption: 'Discuss requirement and draft future state',
    body:
      'You describe the requirement in plain language. The agent asks about the parts you ' +
      'left out, then drafts a written specification of the future state — sources, mappings, ' +
      'transformations, constraints, acceptance criteria. It reads as a document, because it is one.',
    actor: 'agent',
    alt: 'The Specification Builder Agent in conversation, drafting a written specification from a stated requirement.',
    shot: null,
    shotMobile: null,
    mobileCrop: 'The agent’s question and the engineer’s reply — the exchange, not the sidebar.',
    iterate: 'Not what you meant? Send it back and the agent redrafts.',
  },
  {
    n: '03',
    id: 'review-specification',
    title: 'Review specification',
    caption: 'Discuss specifications with agent or edit document manually',
    body:
      'You read the specification and you approve it, or you change it. Nothing is generated ' +
      'until you do. Every constraint the pipeline will honour is visible here, in language ' +
      'you can argue with, before any code exists.',
    actor: 'human',
    alt: 'The drafted specification open for review, showing the name-selection rule awaiting human approval.',
    shot: null,
    shotMobile: null,
    mobileCrop: 'The specification body text — it must stay legible at 320px, so crop to the clause.',
  },
  {
    n: '04',
    id: 'pipeline-builder',
    title: 'Pipeline Builder Agent',
    caption: 'Generate pipeline from specification',
    body:
      'The agent builds the pipeline from the approved specification — segments, field mappings, ' +
      'transformations, error handling. The work that used to be configured by hand, field by ' +
      'field, five to fifty times per integration.',
    actor: 'agent',
    alt: 'The Pipeline Builder Agent generating pipeline artifacts from the approved specification.',
    shot: null,
    shotMobile: null,
    mobileCrop: 'The artifact list as it fills — the visible evidence of generation.',
    iterate: 'Generated something wrong? The fix goes in the spec, not the pipeline.',
  },
  {
    n: '05',
    id: 'deploy-validate',
    title: 'Deploy and validate',
    caption: 'Deploy to Ellucian tenant and review',
    body:
      'The pipeline deploys to your Ellucian tenant and runs against the acceptance criteria ' +
      'written into the specification. You review the result. The specification that built it ' +
      'is still there, in git, describing exactly what shipped.',
    actor: 'system',
    alt: 'The generated pipeline deployed and running in the Ellucian tenant, with acceptance criteria passing.',
    shot: null,
    shotMobile: null,
    mobileCrop: 'The acceptance-criteria result rows — pass state must be readable.',
  },
];

/** The excerpt shown at the approve gate. Institutional, not technical — the point. */
export const specExcerpt = `Pick the name in this order:
1. Preferred name.
2. Legal/official name.
3. Any available name as fallback.`;

/**
 * Preset prompts. Built for three; only the first has captures (spec §7.2 vs §9).
 * The other two are named as use cases in text rather than shown as dead controls.
 */
export const presets = [
  { id: 'alumni',    label: 'Export alumni contacts to S3', ready: true },
  { id: 'lms',       label: 'Sync course enrollments to the LMS', ready: false },
  { id: 'finaid',    label: 'Nightly financial aid feed', ready: false },
];

/** The change-request beat — §7.5 calls this the highest-value element on the page. */
export const changeRequest = {
  when: 'Six months later',
  ask: 'Advancement needs a country column on the alumni export.',
  oldWay: 'Open the pipeline. Find the mapping. Patch it by hand. Hope the tests still cover it.',
  newWay: 'Add the column to the specification. Regenerate. Acceptance criteria pass. The spec still describes what shipped.',
};
