/**
 * Public-facing product copy. Keep claims narrow until ABCloudz can support
 * them with product, security, or customer evidence.
 */

export const site = {
  name: 'Akaden',
  tagline: 'The AI-assisted IDE for Ellucian pipeline development',
  description:
    'Akaden helps Ellucian development teams turn existing knowledge into reviewed specifications, tested pipelines, and monitored deployments.',
  owner: 'ABCloudz',
  ownerUrl: 'https://abcloudz.com/',
};

export const nav = {
  tabs: [
    { label: 'Overview', href: '#overview', live: true },
    { label: 'Workflow', href: '#workflow', live: true },
    { label: 'Control', href: '#control', live: true },
    { label: 'FAQ', href: '#faq', live: true },
  ],
  cta: { label: 'Explore demo', href: '#product-demo' },
};

export const announcement = {
  text: 'See Akaden at EDUCAUSE Demo Day',
  detail: 'September 14, 2026',
  href: '#product-demo',
};

export const hero = {
  eyebrow: 'AI-assisted IDE for Ellucian pipeline development',
  headline: 'Build Ellucian pipelines from a specification.',
  lead:
    'Bring meeting notes, legacy documentation, and existing pipelines into one workspace. Turn that context into a reviewed specification, tested implementation, and monitored deployment—while your team stays in control.',
  primaryAction: 'Explore the interactive demo',
  secondaryAction: 'See the workflow',
  previewLabel: 'Akaden product tour',
  previewStatus: 'Interactive walkthrough',
  thesis: 'A development environment built around the whole pipeline lifecycle',
  thesisSub:
    'Akaden adds an AI-assisted, specification-driven workflow on top of Ellucian pipeline solutions. Developers keep the judgment, the ability to edit manually, and every approval that matters.',
  actions: {
    demo: { label: 'Explore demo' },
    video: {
      label: 'Watch demo',
      eyebrow: 'Product walkthrough',
      headline: 'See the complete Akaden workflow.',
      body: 'A recorded walkthrough will be added after the final product capture is ready.',
    },
    contact: { label: 'Explore demo', href: '#product-demo' },
  },
};

export const overview = [
  {
    number: '01',
    title: 'Start with the work you already have',
    body: 'Use meeting notes, existing documentation, prior pipelines, and institutional conventions as context instead of starting from a blank prompt.',
  },
  {
    number: '02',
    title: 'Agree on the specification first',
    body: 'Iterate with AI, resolve missing decisions, and approve a human-readable specification before pipeline generation begins.',
  },
  {
    number: '03',
    title: 'Build, test, deploy, and monitor',
    body: 'Generate the pipeline and its tests, revise with AI or by hand, approve deployment, and monitor the result from the same workflow.',
  },
];

export const lifecycle = [
  {
    number: '01', actor: 'Team', kind: 'human', title: 'Bring in the context',
    body: 'Load meeting notes, legacy documentation, existing pipelines, and the conventions your institution already follows.',
  },
  {
    number: '02', actor: 'AI-assisted', kind: 'agent', title: 'Develop the specification',
    body: 'Work with Akaden to resolve requirements, mappings, constraints, and acceptance criteria in a document your team can review.',
  },
  {
    number: '03', actor: 'Human approval', kind: 'human', title: 'Approve the plan',
    body: 'Edit the specification directly or continue the conversation. Generation starts only after your team approves the intended behavior.',
  },
  {
    number: '04', actor: 'AI-assisted', kind: 'agent', title: 'Generate the pipeline',
    body: 'Build pipeline artifacts from the approved specification, with the source intent still visible beside the implementation.',
  },
  {
    number: '05', actor: 'AI-assisted', kind: 'agent', title: 'Create the test cases',
    body: 'Turn the agreed acceptance criteria into tests that can verify the pipeline before deployment.',
  },
  {
    number: '06', actor: 'Developer', kind: 'human', title: 'Review and revise',
    body: 'Inspect the result, revise through AI, or edit manually. Akaden preserves the developer controls teams already depend on.',
  },
  {
    number: '07', actor: 'Human approval', kind: 'human', title: 'Approve deployment',
    body: 'Confirm functionality, set runtime parameters, and choose when the pipeline is ready to connect to the Ellucian tenant.',
  },
  {
    number: '08', actor: 'System', kind: 'system', title: 'Monitor what shipped',
    body: 'Follow deployed pipelines from the monitoring dashboard and retain a reviewable record of the specification and delivery decisions.',
  },
];

export const controls = {
  eyebrow: 'Developer control',
  headline: 'AI moves the work forward. Your team decides what ships.',
  lead:
    'Akaden is designed to support developers, not route around them. The specification, implementation, and deployment remain inspectable and editable throughout the lifecycle.',
  items: [
    { title: 'Human approval gates', body: 'Your team confirms the inputs, specification, functionality, and deployment.' },
    { title: 'Manual editing stays available', body: 'Developers can inspect and revise generated artifacts directly whenever the work calls for it.' },
    { title: 'You own the output', body: 'The specifications and generated pipeline artifacts remain your team’s work product.' },
    { title: 'Operations stay visible', body: 'A monitoring dashboard keeps deployed pipelines and their operating history in view.' },
  ],
};

export const maintenance = {
  eyebrow: 'Six months later',
  headline: 'A small change should not require an archaeology project.',
  request: 'The communications team needs a country column in the contact export.',
  oldWay: [
    'Find the original pipeline and reconstruct why it works the way it does.',
    'Patch the mapping by hand and hope the documentation and tests still match.',
    'Leave the next developer to repeat the same investigation.',
  ],
  akadenWay: [
    'Add the new requirement to the specification.',
    'Regenerate or revise manually, then run the acceptance tests.',
    'Keep the specification and delivered pipeline aligned for the next change.',
  ],
};

export const evidence = {
  eyebrow: 'Built from delivery work',
  headline: 'Created for the pipeline problems ABCloudz engineers see firsthand.',
  lead:
    'Akaden is an internal production tool developed from ABCloudz’s Ellucian integration work. It is currently used on internal projects while the external product offering is prepared.',
  points: [
    { title: 'Purpose-built for Ellucian', body: 'The workflow is designed around Ellucian pipeline development rather than a generic code-generation experience.' },
    { title: 'Specification-driven', body: 'The reviewed description of intent stays beside the pipeline through generation, revision, testing, and maintenance.' },
    { title: 'Web and desktop access', body: 'Akaden is being developed for both browser-based and desktop development workflows.' },
  ],
  note: 'The current evidence is internal product use; external customer outcomes will be added only after they are measured.',
};

export const faq = [
  {
    question: 'What is Akaden?',
    answer: 'Akaden is an AI-assisted IDE built on top of Ellucian pipeline solutions. It gives development teams a specification-driven workspace for planning, building, testing, deploying, and monitoring pipelines.',
  },
  {
    question: 'Who is it for?',
    answer: 'Akaden is designed for teams that build and maintain Ellucian pipelines. Development leaders gain a clearer, repeatable delivery process, while developers retain the technical controls they use today.',
  },
  {
    question: 'What can a team start with?',
    answer: 'A workspace can begin with meeting notes, old documentation, existing pipelines, business requirements, and institution-specific technical conventions.',
  },
  {
    question: 'Does Akaden replace developers?',
    answer: 'No. Developers review the specification, inspect the generated work, revise it through AI or manually, confirm functionality, and approve deployment.',
  },
  {
    question: 'Does it work outside Ellucian environments?',
    answer: 'Akaden is currently purpose-built for Ellucian pipeline environments.',
  },
  {
    question: 'Which AI model does Akaden use?',
    answer: 'Current product builds use Anthropic’s Claude Sonnet. Detailed information about model inputs, retention, and deployment boundaries will be documented before the external offering is finalized.',
  },
];

/** Content retained for archived/reference components. */
export const walkthroughNote = 'Recorded from a product run. This is not a live sandbox and does not connect to a real tenant.';

export const whySpec = {
  eyebrow: 'Why the specification',
  headline: 'The specification is the thing worth keeping',
  lead: 'A specification records what the pipeline is supposed to do in language the team can review.',
  points: overview.map((item) => ({ title: item.title, body: item.body })),
};

export const guardrails = {
  eyebrow: 'Guardrails',
  headline: 'People approve the consequential decisions',
  lead: controls.lead,
  examples: ['Review the specification before generation.', 'Confirm functionality before deployment.'],
  close: 'Developers can revise generated artifacts through AI or by hand.',
  enforcementPending: true,
};

export const proof = {
  eyebrow: evidence.eyebrow,
  headline: evidence.headline,
  lead: evidence.lead,
  stats: [] as Array<{ figure: string; label: string; sourced: boolean }>,
  partnership: { label: 'About ABCloudz', quote: '', attribution: '', role: '', pendingPermission: true },
  badgeNote: 'ABCloudz is a member of the Ellucian Partner Network.',
};

export const benefits = { eyebrow: 'What changes', headline: controls.headline, items: controls.items };
export const wholePicture = { eyebrow: 'The whole picture', headline: 'One development workflow, supervised by your team.', lead: hero.thesisSub };

export const install = {
  eyebrow: 'Explore Akaden',
  headline: 'Follow one pipeline from request to monitored deployment.',
  lead: 'Use the guided product experience to see how the specification, approvals, generation, testing, and deployment fit together.',
  ctaLabel: 'Open interactive demo',
  ctaHref: '#product-demo',
  pending: true,
  secondary: { text: 'Learn more about the team behind Akaden.', label: 'Visit ABCloudz', href: 'https://abcloudz.com/' },
};

export const footer = {
  note: 'Akaden is built by ABCloudz for Ellucian pipeline teams.',
  event: '',
  links: [
    { label: 'Overview', href: '#overview' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Interactive demo', href: '#product-demo' },
    { label: 'ABCloudz', href: 'https://abcloudz.com/' },
  ],
};
