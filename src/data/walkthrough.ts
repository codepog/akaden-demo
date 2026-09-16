/** Copy used by the six-stage workflow diagram. */
interface Stage {
  id: string;
  title: string;
  caption: string;
}

export const stages: Stage[] = [
  {
    id: 'prepare-workspace',
    title: 'Prepare Workspace',
    caption: 'Input business and technical context',
  },
  {
    id: 'specification-builder',
    title: 'Specification Builder Agent',
    caption: 'Discuss requirements and draft future state',
  },
  {
    id: 'review-specification',
    title: 'Review Specification',
    caption: 'Revise the specification with an agent or by hand until it communicates your business goals',
  },
  {
    id: 'pipeline-builder',
    title: 'Pipeline Builder Agent',
    caption: 'Generate a pipeline from the specification',
  },
  {
    id: 'deploy-validate',
    title: 'Deploy and Validate',
    caption: 'Generate test cases, deploy to the Ellucian tenant, and validate',
  },
  {
    id: 'monitor-pipelines',
    title: 'Monitor',
    caption: 'Use Akaden dashboards to monitor pipeline health and apply updates to pipelines',
  },
];

export const changeRequest = {
  when: 'Case Study',
  ask: '28% of engineering hours saved.',
};
