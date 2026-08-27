/**
 * Mock IDE demo — hard-coded state machine for the Akaden SDLC walkthrough.
 *
 * This is the WEBSITE, not the app. Every response here is pre-written. The file
 * contents, prompts, agent names, and validation warnings are real and come from
 * an actual run; the surrounding chrome is a simplified reconstruction.
 *
 * To add functionality: each step is one object. Add a `toolbar` action, a
 * `chat` message, or a new `view` and it appears. Nothing else needs touching.
 */

export type Actor = 'you' | 'agent' | 'system';
export type ViewKind = 'empty' | 'markdown' | 'pipeline' | 'params' | 'run';

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
  /** Shown in the "Suggested next" bar. */
  suggested: string;
  /** Files that exist in the explorer by this step. */
  files: string[];
  /** File opened in the editor when the step is selected. */
  open: string | null;
  view: ViewKind;
  chat: ChatMsg[];
  /** Agent shown in the composer picker. */
  agent: string;
  /** Buttons in the editor toolbar. Same action as Next — the product's own control. */
  toolbar?: { label: string; kind: 'primary' | 'ghost'; action: string }[];
  /** Plain-language account of what just happened. Shown in the guide bar. */
  instruct: string;
  /** Which pane the action is in. Everything else dims. */
  focus: 'side' | 'ed' | 'chat';
  /** The control worth looking at. Gets a ring. */
  ring: string;
  /** Label on the Next button — it names the action it performs. */
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

export const FILES: Record<string, { folder: string; name: string; kind: 'md' | 'pipeline' }> = {
  requirement: { folder: 'inputs', name: 'student-records-specification.md', kind: 'md' },
  spec: { folder: 'specifications', name: 'alumni-contact-export-spec.md', kind: 'md' },
  readme: { folder: 'pipelines', name: 'ALUMNI_CONTACT_EXPORT_README.md', kind: 'md' },
  pipeline: { folder: 'pipelines', name: 'alumni-contact-export.pipeline', kind: 'pipeline' },
};

export const FOLDERS = ['inputs', 'pipelines', 'specifications', 'sub-pipelines', 'validation'];

export const steps: Step[] = [
  {
    n: 1, id: 'prepare', title: 'Prepare workspace', actor: 'you',
    gloss: 'You drop the requirement in. Nothing is generated yet.',
    suggested: 'Build specification — ask the Specification Builder Agent',
    files: ['requirement'], open: null, view: 'empty', agent: 'Agent',
    chat: [],
    instruct: "Advancement sent over their requirement and it's in your inputs folder. That is the whole setup.",
    focus: 'side',
    ring: '[data-file="requirement"]',
    nextLabel: 'Build the specification',
    toolbar: [],
  },
  {
    n: 2, id: 'build-spec', title: 'Build specification', actor: 'agent',
    gloss: 'The Specification Builder Agent reads the requirement and drafts a spec.',
    suggested: 'Review specification — read the draft, then approve',
    files: ['requirement'], open: 'requirement', view: 'markdown',
    agent: 'Specification Builder Agent',
    toolbar: [],
    instruct: 'You asked the Specification Builder Agent for a spec. It read the requirement and wrote one.',
    focus: 'chat',
    ring: '[data-agent-btn]',
    nextLabel: 'Read the specification',
    chat: [
      { from: 'you', text: 'Review the files in inputs/ and help me draft the integration specification.' },
      {
        from: 'agent', agent: 'Specification Builder Agent', meta: 'Anthropic Claude Haiku 4.5 · just now',
        text: '', blocks: [
          { kind: 'p', text: "I've read the Alumni Contact Export requirement in `inputs/`. Drafting the integration specification now." },
          { kind: 'h', text: 'What I extracted' },
          { kind: 'ul', items: [
            'Source: Ellucian Banner SaaS via Ethos APIs — no direct database access',
            'Filter: dateOfBirth exists AND is earlier than 2000-01-01',
            'Best-record rules for name, email, phone, address, emergency contact',
            'Output: output.csv, nine columns in a fixed order, uploaded to S3',
          ]},
          { kind: 'h', text: 'Constraints carried through' },
          { kind: 'ul', items: [
            'The integration must not update Banner data',
            'It must not rely on direct database access or direct Banner table reads',
          ]},
          { kind: 'p', text: 'Written to `/specifications/alumni-contact-export-spec.md` — 34 test cases and an acceptance checklist included.' },
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
    instruct: 'This one is yours. Read it, change anything you want — nothing gets built until you approve it.',
    focus: 'ed',
    ring: '.tb-btn',
    nextLabel: 'Approve specification',
    chat: [
      {
        from: 'agent', agent: 'Specification QA Agent', meta: 'Anthropic Claude Haiku 4.5 · just now',
        text: '', blocks: [
          { kind: 'p', text: 'Specification is complete and internally consistent. Two things worth your eyes before approval:' },
          { kind: 'ol', items: [
            'Name selection order — preferred, then legal/official, then any available. This is an institutional decision, not a technical one.',
            'Priority direction — the spec assumes the lowest numeric priority wins. If Banner returns it the other way round, the selection logic inverts.',
          ]},
          { kind: 'p', text: 'Nothing is generated until you approve.' },
        ],
      },
    ],
  },
  {
    n: 4, id: 'generate', title: 'Generate / Implement', actor: 'agent',
    gloss: 'The Pipeline Builder Agent turns the approved spec into a real pipeline.',
    suggested: 'Refine — review the validation warnings',
    files: ['requirement', 'spec', 'pipeline', 'readme'], open: 'pipeline', view: 'pipeline',
    agent: 'Pipeline Builder Agent',
    toolbar: [],
    instruct: 'The Pipeline Builder Agent turned your approved spec into a working pipeline. 39 segments.',
    focus: 'ed',
    ring: '[data-agent-btn]',
    nextLabel: 'See what QA found',
    chat: [
      { from: 'you', text: 'Generate the pipeline (.pipeline) from the ready specification in specifications/. Save the artifact under the project.' },
      {
        from: 'agent', agent: 'Pipeline Builder Agent', meta: 'Anthropic Claude Haiku 4.5 · just now',
        text: '', blocks: [
          { kind: 'p', text: 'Generated `alumni-contact-export.pipeline` from the approved specification, using the v3.1Outbound template.' },
          { kind: 'ul', items: [
            '39 segments in run order',
            '25 pipeline parameters',
            '7 Ethos API calls — persons, names, emails, phones, addresses, emergency-contacts',
            '18 JavaScript transforms including the best-record selection rules',
          ]},
          { kind: 'p', text: 'Saved to `/pipelines/`. Documentation written alongside it.' },
        ],
      },
    ],
  },
  {
    n: 5, id: 'refine', title: 'Refine', actor: 'agent',
    gloss: 'QA checks the generated pipeline. Warnings are surfaced, not hidden.',
    suggested: 'Deploy — open a file or pick an SDLC step',
    files: ['requirement', 'spec', 'pipeline', 'readme'], open: 'readme', view: 'markdown',
    agent: 'Pipeline QA Agent',
    toolbar: [],
    instruct: 'QA checked it and flagged five warnings on endpoint names. Expected — and shown to you rather than hidden.',
    focus: 'chat',
    ring: '[data-thread]',
    nextLabel: 'Deploy it',
    chat: [
      {
        from: 'agent', agent: 'Pipeline QA Agent', meta: 'Anthropic Claude Haiku 4.5 · 53 minutes ago',
        text: '', blocks: [
          { kind: 'p', text: '**Pipeline is valid** with 5 warnings (expected):' },
          { kind: 'p', text: 'Warnings are on API endpoint names (`names`, `emails`, `phones`) — these are expected to be either:' },
          { kind: 'ul', items: [
            'SPEC APIs that need to be created, or',
            'Actual endpoint names that differ from the assumed names',
          ]},
          { kind: 'p', text: '**Resolution:** During implementation, confirm actual Ethos API names and update resource definitions accordingly. The business logic and structure are complete and correct.' },
          { kind: 'h', text: '📕 Documentation' },
          { kind: 'p', text: 'Created `/pipelines/ALUMNI_CONTACT_EXPORT_README.md` with:' },
          { kind: 'ul', items: [
            'Pipeline overview and parameter guide',
            'Detailed business logic description',
            'Best-record selection rule documentation',
            'CSV output format examples',
            'Operational logging details',
            'Troubleshooting guide',
            'Next steps for testing and deployment',
          ]},
          { kind: 'h', text: '🚀 Ready For' },
          { kind: 'ol', items: [
            '**API endpoint verification** — Confirm exact Ethos API names for Banner contact data',
            '**Test execution** — Run against test Banner records with known contact data variations',
            '**Parameter testing** — Validate filter logic with different dateOfBirthCutoff values',
            '**S3 integration** — Test S3 bucket connectivity and conditional upload behavior',
            '**Performance baseline** — Measure extraction and upload times for production planning',
          ]},
          { kind: 'p', text: 'The pipeline is fully functional and grounded in the specification. All business requirements are implemented with proper loop gating, best-record logic, and error handling.' },
        ],
      },
    ],
  },
  {
    n: 6, id: 'deploy', title: 'Deploy', actor: 'system',
    gloss: 'The pipeline goes to your Ellucian Integration Designer tenant.',
    suggested: 'Publish — make the pipeline runnable',
    files: ['requirement', 'spec', 'pipeline', 'readme'], open: 'pipeline', view: 'pipeline',
    agent: 'Pipeline Builder Agent',
    instruct: 'Deployed to your Ellucian Integration Designer tenant — this artifact is what went out.',
    focus: 'ed', ring: '.pl-head', nextLabel: 'Publish it',
    chat: [
      { from: 'agent', agent: 'Pipeline Builder Agent', meta: 'just now', text: '', blocks: [
        { kind: 'p', text: 'Ready to deploy `Alumni Contact Export` to the Ellucian Integration Designer tenant.' },
      ]},
    ],
  },
  {
    n: 7, id: 'publish', title: 'Publish', actor: 'system',
    gloss: 'Published, so it can be scheduled and run as a job.',
    suggested: 'Set job parameters — S3 target and cutoff date',
    files: ['requirement', 'spec', 'pipeline', 'readme'], open: 'pipeline', view: 'pipeline',
    agent: 'Pipeline Builder Agent',
    instruct: 'Published, so it can be scheduled and run as a job by whoever owns the schedule.',
    focus: 'ed', ring: '.pl-list', nextLabel: 'Set job parameters',
    chat: [
      { from: 'agent', agent: 'Pipeline Builder Agent', meta: 'just now', text: '', blocks: [
        { kind: 'p', text: 'Deployed. Publishing makes the pipeline available as a runnable job in the tenant.' },
      ]},
    ],
  },
  {
    n: 8, id: 'params', title: 'Set job parameters', actor: 'you',
    gloss: 'The runtime values. The cutoff here is the one from your specification.',
    suggested: 'Job run and validate — run it and check the criteria',
    files: ['requirement', 'spec', 'pipeline', 'readme'], open: null, view: 'params',
    agent: 'Agent',
    instruct: 'Every value is filled in already. Change the cutoff date if you like — you will see it again in a second.',
    focus: 'ed', ring: '[data-param="dateOfBirthCutoff"]', nextLabel: 'Run the job',
    chat: [
      { from: 'agent', agent: 'Agent', meta: 'just now', text: '', blocks: [
        { kind: 'p', text: 'Five runtime parameters come from the specification. `s3BucketName` is the only required one without a default.' },
      ]},
    ],
  },
  {
    n: 9, id: 'run', title: 'Job run and validate', actor: 'system',
    gloss: 'It runs. The output is checked against the criteria written in the spec.',
    suggested: 'Done — the spec that built this is still in git',
    files: ['requirement', 'spec', 'pipeline', 'readme'], open: null, view: 'run',
    agent: 'Pipeline Testing Agent',
    instruct: '1,200 records exported and checked against the acceptance criteria in the spec. The spec is still in git, ready for the next change.',
    focus: 'ed', ring: '[data-log]', nextLabel: 'Start over',
    chat: [
      { from: 'agent', agent: 'Pipeline Testing Agent', meta: 'just now', text: '', blocks: [
        { kind: 'p', text: 'Run complete. Output written and validated against the acceptance criteria in the specification.' },
        { kind: 'ul', items: [
          '1,200 records exported',
          '87 excluded — dateOfBirth missing',
          '1,256 excluded — dateOfBirth on or after the cutoff',
          'All nine columns present, in order',
        ]},
      ]},
    ],
  },
];

/** Runtime parameters, read from the real .pipeline file. */
export const jobParams = [
  { name: 's3BucketName', label: 'S3 Bucket Name', value: 'alumni-export-bucket', required: true, type: 'text' },
  { name: 's3KeyPath', label: 'S3 Key Path', value: 'alumni_exports/output.csv', required: false, type: 'text' },
  { name: 'dateOfBirthCutoff', label: 'Date of Birth Cutoff', value: '2000-01-01', required: false, type: 'text', fromSpec: true },
  { name: 'executionMode', label: 'Execution Mode', value: 'export', required: false, type: 'select', options: ['validateOnly', 'export'] },
  { name: 'batchIdentifier', label: 'Batch Identifier', value: 'batch-20260826-001', required: false, type: 'text' },
];

/** Run log, format taken from the specification's own example. */
export const runLog = [
  '[INFO] Execution started. Batch ID: batch-20260825-export-001',
  '[INFO] Parameters: s3Bucket=alumni-export-bucket, s3KeyPath=alumni_exports/output.csv, dateOfBirthCutoff={{CUTOFF}}, executionMode=export',
  '[INFO] Person records evaluated: 2,543',
  '[INFO] Records excluded (dateOfBirth missing): 87',
  '[INFO] Records excluded (dateOfBirth >= cutoff): 1,256',
  '[INFO] Records passed filter and eligible for output: 1,200',
  '[INFO] CSV file generated with 1,200 data rows (plus 1 header row).',
  '[INFO] CSV uploaded to S3. Key: alumni_exports/output.csv. Size: 285 KB.',
  '[INFO] Upload status: SUCCESS.',
  '[INFO] Execution completed successfully.',
];

/** Output rows. Synthetic names and numbers throughout — nothing resembling real data. */
export const outputCsv = {
  header: ['bannerid','firstName','lastName','dateofbirth','email','phone','city','address','emergencyContact'],
  rows: [
    ['BAN001','John','Smith','1985-06-15','john.smith@alumni.edu','555-123-4567','Boston','123 Main Street Apt 4B','Jane Smith - 555-987-6543'],
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
