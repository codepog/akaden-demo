/** Shared landing-page copy and navigation. */

export const site = {
  tagline: 'AI-assisted IDE for Ellucian pipeline development',
  description:
    'Akaden turns a written specification into a reviewed, deployable Ellucian data pipeline. ' +
    'It guides teams through the delivery work with practices built for integrations, while people keep the decisions.',
  ownerUrl: 'https://abcloudz.com/',
};

export const nav = {
  tabs: [
    { label: 'Overview', href: '#overview', live: true },
    { label: 'What changes', href: '#outcomes', live: true },
    { label: 'Demo', href: '#interactive-demo', live: true },
    { label: 'Case Study', href: '#specification', live: true },
    { label: 'Proof', href: '#proof', live: true },
  ],
  cta: { label: 'Contact Us', href: '#form' },
};

export const hero = {
  eyebrow: 'AI-assisted IDE for Ellucian pipeline development',
  headline: 'Accelerate pipeline development and cloud migration.',
  lead:
    'Akaden turns a written request into a reviewed, deployable Ellucian data pipeline, with the right delivery practices ready when the work needs them.',
  thesis: 'Get to Know Akaden',
  thesisSub: 'Bring the systems, code, and business rules you already have. Akaden helps your team deliver reliable pipelines faster while preserving the knowledge behind them.',
};

export const proof = {
  eyebrow: 'Proof',
  headline: 'Battle-tested by our own delivery team.',
  lead:
    'We built Akaden to help our own delivery team do better integration work faster, more consistently, and with knowledge the whole team could use. ' +
    'After seeing how much it improved real Ellucian projects, we decided to share it with other teams facing the same challenges.',
  stats: [
    { figure: 'Used Internally', label: 'Used in production by the ABCloudz delivery team' },
    { figure: 'Human-led', label: 'Developers review and approve the decisions that matter' },
    { figure: 'Team continuity', label: 'Critical pipeline knowledge stays accessible across the team' },
  ],
};

export const benefits = {
  eyebrow: 'What changes',
  items: [
    {
      title: 'Reduce integration complexity',
      body: 'Standardize how requirements, mappings, test cases, and pipeline changes are defined and managed in one connected workflow.',
    },
    {
      title: 'Accelerate pipeline delivery',
      body: 'Move from requirements through specification, generation, testing, review, and deployment while preserving full manual control.',
    },
    {
      title: 'Keep delivery knowledge with the team',
      body: 'Use the specification as a durable source of intent so decisions, context, and delivery knowledge remain accessible as people and priorities change.',
    },
    {
      title: 'Apply best practices by default',
      body: 'Build proven pipeline patterns, audit controls, and edge-case guidance into each delivery instead of asking every engineer to recreate them.',
    },
  ],
};

export const contact = {
  eyebrow: 'Contact us',
  headline: 'See what Akaden can do with your integration.',
  lead:
    'The integration may be critical, but moving it forward means untangling years of logic, filling in missing context, and finding time your team doesn’t have. Whether you’re modernizing Banner or Colleague, building in Data Connect, or inheriting someone else’s work, Akaden turns what already exists into a reviewed specification and a tested pipeline, so your engineers can make progress without starting over.',
  close: 'Bring a real use case. Leave with a clearer path forward.',
  ctaLabel: 'Contact Us',
  ctaHref: '',
};

export const footer = {
  note: 'Akaden is built by ABCloudz.',
  event: 'EDUCAUSE Demo Day, 14 September 2026',
  links: [
    { label: 'ABCloudz', href: 'https://abcloudz.com/' },
    { label: 'Contact Us', href: '#form' },
  ],
};
