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
      key: 'intelligence',
      title: 'Intelligence',
      summary: 'Apply leading AI models with relevant project context.',
      body: 'Use leading AI models with the project context and specialized skills needed to reason through complex integration work. Engineers choose the models and direct the work.',
    },
    {
      key: 'development',
      title: 'Development',
      summary: 'Build, test, review, and retain delivery knowledge.',
      body: 'Bring agent-assisted building, testing, review, and version control into the engineering workflow while keeping people in control. Reusable knowledge and pipeline best practices stay available to the team.',
    },
    {
      key: 'data',
      title: 'Data & Cloud',
      summary: 'Work across existing data and cloud platforms.',
      body: 'Build across the data platforms, warehouses, and cloud infrastructure your institution already relies on from one connected environment.',
    },
    {
      key: 'systems',
      title: 'Existing Systems',
      summary: 'Carry institutional context into modernization.',
      body: 'Carry forward context from Banner, Colleague, student records, learning platforms, and existing legacy applications so modernization does not start from scratch.',
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
