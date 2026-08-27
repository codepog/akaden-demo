/**
 * All page copy. Nothing is hardcoded in components (spec §12), so wording can be
 * edited without touching markup.
 *
 * NEEDS-SOURCE marks a claim that has not been confirmed by ABCloudz yet. Anything
 * still marked when the review happens does not ship (spec §15).
 */

export const site = {
  name: 'Akaden',
  tagline: 'Technology modernization through Agentic AI',
  description:
    'Akaden turns a written specification into a deployed Ellucian data pipeline. ' +
    'An agent drafts the spec, you approve it, a second agent builds the pipeline. ' +
    'When the requirement changes, you edit the spec and regenerate.',
  owner: 'ABCloudz',
  ownerUrl: 'https://abcloudz.com/',
};

export const nav = {
  tabs: [
    { label: 'Product', href: './', live: true },
    { label: 'Setup', href: '#', live: false },
    { label: 'Specs', href: '#', live: false },
    { label: 'Security', href: '#', live: false },
  ],
  cta: { label: 'Get Akaden', href: '#install' },
};

export const hero = {
  eyebrow: 'For Ellucian Banner and Ethos',
  headline: 'Write a spec.\nGet a working pipeline.',
  lead:
    'Akaden is a multi-agent system for Ellucian data integrations. You describe a requirement, ' +
    'an agent drafts a written specification, you approve it, and a second agent generates and ' +
    'deploys the pipeline. When the requirement changes six months later, you edit the ' +
    'specification and regenerate — you do not hand-patch the pipeline.',
  thesis: 'You stop maintaining pipelines. You start maintaining specifications.',
  thesisSub: 'The pipeline is the output. The spec is the asset.',
  install: { label: 'Get Akaden', href: '#install' },
  secondary: { label: 'See how it works', href: '#walkthrough' },
};

/** Honesty label on the walkthrough. Presets are pre-recorded; the page says so (spec §7.2). */
export const walkthroughNote =
  'Recorded from a production run. This is not a live sandbox — nothing here connects to a real tenant.';

export const whySpec = {
  eyebrow: 'Why the specification',
  headline: 'The specification is the thing worth keeping',
  lead:
    'A pipeline tells you what it does if you can read it. A specification tells you what it is ' +
    'supposed to do, in language anyone on the team can check.',
  points: [
    {
      title: 'Documentation that cannot go stale',
      body:
        'The document is not written about the pipeline after the fact. It is what builds the ' +
        'pipeline. If the two ever disagree, the pipeline is the one that gets regenerated.',
    },
    {
      title: 'Integrations live in git',
      body:
        'Specifications are text. They are reviewed, versioned, and diffable, and a change to an ' +
        'integration shows up as a change to a document a person approved.',
    },
    {
      title: 'A human-readable audit trail',
      body:
        'When someone asks why the export picks preferred name over legal name, the answer is a ' +
        'line in a document with a name and a date against it — not an inference from a mapping table.',
    },
    {
      title: 'Knowledge survives staff turnover',
      body:
        'The engineer who understood the Banner conventions writes them into specifications the ' +
        'agents read. When they leave, that understanding stays in the repository.',
    },
  ],
};

export const guardrails = {
  eyebrow: 'Guardrails',
  headline: 'The constraints are written down before anything is built',
  lead:
    'The first question every institution asks is whether an AI system is going to write to the ' +
    'student information system. The answer is not a promise made by a vendor after the fact. It ' +
    'is a set of constraints written into the specification and approved by a person before a ' +
    'single line of pipeline is generated.',
  examples: [
    'The integration must not update Banner data.',
    'It must not rely on direct database access or direct Banner table reads.',
  ],
  close:
    'You read those lines at the review step. You approve them, or you change them. Generation ' +
    'does not start until you do.',
  /**
   * NEEDS-SOURCE — the enforcement paragraph (review finding 02).
   * A constraint in a spec is an instruction to a generator. An ERP director will ask what
   * happens if the generated pipeline does it anyway. Needed from ABCloudz:
   *   1. Is the Banner/Ethos credential read-only?
   *   2. Is the generated pipeline reviewed by a human before deploy, or only the spec?
   *   3. What does "Validate" at stage 05 actually check?
   * If the answer includes "the service account has no write scope", that sentence leads
   * this section and everything above becomes supporting detail.
   */
  enforcementPending: true,
};

export const proof = {
  eyebrow: 'Proof',
  headline: 'Built for our own delivery team first',
  lead:
    'ABCloudz builds and migrates data integrations for institutions running Ellucian Banner. ' +
    'Akaden was built because that work was being done by hand, and it went into production on ' +
    'our own team before it went anywhere else.',
  stats: [
    { figure: '15', label: 'Engineers using it in production', sourced: true },
    { figure: '2', label: 'US-based solutions architects', sourced: true },
    { figure: '5–50×', label: 'Times a pipeline entry was configured by hand, per integration', sourced: true },
  ],
  /**
   * NEEDS-SOURCE — the number that would matter most is not here (review finding 14).
   * "A pipeline used to take weeks, now it takes ___." Needs: pipelines built, before and
   * after, over what period, measured how. No percentage ships without its denominator.
   */
  partnership: {
    label: 'On the ABCloudz–Ellucian partnership',
    quote:
      'Our partnership with ABCloudz brings proven expertise and powerful tools like ' +
      'Modernization Studio into the fold, ensuring customers can confidently embrace digital ' +
      'transformation and drive meaningful outcomes with Ellucian SaaS solutions.',
    attribution: 'Jeff Dinski',
    role: 'Chief Strategy and Corporate Development Officer, Ellucian',
    /**
     * Framed as partnership evidence, NOT as an Akaden endorsement — the quote names
     * Modernization Studio, a different product (review finding 11). Do not move this
     * under a heading that implies Ellucian endorses Akaden.
     * NEEDS-SOURCE: permission to reuse, scoped to this page and this product.
     */
    pendingPermission: true,
  },
  badgeNote: 'ABCloudz is a member of the Ellucian Partner Network.',
};

export const benefits = {
  eyebrow: 'What changes',
  headline: 'Developers shift from doing every step to supervising the agentic flow',
  items: [
    {
      title: 'Resilience and speed',
      body: 'The repetitive configuration is done consistently, and the same requirement produces the same pipeline every time.',
    },
    {
      title: 'Scale without headcount',
      body: 'A SaaS migration can involve fifty to two hundred pipelines. The constraint stops being how many engineers you have.',
    },
    {
      title: 'One connected system',
      body: 'Banner, the LMS, the warehouse, the legacy systems, and whatever comes next — described the same way, in one place.',
    },
  ],
};

export const wholePicture = {
  eyebrow: 'The whole picture',
  headline: 'One engineer, supervising',
  lead:
    'Every integration used to run through a person configuring it by hand. The systems have not ' +
    'changed. What changed is where the engineer stands.',
};

export const install = {
  eyebrow: 'Get started',
  headline: 'Install Akaden',
  /** NEEDS-SOURCE — exact install instructions and the download/repo target (review finding 01). */
  lead: 'Akaden installs from a release you download and run against your own workspace.',
  ctaLabel: 'Download Akaden',
  ctaHref: '#',
  pending: true,
  /** §2 rules out a demo funnel as the PRIMARY cta — a quiet secondary path is still needed. */
  secondary: {
    text: 'Not ready to install? Talk to the team about how Akaden fits your Ellucian estate.',
    label: 'Contact ABCloudz',
    href: 'https://abcloudz.com/',
  },
};

export const footer = {
  note: 'Akaden is built by ABCloudz.',
  event: 'EDUCAUSE Demo Day — 14 September 2026',
  links: [
    { label: 'ABCloudz', href: 'https://abcloudz.com/' },
    { label: 'Accessibility', href: '#accessibility' },
    { label: 'Install', href: '#install' },
  ],
};
