// Single source of truth for all site copy.
// Facts are taken from Faraz's resume (Nov 2026) and public LinkedIn profile.
// Phone number and reasons for leaving are intentionally not shown on the site.

export const profile = {
  name: 'Faraz Ahmad',
  firstName: 'Faraz',
  lastName: 'Ahmad',
  title: 'Senior Business Analyst',
  descriptor: ['Senior Business Analyst', 'Procurement & Spend Analytics', 'Business Intelligence'],
  location: 'Hyderabad, India',
  email: 'faraz2402@gmail.com',
  linkedin: 'https://www.linkedin.com/in/faraz-ahmad24',
  linkedinHandle: 'in/faraz-ahmad24',
  resume: './Faraz-Ahmad-Resume.pdf',
  resumeFileName: 'Faraz-Ahmad-Resume.pdf',
  portrait: './img/faraz-ahmad.jpg',
  portraitCutout: './img/faraz-ahmad-cutout-v2.webp',
  contactMailto:
    'mailto:faraz2402@gmail.com?subject=' + encodeURIComponent('Opportunity — Faraz Ahmad'),
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'work', label: 'Selected Work' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  headline: 'Turning Procurement Data Into Business Decisions.',
  copy: 'I work at the intersection of procurement, business analysis and data analytics, helping organisations improve visibility, strengthen supplier governance and make smarter commercial decisions.',
}

export const stats = [
  {
    value: 9,
    prefix: '~',
    label: 'Years of professional experience',
    context:
      'Across data, finance and procurement, in technology, SaaS and manufacturing environments.',
  },
  {
    value: 306,
    prefix: '$',
    suffix: 'M',
    label: 'Annual spend analysed',
    context:
      'One Power BI view of enterprise spend that exposed an ~$24M tail and the four categories behind ~90% of it.',
  },
  {
    value: 973,
    label: 'Suppliers in spend analytics',
    context:
      'Mapped by category and spend to surface supplier fragmentation and consolidation candidates.',
  },
  {
    value: 12,
    suffix: 'K',
    label: 'Contracts across 16K suppliers',
    context:
      'Brought into a single ownership and renewal view so contracts are flagged before they lapse.',
  },
]

export const about = {
  heading: ['Business Thinking.', 'Analytical Execution.'],
  lead: 'I came to procurement analytics through the numbers — first as a data analyst, then in accounts, then on the procurement desk of a steel manufacturing supply chain. That route shapes how I work today: I understand what a purchase order, a supplier record or a contract clause means to the people who own it, and I know how to make the data behind it tell the truth.',
  body: [
    'Over the last four years my focus has been procurement and spend analytics. At Conga I built the Power BI spend view behind $306M of annual spend and ran the vendor master and PO cycle in Salesforce and Oracle NetSuite. At Infosys I extended contract reporting for a global energy client to 12,000 contracts and 16,000 suppliers.',
    'I sit comfortably between procurement, finance, Legal and IT — gathering requirements in one room, validating the data in another, and returning with reporting that people actually use to decide.',
  ],
  strengths: [
    'Translate business requirements into analytical solutions',
    'Build reporting systems that improve procurement visibility',
    'Identify supplier fragmentation and spend concentration',
    'Improve procurement workflows and data quality',
    'Work across business, finance, IT and procurement stakeholders',
  ],
  education: [
    {
      award: 'Post Graduate Diploma in Data Science',
      school: 'Manipal Academy of Higher Education',
      years: '2018',
    },
    {
      award: 'Post Graduate Diploma in Business Management',
      school: 'La Trobe University, Melbourne',
      years: '2011 – 2013',
    },
    {
      award: 'Bachelor of Business Administration',
      school: 'Bharati Vidyapeeth University, Pune',
      years: '2006 – 2009',
    },
  ],
}

export const experience = [
  {
    company: 'Infosys',
    role: 'Senior Consultant',
    period: 'Jul 2026 – Oct 2026',
    location: 'Hyderabad, India',
    client: 'British Petroleum (BP)',
    status: 'Completed',
    points: [
      'Delivered one view of contract owners, expired contracts and contracts due within 90 days across 12K contracts and 16K suppliers to BP procurement leads, by extending an existing Power BI contract dashboard; contracts are now flagged for renewal before they lapse.',
      'Uncovered ~600 contracts (5%) with a non-employee as owner, sponsor or supplier manager, at risk of losing an owner once contractor access ends, by automating a Power Query check that matched SAP Ariba and Salesforce contract-role emails against the employee master.',
      'Restored KPI accuracy so dashboards matched source data, by correcting percentage logic in 6 DAX measures that returned wrong values under user filters and removing test and dummy records, with Claude speeding up data analysis and report drafting and every output validated against source data.',
    ],
    tools: ['Power BI', 'DAX', 'Power Query', 'SAP Ariba', 'Salesforce', 'Claude'],
  },
  {
    company: 'Conga',
    role: 'Senior Business Analyst',
    period: 'Jul 2023 – Mar 2026',
    location: 'Bengaluru, India',
    points: [
      'Exposed an ~$24M (8%) tail and showed the top 4 categories made up ~90% of $306M annual spend across 973 suppliers, by designing Conga’s Power BI spend dashboard and monthly spend and performance reports; the analysis supported 3 supplier consolidation decisions in the first 6 months and removed duplicate vendor contracts, shortening the sourcing cycle.',
      'Reduced average PO processing time from 6 to 4.8 days (20%) and master data errors by 40%, by managing vendor master upkeep (onboarding, changes, deactivation, W-9/W-8 tax and bank documents) and the full PO cycle (creation, approval, closure of aged POs) in Salesforce and Oracle NetSuite.',
      'Lowered unreviewed contract value from $18M to $13M (28%) and kept 200+ active contracts audit-ready, by reviewing software and vendor contracts monthly with Legal for compliance and risk; onboarded 60+ suppliers at 94% SLA across $12M+ in annual vendor spend with no audit findings, by coordinating setup and compliance documents with Finance, Legal and Operations.',
      'Shortened average approval time from 4.2 to 2.7 days (35%), by fixing approval hierarchy failures and running UAT for procurement workflow changes.',
      'Prevented any missed software renewals after launch, against $40K+ in unplanned auto-renewals the year before, by creating an Excel tracker for 100+ subscriptions holding contract terms, usage, renewal dates and spend.',
      'Shaped the executive choice of a future-state P2P platform (business case projected a 25% productivity gain), by leading the financial and vendor evaluation of the top 2 shortlisted vendors’ SaaS pricing, license structures and scalability, supported by Microsoft Copilot to accelerate the analysis and reporting and every output checked before sharing.',
    ],
    tools: ['Power BI', 'Oracle NetSuite', 'Salesforce', 'Excel', 'Microsoft Copilot'],
  },
  {
    company: 'Siemens',
    role: 'Procurement Consultant',
    period: 'Dec 2022 – Jul 2023',
    location: 'Bhilai, India',
    client: 'Bhilai Steel Plant, SAIL',
    points: [
      'Minimized average sourcing cycle time from 10 to 7 days (30%) across 25+ RFx events, by conducting vendor sourcing in SAP MM for a steel manufacturing supply chain and shifting orders to better-performing vendors.',
      'Raised transaction accuracy to 98.5% and reduced manual effort in PO creation and vendor management by ~35%, by streamlining purchase order creation and vendor records in SAP MM.',
      'Cut stock mismatches by 28% and freed 10+ hours a week of manual counting, by setting up a Google Sheets inventory tracker that reconciled 5,000+ SKUs against SAP records.',
    ],
    tools: ['SAP MM', 'Google Sheets'],
  },
  {
    company: 'Naalsons Engineers India',
    role: 'Accounts Assistant',
    period: 'Mar 2019 – Dec 2022',
    location: 'Bhilai, India',
    points: [
      'Kept receivables older than 60 days under 5% with 99% payment accuracy, by processing accounts receivable and payable in Tally ERP (invoicing, reconciliation, query resolution).',
      'Improved billing accuracy by 18% and cut billing disputes by 22%, by developing an Excel tracker for project expenses and receivables with follow-up reminders.',
    ],
    tools: ['Tally ERP', 'Excel'],
  },
  {
    company: 'Cartronics Technologies',
    role: 'Data Analyst',
    period: 'Jun 2016 – Dec 2017',
    location: 'Bengaluru, India',
    points: [
      'Brought reporting errors down from 12% to under 3% and processing time by 35%, by standardizing data-cleaning steps in Excel across 4 product lines.',
      'Identified weak SKUs and high-margin segments, by analyzing 18 months of sales data; the findings fed the business’s pricing revision, after which revenue from the top 3 categories rose 15% in one quarter.',
    ],
    tools: ['Excel'],
  },
]

export const expertise = [
  {
    title: 'Procurement Analytics',
    text: 'Spend analysis, category visibility, procurement performance and cost optimisation.',
    tags: ['Spend analysis', 'Tail spend', 'Category views'],
  },
  {
    title: 'Business Intelligence',
    text: 'Power BI dashboards, DAX, data modelling, KPI reporting and visual storytelling.',
    tags: ['Power BI', 'DAX', 'Power Query'],
  },
  {
    title: 'P2P / S2P Operations',
    text: 'Purchase orders, supplier onboarding, vendor governance and procurement workflows.',
    tags: ['PO cycle', 'Approvals', 'UAT'],
  },
  {
    title: 'Supplier Management',
    text: 'Supplier master data, vendor lifecycle management, supplier performance and compliance.',
    tags: ['Vendor master', 'Onboarding', 'SLAs'],
  },
  {
    title: 'Contract Analytics',
    text: 'Contract visibility, ownership tracking, lifecycle reporting and compliance monitoring.',
    tags: ['Ownership', 'Renewals', 'Compliance'],
  },
  {
    title: 'ERP & Business Systems',
    text: 'SAP MM, Oracle NetSuite, Salesforce and Ariba.',
    tags: ['SAP MM', 'NetSuite', 'Salesforce', 'Ariba'],
  },
]

export const projects = [
  {
    title: 'Enterprise Spend Analytics',
    setting: 'SaaS · Conga',
    figure: '$306M',
    figureLabel: 'annual spend across 973 suppliers',
    challenge:
      'Spend sat across hundreds of suppliers with no consolidated category view, so concentration and fragmentation were hard to see — and harder to act on.',
    approach:
      'Designed the Power BI spend dashboard and monthly spend and performance reports, classifying spend by category and supplier and isolating the tail.',
    tools: ['Power BI', 'Excel', 'Oracle NetSuite'],
    impact: [
      'Showed four categories made up ~90% of spend',
      'Exposed an ~$24M (8%) tail-spend segment',
      'Gave sourcing a clear list of supplier consolidation opportunities',
    ],
  },
  {
    title: 'Contract Visibility & Procurement Reporting',
    setting: 'Energy · Infosys engagement',
    figure: '12K',
    figureLabel: 'contracts across 16,000 suppliers',
    challenge:
      'Contract owners, expiries and upcoming renewals were difficult to see in one place, leaving contracts at risk of lapsing or losing an accountable owner.',
    approach:
      'Extended an existing Power BI contract dashboard with owner and renewal views, and automated a Power Query check of contract roles against the employee master.',
    tools: ['Power BI', 'DAX', 'Power Query'],
    impact: [
      'One view of expired contracts and renewals due within 90 days',
      'Surfaced ~600 contracts (5%) with a non-employee owner',
      'KPIs reconciled to source after six DAX measures were corrected',
    ],
  },
  {
    title: 'Procurement Process Improvement',
    setting: 'SaaS · Conga',
    figure: '20%',
    figureLabel: 'faster purchase-order processing',
    challenge:
      'Purchase orders were slowed by approval-hierarchy failures, aged POs and inconsistent supplier master data.',
    approach:
      'Took ownership of vendor master upkeep and the full PO cycle, fixed approval routing and ran UAT on workflow changes before release.',
    tools: ['Oracle NetSuite', 'Salesforce', 'Power BI'],
    impact: [
      'PO processing reduced from 6 to 4.8 days',
      'Approval turnaround reduced from 4.2 to 2.7 days',
      'Master-data errors down 40%',
    ],
  },
  {
    title: 'Inventory Analytics',
    setting: 'Manufacturing · Siemens engagement',
    figure: '5,000+',
    figureLabel: 'SKUs reconciled against SAP',
    challenge:
      'Stock was tracked manually, and recorded positions regularly disagreed with SAP — costing hours of physical counting every week.',
    approach:
      'Set up a structured Google Sheets inventory tracker reconciling stock position and movement against SAP records, with regular operational reporting.',
    tools: ['Google Sheets', 'SAP MM'],
    impact: ['28% fewer stock mismatches', '10+ hours a week of manual counting freed'],
  },
]

// Proficiency levels: 4 Core · 3 Hands-on · 2 Working knowledge · 1 Familiar
export const proficiencyScale = [
  { level: 4, label: 'Core — used daily, in depth' },
  { level: 3, label: 'Hands-on — regular production use' },
  { level: 2, label: 'Working knowledge' },
  { level: 1, label: 'Familiar' },
]

export const toolkit = [
  {
    group: 'Business Intelligence',
    items: [
      { name: 'Power BI', level: 4 },
      { name: 'DAX', level: 4 },
      { name: 'Data Modelling', level: 4 },
      { name: 'Tableau', level: 2 },
    ],
  },
  {
    group: 'Procurement & ERP',
    items: [
      { name: 'SAP MM', level: 3 },
      { name: 'Oracle NetSuite', level: 3 },
      { name: 'SAP Ariba', level: 2, note: 'contract data' },
    ],
  },
  {
    group: 'Business Systems',
    items: [
      { name: 'Salesforce', level: 3 },
      { name: 'Jira', level: 2 },
    ],
  },
  {
    group: 'Productivity & Analysis',
    items: [
      { name: 'Microsoft Excel', level: 4 },
      { name: 'Power Query', level: 4 },
      { name: 'Microsoft Copilot', level: 2 },
      { name: 'Claude', level: 2 },
      { name: 'Power Automate', level: 1 },
    ],
  },
  {
    group: 'Data Skills',
    items: [
      { name: 'Data analysis', level: 4 },
      { name: 'SQL', level: 2, note: 'fundamentals' },
    ],
  },
]

export const principles = [
  {
    title: 'Understand the business problem before building the dashboard.',
    text: 'Every report starts as a question someone needs answered — which suppliers, which contracts, which delays. I agree that question with the people who own it before I touch the data model.',
  },
  {
    title: 'Turn fragmented operational data into meaningful insights.',
    text: 'Procurement data lives in ERPs, CRMs, contract tools and spreadsheets that rarely agree. Reconciling them — and validating every figure against source — is where most of the value is.',
  },
  {
    title: 'Focus on measurable business improvements rather than attractive reports.',
    text: 'A dashboard is only useful if it changes a decision: a consolidated supplier, a renewal caught in time, a purchase order approved days sooner.',
  },
]
