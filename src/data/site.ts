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
    'Akaden turns a written request into a reviewed, deployable Ellucian data pipeline with review, testing, and delivery best practices built into the workflow.',
  thesis: 'Get to Know Akaden',
  thesisSub: 'Bring the systems, code, and business rules you already have. Akaden helps your team deliver reliable pipelines faster while preserving the knowledge behind them.',
};

export const proof = {
  eyebrow: 'Proof',
  headline: 'We built the tool our delivery team needed.',
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
      summary: 'Apply custom integration skills to your institutional context.',
      body: 'Akaden combines institutional knowledge with custom skills built for Ellucian integration work. Specialized agents use that foundation to guide pipeline decisions while engineers stay in control.',
    },
    {
      key: 'development',
      title: 'Development',
      summary: 'Keep specifications, pipelines, and the team in sync.',
      body: 'A spec-driven process keeps requirements, decisions, pipelines, tests, and related work connected as the project evolves. Version control records each change so any teammate can review the project and continue the work.',
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
      body: 'Carry forward context from Banner, Colleague, student records, learning platforms, legacy applications, and other existing systems so modernization does not start from scratch.',
    },
  ],
};

export const contact = {
  eyebrow: 'Contact us',
  headline: 'See what Akaden can do with your integration.',
  lead:
    'Have an integration your team needs to build, modernize, or take over? Tell us what you’re working on, and we’ll show you how Akaden can help move it forward.',
  close: 'Bring a real use case. Leave with a clearer path forward.',
  ctaLabel: 'Submit',
  // At launch, set this to the confirmed Contact Form 7 feedback endpoint.
  // The current akaden.ai form uses form ID 9 and a /contact-forms/9/feedback route.
  submitEndpoint: '',
};

export const footer = {
  note: 'Akaden is built by ABCloudz.',
  links: [
    { label: 'ABCloudz', href: 'https://abcloudz.com/' },
    { label: 'Contact Us', href: '#form' },
  ],
};
