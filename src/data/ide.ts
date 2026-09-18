/**
 * Mock IDE demo: hard-coded state machine for the Akaden SDLC walkthrough.
 *
 * This is the WEBSITE, not the app. Every response here is pre-written. The file
 * contents, prompts, agent names, and validation warnings are real and come from
 * an actual run; the surrounding chrome is a simplified reconstruction.
 *
 * To add functionality: each step is one object. Add a `toolbar` action, a
 * `chat` message, or a new `view` and it appears. Nothing else needs touching.
 */

export type Actor = 'you' | 'agent' | 'system';
export type ViewKind = 'empty' | 'markdown' | 'pipeline' | 'test' | 'publish' | 'params' | 'run' | 'monitor';

export interface ChatMsg {
  from: 'you' | 'agent';
  agent?: string;
  text: string;
  /** Rendered as markdown-ish blocks. */
  blocks?: { kind: 'p' | 'h' | 'ul' | 'ol' | 'code'; text?: string; items?: string[] }[];
  meta?: string;
}

export interface Step {
  n: number;
  id: string;
  title: string;
  actor: Actor;
  /** Available for internal state descriptions; the on-screen guide carries the next action. */
  suggested: string;
  /** Files that exist in the explorer by this step. */
  files: string[];
  /** File opened in the editor when the step is selected. */
  open: string | null;
  view: ViewKind;
  chat: ChatMsg[];
  /** Agent shown in the composer picker. */
  agent: string;
  /** Buttons in the editor toolbar. Same action as Next, using the product's own control. */
  toolbar?: { label: string; kind: 'primary' | 'ghost'; action: string }[];
  /** Plain-language coach copy, shown beside the active product feature. */
  instruct: string;
  /** Which pane the action is in. Everything else dims. */
  focus: 'side' | 'ed' | 'chat';
  /** The control worth looking at. Gets a ring. */
  ring: string;
  /** Label on the Next button. It names the action it performs. */
  nextLabel: string;
  /** Short plain-language gloss shown under the step in the guide rail. */
  gloss: string;
}

export const AGENTS = [
  'Agent',
  'Pipeline Builder Agent',
  'Pipeline QA Agent',
  'Pipeline Testing Agent',
  'Specification Builder Agent',
  'Specification QA Agent',
];

export const FILES: Record<string, { folder: string; name: string; kind: 'md' | 'pipeline' | 'test' }> = {
  requirement: { folder: 'inputs', name: 'student-contact-export-requirement.md', kind: 'md' },
  spec: { folder: 'specifications', name: 'student-contact-export-spec.md', kind: 'md' },
  readme: { folder: 'pipelines', name: 'STUDENT_CONTACT_EXPORT_README.md', kind: 'md' },
  pipeline: { folder: 'pipelines', name: 'student-contact-export.pipeline', kind: 'pipeline' },
  test: { folder: 'pipelines', name: 'student-contact-export.test_pipeline', kind: 'test' },
};

export const FOLDERS = ['inputs', 'pipelines', 'specifications', 'sub-pipelines', 'validation'];

export const steps: Step[] = [
  {
    n: 1, id: 'prepare', title: 'Prepare workspace', actor: 'you',
    gloss: 'Upload the request file into inputs. Nothing is generated yet.',
    suggested: 'Upload the request into inputs',
    files: [], open: null, view: 'empty', agent: 'Agent',
    chat: [],
    instruct: 'You begin with the original business request. Upload it to inputs so Akaden can work from the same source your team received.',
    focus: 'ed',
    ring: '[data-upload-source]',
    nextLabel: 'Upload request',
    toolbar: [],
  },
  {
    n: 2, id: 'build-spec', title: 'Build specification', actor: 'agent',
    gloss: 'The Specification Builder Agent reads the requirement and drafts a spec.',
    suggested: 'Send the ready prompt to the Specification Builder Agent',
    files: ['requirement'], open: 'requirement', view: 'markdown',
    agent: 'Specification Builder Agent',
    toolbar: [],
    instruct: 'The request is open for you to check. This message is ready in the chat composer; send it when you want the specification agent to draft the plan.',
    focus: 'chat',
    ring: '[data-ask]',
    nextLabel: 'Send to builder',
    chat: [
      { from: 'you', text: 'Turn the request in inputs/ into a clear plan for this integration.' },
      {
        from: 'agent', agent: 'Specification Builder Agent', meta: 'Anthropic Claude Haiku 4.5 · just now',
        text: '', blocks: [
          { kind: 'p', text: "I've read the student contact export request in `inputs/`. Drafting the integration specification now." },
          { kind: 'h', text: 'What I extracted' },
          { kind: 'ul', items: [
            'Source: Ellucian Banner SaaS via Ethos APIs, with no direct database access',
            'Source: approved Banner contact data, read through Ethos APIs',
            'Output: one clean CSV contact file, delivered to a secure S3 folder',
            'Guardrail: the pipeline reads data but never updates Banner',
          ]},
          { kind: 'h', text: 'Constraints carried through' },
          { kind: 'ul', items: [
            'The integration must not update Banner data',
            'It must not rely on direct database access or direct Banner table reads',
          ]},
          { kind: 'p', text: 'Written to `/specifications/student-contact-export-spec.md`, with test cases and an acceptance checklist included.' },
        ],
      },
    ],
  },
  {
    n: 3, id: 'review-spec', title: 'Review specification', actor: 'you',
    gloss: 'Yours. Nothing gets generated until you approve this document.',
    suggested: 'Approve the specification to continue',
    files: ['requirement', 'spec'], open: 'spec', view: 'markdown',
    agent: 'Specification QA Agent',
    toolbar: [{ label: 'Approve specification', kind: 'primary', action: 'next' }],
    instruct: 'This is your checkpoint. Edit the specification yourself or with the agent until it accurately describes your business needs and technical plan. Nothing is built until you approve it.',
    focus: 'ed',
    ring: '[data-toolbar-action]',
    nextLabel: 'Approve specification',
    chat: [
      {
        from: 'agent', agent: 'Specification QA Agent', meta: 'Anthropic Claude Haiku 4.5 · just now',
        text: '', blocks: [
          { kind: 'p', text: 'Specification is complete and internally consistent. Two things worth your eyes before approval:' },
          { kind: 'ol', items: [
            'Name selection order: preferred, then legal/official, then any available. This is an institutional decision, not a technical one.',
            'Priority direction: the spec assumes the lowest numeric priority wins. If Banner returns it the other way round, the selection logic inverts.',
          ]},
          { kind: 'p', text: 'Nothing is generated until you approve.' },
        ],
      },
    ],
  },
  {
    n: 4, id: 'generate', title: 'Generate pipeline', actor: 'agent',
    gloss: 'The Pipeline Builder Agent is ready to turn the approved spec into a pipeline.',
    suggested: 'Send the ready prompt to the Pipeline Builder Agent',
    files: ['requirement', 'spec'], open: 'spec', view: 'markdown',
    agent: 'Pipeline Builder Agent',
    toolbar: [],
    instruct: 'The approved specification is the blueprint. Send this prompt to have the pipeline builder turn the decisions you reviewed into an implementation.',
    focus: 'chat',
    ring: '[data-ask]',
    nextLabel: 'Send to builder',
    chat: [
      { from: 'you', text: 'Generate the pipeline (.pipeline) from the ready specification in specifications/. Save the artifact under the project.' },
      {
        from: 'agent', agent: 'Pipeline Builder Agent', meta: 'Anthropic Claude Haiku 4.5 · just now',
        text: '', blocks: [
        { kind: 'p', text: 'Generated `student-contact-export.pipeline` from the approved specification, using the v3.1Outbound template.' },
          { kind: 'ul', items: [
            '39 segments in run order',
            '25 pipeline parameters',
            '7 Ethos API calls: persons, names, emails, phones, addresses, emergency-contacts',
            '18 JavaScript transforms including the best-record selection rules',
          ]},
          { kind: 'p', text: 'Saved to `/pipelines/`. Documentation written alongside it.' },
        ],
      },
    ],
  },
  {
    n: 5, id: 'refine', title: 'Refine & quick-test', actor: 'you',
    gloss: 'Revise the generated pipeline, quick-test it, and repeat until it is ready to deploy.',
    suggested: 'Review the test case and check the expected output',
    files: ['requirement', 'spec', 'pipeline', 'readme', 'test'], open: 'pipeline', view: 'pipeline',
    agent: 'Pipeline Testing Agent',
    toolbar: [{ label: 'Pipeline', kind: 'ghost', action: 'pipeline' }, { label: 'Test case', kind: 'ghost', action: 'test' }, { label: 'Continue to deploy', kind: 'primary', action: 'ready-to-deploy' }],
    instruct: 'Review the generated pipeline, then open its separate .test_pipeline file in pipelines to run a quick test before deployment. You can revise and retest if needed.',
    focus: 'ed',
    ring: '[data-pipeline-canvas]',
    nextLabel: 'Review test case',
    chat: [
      { from: 'agent', agent: 'Pipeline Testing Agent', meta: 'Demo response', text: '', blocks: [
        { kind: 'p', text: 'The generated pipeline is ready for engineer review. Confirm the API endpoints and business rules before moving it to an environment.' },
        { kind: 'p', text: 'Open pipelines/student-contact-export.test_pipeline alongside the pipeline. This separate test file checks:' },
        { kind: 'ol', items: ['Verify success: no errors, a data array, and a string payload.', 'Extract CSV payload: make the CSV available for comparison.', 'compareFile: compare the output with validation/expected-output.csv.'] },
        { kind: 'p', text: 'Run the quick test, review the results, then continue to deployment. If anything needs changing, return to the pipeline and retest. Both files belong to step 5: Refine & quick-test.' },
      ] },
    ],
  },
  {
    n: 6, id: 'deploy', title: 'Deploy pipeline', actor: 'system',
    gloss: 'Deploy sends a draft to Ellucian. It does not make a live version.',
    suggested: 'Deploy a draft to the selected tenant',
    files: ['requirement', 'spec', 'pipeline', 'readme', 'test'], open: 'pipeline', view: 'pipeline',
    agent: 'Pipeline Builder Agent',
    instruct: 'Choose the Ellucian tenant and package. Deploy saves a draft there; it does not make the pipeline live. Publishing is a separate decision in the next step.',
    focus: 'ed', ring: '[data-deploy-panel]', nextLabel: 'Deploy draft',
    chat: [
      { from: 'agent', agent: 'Pipeline Builder Agent', meta: 'just now', text: '', blocks: [
        { kind: 'p', text: 'Ready to send `Student Contact Export` to Ellucian as a draft. No live version changes until you publish.' },
      ]},
    ],
  },
  {
    n: 7, id: 'publish', title: 'Publish pipeline', actor: 'you',
    gloss: 'Publish the deployed draft to make this version live in the environment.',
    suggested: 'Review the draft, then publish the version',
    files: ['requirement', 'spec', 'pipeline', 'readme', 'test'], open: null, view: 'publish',
    agent: 'Pipeline Builder Agent',
    instruct: 'The draft is now in Ellucian, but it is not live. Review its details and select Publish to make this version available in the environment.',
    focus: 'ed', ring: '[data-publish-button]', nextLabel: 'Publish version',
    chat: [{ from: 'agent', agent: 'Pipeline Builder Agent', meta: 'Demo response', blocks: [{ kind: 'p', text: 'Draft deployed to Demo University. Publishing creates the live version; it does not run a job.' }], text: '' }],
  },
  {
    n: 8, id: 'params', title: 'Configure job', actor: 'you',
    gloss: 'The runtime values. The cutoff here is the one from your specification.',
    suggested: 'Run and validate the job against the specification',
    files: ['requirement', 'spec', 'pipeline', 'readme', 'test'], open: null, view: 'params',
    agent: 'Agent',
    instruct: 'These are runtime values, so you can adjust them for this run without changing the pipeline. Check the defaults and update any value that needs to differ.',
    focus: 'ed', ring: '[data-view="params"] .form', nextLabel: 'Run the job',
    chat: [
      { from: 'agent', agent: 'Agent', meta: 'just now', text: '', blocks: [
        { kind: 'p', text: 'Five runtime parameters come from the specification. `s3BucketName` is the only required one without a default.' },
      ]},
    ],
  },
  {
    n: 9, id: 'run', title: 'Run & validate job', actor: 'system',
    gloss: 'It runs. The output is checked against the criteria written in the spec.',
    suggested: 'Open monitoring to review job history',
    files: ['requirement', 'spec', 'pipeline', 'readme', 'test'], open: 'job', view: 'run',
    agent: 'Pipeline Testing Agent',
    instruct: 'The run is checked against the acceptance criteria in the specification. Review the results knowing that every output can be traced back to the approved plan.',
    focus: 'ed', ring: '[data-job-run-history]', nextLabel: 'Open monitoring',
    chat: [
      { from: 'agent', agent: 'Pipeline Testing Agent', meta: 'just now', text: '', blocks: [
        { kind: 'p', text: 'Run complete. Output written and validated against the acceptance criteria in the specification.' },
        { kind: 'ul', items: [
          '1,200 records exported',
          '87 excluded because dateOfBirth is missing',
          '1,256 excluded because dateOfBirth is on or after the cutoff',
          'All nine columns present, in order',
        ]},
      ]},
    ],
  },
  {
    n: 10, id: 'monitor', title: 'Monitor job', actor: 'you',
    gloss: 'Track job health and inspect runs after the pipeline is live.',
    suggested: 'Review the monitoring dashboard and open a job run',
    files: ['requirement', 'spec', 'pipeline', 'readme', 'test'], open: 'job', view: 'monitor',
    agent: 'Agent',
    instruct: 'The pipeline is now live. Use Akaden’s built-in dashboards to monitor its performance, review job history, and investigate individual runs. This demo uses simulated monitoring data.',
    focus: 'ed', ring: '[data-job-tabs]', nextLabel: 'Complete demo',
    chat: [{ from: 'agent', agent: 'Agent', meta: 'Demo response', text: '', blocks: [{ kind: 'p', text: 'The pipeline is live. Its built-in monitoring dashboard shows two successful runs and no failures today. Open a job to inspect its results, or return to the pipeline when an update is needed.' }] }],
  },
];

/** Runtime parameters, read from the real .pipeline file. */
export const jobParams = [
  { name: 's3BucketName', label: 'S3 Bucket Name', value: 'student-contact-bucket', required: true, type: 'text' },
  { name: 's3KeyPath', label: 'S3 Key Path', value: 'student_contacts/output.csv', required: false, type: 'text' },
  { name: 'dateOfBirthCutoff', label: 'Date of Birth Cutoff', value: '2000-01-01', required: false, type: 'text', fromSpec: true },
  { name: 'executionMode', label: 'Execution Mode', value: 'export', required: false, type: 'select', options: ['validateOnly', 'export'] },
  { name: 'batchIdentifier', label: 'Batch Identifier', value: 'batch-20260826-001', required: false, type: 'text' },
];

/** Run log, format taken from the specification's own example. */
export const runLog = [
  '[INFO] Execution started. Batch ID: batch-20260825-export-001',
  '[INFO] Parameters: s3Bucket=student-contact-bucket, s3KeyPath=student_contacts/output.csv, dateOfBirthCutoff={{CUTOFF}}, executionMode=export',
  '[INFO] Person records evaluated: 2,543',
  '[INFO] Records excluded (dateOfBirth missing): 87',
  '[INFO] Records excluded (dateOfBirth >= cutoff): 1,256',
  '[INFO] Records passed filter and eligible for output: 1,200',
  '[INFO] CSV file generated with 1,200 data rows (plus 1 header row).',
  '[INFO] CSV uploaded to S3. Key: student_contacts/output.csv. Size: 285 KB.',
  '[INFO] Upload status: SUCCESS.',
  '[INFO] Execution completed successfully.',
];

/** Output rows. Synthetic names and numbers throughout, with nothing resembling real data. */
export const outputCsv = {
  header: ['bannerid','firstName','lastName','dateofbirth','email','phone','city','address','emergencyContact'],
  rows: [
    ['BAN001','John','Smith','1985-06-15','john.smith@example.edu','555-123-4567','Boston','123 Main Street Apt 4B','Jane Smith - 555-987-6543'],
    ['BAN002','Mary','Johnson','1990-03-22','mary.j@email.com','','Portland','456 Oak Avenue Apt 201',''],
    ['BAN003','Robert','Williams','1978-11-08','','555-234-5678','Seattle','789 Pine Road','Robert Williams'],
    ['BAN004','Sarah','Brown','1995-01-14','sarah.brown@example.com','555-345-6789','Denver','321 Elm Street','Margaret Chen - 555-456-7890'],
    ['BAN005','Michael','Davis','1982-09-30','michael@contact.org','','Chicago','',''],
  ],
};

export const acceptance = [
  'Selects only records where dateOfBirth exists and is earlier than the cutoff',
  'Best-record rules applied for name, email, phone, address, emergency contact',
  'Output CSV has the exact nine columns in the exact order',
  'Missing optional values written as empty fields',
  'dateofbirth formatted as YYYY-MM-DD',
  'File uploaded to the configured S3 bucket and key/path',
  'The integration does not update Banner data',
];
