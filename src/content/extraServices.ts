// Payroll, Compliance, Bookkeeping Software Support and other service lines, kept as their own typed content
// separate from the four core services (bookkeeping/accounting/taxation/
// controller) in content/services.ts. The core four drive the pricing
// builder, comparison table, and hero showcase, which all assume exactly
// those four — Payroll and Compliance are additive rather than folded into
// that union, to avoid rippling changes through components built around it.
//
// Sub-service names and structure are modeled on the industry-standard
// breakdown of these service lines (matching the site's own reference
// planning docs). Descriptions here are generic and factual about what each
// sub-service typically involves — no Juris-specific pricing, SLAs, or
// guarantees are stated, since none have been confirmed by the business.

export type ExtraServiceId =
  | "payroll"
  | "compliance"
  | "cfo-services"
  | "catch-up-bookkeeping"
  | "accounts-payable-receivable"
  | "sales-tax-compliance"
  | "bookkeeping-software-support";

export type SubService = {
  slug: string;
  name: string;
  oneLiner: string;
  body: string[];
};

export type ExtraServiceDefinition = {
  id: ExtraServiceId;
  name: string;
  shortName: string;
  oneLiner: string;
  positioning: string;
  href: string;
  includes: string[];
  outputs: string[];
  goodFor: string[];
  notIncluded: string[];
  /** Leaf services (no further breakdown) leave this empty. */
  subServices: SubService[];
};

export const extraServices: Record<ExtraServiceId, ExtraServiceDefinition> = {
  payroll: {
    id: "payroll",
    name: "Payroll Services",
    shortName: "Payroll",
    oneLiner: "Running payroll accurately and on time, with the filings and forms that go with it.",
    positioning:
      "Payroll touches employees, tax agencies, and your books all at once — a missed deposit or a late filing turns into a penalty fast. Payroll services cover the run itself, the tax deposits and filings that follow it, and the year-end forms your team and contractors need.",
    href: "/payroll",
    includes: [
      "Processing regular pay runs (weekly, biweekly, semi-monthly, or monthly)",
      "Calculating gross pay, withholdings, and net pay",
      "Direct deposit and pay statement delivery",
      "Federal and state payroll tax deposits and filings",
      "New-hire reporting",
      "W-2 preparation for employees",
      "1099 preparation for contractors",
      "Payroll journal entries posted to your books",
    ],
    outputs: [
      "Completed pay runs, on schedule",
      "Filed payroll tax returns and deposits",
      "Year-end W-2 and 1099 forms",
      "A payroll journal entry reconciled into your accounting records",
    ],
    goodFor: [
      "Businesses running payroll for employees, contractors, or both",
      "Businesses that have outgrown a DIY payroll app and want it handled",
      "Businesses that want payroll postings tied cleanly into their books",
    ],
    notIncluded: [
      "Day-to-day bookkeeping outside of the payroll journal entry (see Bookkeeping)",
      "Business or personal tax return preparation (see Taxation)",
      "HR functions such as hiring, benefits design, or employee relations",
    ],
    subServices: [
      {
        slug: "payroll-processing",
        name: "Payroll Processing",
        oneLiner:
          "Running each pay cycle — calculating gross pay, withholdings, and net pay for every employee and contractor on your schedule.",
        body: [
          "Each pay run is calculated from your recorded hours, salaries, and any bonuses or adjustments, then checked before anything is paid out.",
          "Runs can follow a weekly, biweekly, semi-monthly, or monthly schedule, and contractors can be included alongside employees in the same cycle.",
        ],
      },
      {
        slug: "direct-deposit-management",
        name: "Direct Deposit Management",
        oneLiner:
          "Setting up and managing direct deposit so employees and contractors are paid straight to their bank accounts.",
        body: [
          "Direct deposit is set up per employee, with any changes to bank details or split deposits updated ahead of the next run.",
          "Where direct deposit isn't available or wanted, alternative payment methods are coordinated on the same schedule.",
        ],
      },
      {
        slug: "employee-payroll-setup",
        name: "Employee Payroll Setup",
        oneLiner: "Getting new employees and contractors correctly set up in the payroll system from their first day.",
        body: [
          "Setup covers collecting the right tax forms (such as a W-4 or W-9), confirming pay rate and classification, and adding any benefit or retirement deductions.",
          "Correct classification at setup — employee versus contractor — is the step most likely to cause problems later if it's skipped.",
        ],
      },
      {
        slug: "payroll-tax-filing",
        name: "Payroll Tax Filing",
        oneLiner: "Calculating, depositing, and filing the federal and state payroll taxes that come with every pay run.",
        body: [
          "Payroll tax obligations include federal withholding, Social Security and Medicare, and state and local taxes, each with its own deposit schedule and filing deadlines.",
          "Filings are tracked against the deposit schedule your business is on, so deposits go out and returns are filed by their due dates.",
        ],
      },
      {
        slug: "payroll-compliance",
        name: "Payroll Compliance",
        oneLiner: "Keeping payroll aligned with the wage, hour, and reporting rules that apply to your business and its states.",
        body: [
          "Compliance covers minimum wage and overtime rules, new-hire reporting, and the state-specific registrations that come with hiring in a new location.",
          "Where a business has employees across multiple states, each state's requirements are tracked separately rather than assumed to match.",
        ],
      },
      {
        slug: "w2-preparation",
        name: "W-2 Preparation",
        oneLiner: "Preparing and issuing annual W-2 forms for every employee, based on the year's payroll records.",
        body: [
          "W-2s are prepared from the year's payroll data, checked for accuracy, and distributed to employees ahead of the filing deadline.",
          "Corrections (a W-2c) are handled the same way if an error is found after the original form has been issued.",
        ],
      },
      {
        slug: "1099-preparation",
        name: "1099 Preparation",
        oneLiner: "Preparing and issuing 1099 forms for contractors paid during the year.",
        body: [
          "1099s are prepared from payments made to each contractor during the year and issued ahead of the filing deadline.",
          "This runs alongside W-2 preparation for businesses that pay both employees and contractors.",
        ],
      },
      {
        slug: "employee-benefits-administration",
        name: "Employee Benefits Administration",
        oneLiner: "Administering payroll-linked benefit deductions — retirement contributions, health insurance, and similar programs.",
        body: [
          "Benefit deductions are set up per employee and kept in sync with your provider, so the right amount is withheld and remitted each pay period.",
          "This covers the payroll administration side of benefits; plan design and provider selection are handled with your benefits provider or broker.",
        ],
      },
    ],
  },
  compliance: {
    id: "compliance",
    name: "Compliance Services",
    shortName: "Compliance",
    oneLiner: "Keeping the registrations, filings, and records that keep your business in good standing.",
    positioning:
      "Beyond bookkeeping and tax returns, businesses carry an ongoing layer of registrations, filings, and recordkeeping that keeps them legally able to operate — from initial formation through annual reports and internal documentation. Compliance services cover that administrative layer.",
    href: "/compliance",
    includes: [
      "Business entity registration and formation support",
      "Federal EIN registration",
      "Annual report and franchise filing tracking and submission",
      "Ongoing compliance monitoring and deadline tracking",
      "Audit support and documentation preparation",
      "Internal controls review",
    ],
    outputs: [
      "Completed registrations and filings",
      "A tracked compliance calendar for recurring deadlines",
      "Documentation prepared for an audit or review",
      "A written review of internal controls and recommendations",
    ],
    goodFor: [
      "New businesses handling initial registration and setup",
      "Established businesses that need ongoing filings tracked and submitted on time",
      "Businesses preparing for an audit, financing, or ownership change",
    ],
    notIncluded: [
      "Tax return preparation and filing (see Taxation)",
      "Day-to-day bookkeeping (see Bookkeeping)",
      "Legal advice — compliance filings are administrative support, not legal representation",
    ],
    subServices: [
      {
        slug: "business-registration",
        name: "Business Registration",
        oneLiner: "Registering a new business entity with the state, including support choosing an entity type.",
        body: [
          "Registration covers filing the formation documents your state requires and confirming the business is properly recorded before it starts operating.",
          "Where the entity type (LLC, S corp, and so on) hasn't been decided yet, that decision is worked through alongside your tax preparer before filing.",
        ],
      },
      {
        slug: "ein-registration",
        name: "EIN Registration",
        oneLiner: "Obtaining a federal Employer Identification Number (EIN) for a new or restructured business.",
        body: [
          "An EIN is required to open a business bank account, run payroll, and file most business tax returns, and is typically one of the first steps after formation.",
          "This also covers obtaining a new EIN when a business restructures in a way that requires one.",
        ],
      },
      {
        slug: "annual-reports-filing",
        name: "Annual Reports Filing",
        oneLiner: "Preparing and filing the annual or biennial reports most states require to keep a business entity in good standing.",
        body: [
          "Missing an annual report deadline is one of the most common reasons a business entity is administratively dissolved by its state.",
          "Filings are prepared from your current entity information and submitted ahead of each state's deadline.",
        ],
      },
      {
        slug: "compliance-monitoring",
        name: "Compliance Monitoring",
        oneLiner: "Tracking the recurring registrations, licenses, and filing deadlines that apply to your business.",
        body: [
          "Monitoring keeps a running calendar of what's due and when, across the states and jurisdictions your business operates in.",
          "As a business grows into new states or adds licenses, those requirements are added to the same tracked calendar.",
        ],
      },
      {
        slug: "audit-support",
        name: "Audit Support",
        oneLiner: "Preparing documentation and records for a financial, tax, or regulatory audit.",
        body: [
          "Support covers organizing the records an auditor will request and being available to answer questions during the review.",
          "This is preparation and support work; it does not include representing you before a regulator or agency.",
        ],
      },
      {
        slug: "internal-controls-review",
        name: "Internal Controls Review",
        oneLiner: "Reviewing the processes and approvals around your financial records to identify gaps and recommend improvements.",
        body: [
          "A review looks at how transactions are recorded, approved, and reconciled, and where a single point of failure or missing approval creates risk.",
          "The result is a written summary of findings and specific, practical recommendations — not a certified audit opinion.",
        ],
      },
    ],
  },
  "cfo-services": {
    id: "cfo-services",
    name: "Outsourced CFO Services",
    shortName: "CFO Services",
    oneLiner: "Forward-looking financial strategy — forecasting, planning, and decision support — without a full-time hire.",
    positioning:
      "Where Controller Services keep the accounting function running accurately, CFO services focus forward: cash forecasting, budgeting, and the financial judgment calls that shape where the business is headed next.",
    href: "/cfo-services",
    includes: [
      "Cash flow forecasting and scenario planning",
      "Annual budgeting and variance reporting against actuals",
      "Pricing and margin analysis",
      "Board, investor, or lender reporting packages",
      "Financial planning support for hiring, growth, or major purchases",
      "Fundraising or financing readiness support",
    ],
    outputs: [
      "A rolling cash flow forecast",
      "An annual budget with regular variance reports",
      "Board or lender-ready reporting packages",
      "Written recommendations tied to specific financial decisions",
    ],
    goodFor: [
      "Growing businesses making decisions that need forward-looking financial input",
      "Companies preparing for a fundraise, financing, or major transition",
      "Businesses that need senior financial judgment without a full-time CFO salary",
    ],
    notIncluded: [
      "Day-to-day accounting oversight and close (see Outsourced Controller Services)",
      "Bookkeeping or tax return preparation (see Bookkeeping and Taxation)",
      "Legal, investment, or audit assurance advice",
    ],
    subServices: [],
  },
  "catch-up-bookkeeping": {
    id: "catch-up-bookkeeping",
    name: "Catch-Up Bookkeeping",
    shortName: "Catch-Up Bookkeeping",
    oneLiner: "Bringing books that have fallen behind — weeks, months, or longer — back up to date and reconciled.",
    positioning:
      "Falling behind on bookkeeping is common and it compounds: each unreconciled month makes the next one harder to trust. Catch-up bookkeeping treats the backlog as its own project, rebuilding and reconciling records so your books are current and ready for tax filing or ongoing service.",
    href: "/catch-up-bookkeeping",
    includes: [
      "Reviewing and organizing all outstanding transactions and statements",
      "Reconciling every bank, card, and processor account for the backlog period",
      "Rebuilding or correcting the chart of accounts where needed",
      "Identifying and flagging missing income or unrecorded expenses",
      "Bringing books current through the present date",
      "Handoff to ongoing monthly bookkeeping once caught up",
    ],
    outputs: [
      "A reconciled set of books covering the full backlog period",
      "A written summary of what was found and corrected",
      "Books ready for tax preparation or an accountant's review",
    ],
    goodFor: [
      "Businesses behind on bookkeeping by a month or more",
      "Businesses that need clean books before filing a return",
      "Anyone switching bookkeepers where the prior file wasn't kept current",
    ],
    notIncluded: [
      "Ongoing monthly bookkeeping after the catch-up is complete (see Bookkeeping)",
      "Tax return preparation and filing (see Taxation)",
      "Legal advice on prior-period errors or amended filings",
    ],
    subServices: [],
  },
  "accounts-payable-receivable": {
    id: "accounts-payable-receivable",
    name: "Accounts Payable & Receivable Management",
    shortName: "AP/AR Management",
    oneLiner: "Keeping what you owe and what's owed to you tracked, current, and reconciled.",
    positioning:
      "Accounts payable and receivable are where cash flow problems usually start — bills paid late, or invoices that never get followed up on. Dedicated AP/AR management keeps both sides tracked and moving.",
    href: "/accounts-payable-receivable",
    includes: [
      "Recording and tracking vendor bills and payment due dates",
      "Coordinating bill payments on a regular schedule",
      "Issuing customer invoices and tracking payment status",
      "Following up on overdue invoices",
      "Reconciling AP and AR balances against your books",
      "Reporting on outstanding payables and receivables",
    ],
    outputs: [
      "An up-to-date accounts payable aging report",
      "An up-to-date accounts receivable aging report",
      "Vendor bills tracked and paid on schedule",
      "Customer invoices tracked through to payment",
    ],
    goodFor: [
      "Businesses with a meaningful volume of vendor bills or customer invoices",
      "Businesses that need collections followed up on consistently",
      "Anyone who wants payables and receivables managed separately from general bookkeeping",
    ],
    notIncluded: [
      "General transaction recording outside of AP/AR (see Bookkeeping)",
      "Collections involving legal action or third-party collection agencies",
      "Extending credit decisions — those remain the business owner's call",
    ],
    subServices: [],
  },
  "sales-tax-compliance": {
    id: "sales-tax-compliance",
    name: "Sales Tax Compliance",
    shortName: "Sales Tax Compliance",
    oneLiner: "Registration, calculation, and filing for sales tax across the states you collect in.",
    positioning:
      "Sales tax obligations follow where your customers are, not just where your business is based — a rule that catches most businesses selling across state lines by surprise. Sales tax compliance keeps registrations, calculations, and filings current across every state you owe in.",
    href: "/sales-tax-compliance",
    includes: [
      "Nexus review to identify where you have a sales tax filing obligation",
      "Sales tax registration in applicable states",
      "Ongoing calculation of sales tax due by state and jurisdiction",
      "Preparing and filing sales tax returns on each state's schedule",
      "Reconciling sales tax collected against amounts remitted",
      "Monitoring for new nexus as the business grows into new states",
    ],
    outputs: [
      "Sales tax registrations completed in the states you owe in",
      "Filed sales tax returns, on schedule",
      "A reconciled record of tax collected versus remitted",
    ],
    goodFor: [
      "E-commerce and multi-state businesses collecting sales tax",
      "Businesses unsure where they currently have a filing obligation",
      "Businesses that have grown into new states and need nexus reassessed",
    ],
    notIncluded: [
      "Income tax return preparation (see Taxation)",
      "Bookkeeping for non-sales-tax transactions (see Bookkeeping)",
      "Legal representation in a sales tax audit or dispute",
    ],
    subServices: [],
  },
  "bookkeeping-software-support": {
    id: "bookkeeping-software-support",
    name: "Bookkeeping Software Support",
    shortName: "Software Support",
    oneLiner: "Setting up, cleaning up, and moving the accounting software your books run on.",
    positioning:
      "Clean books depend on a correctly configured file. When QuickBooks Online is set up in a hurry, bank feeds post to the wrong accounts, or data is stuck in an old system, every report built on top of it inherits the problem. Bookkeeping software support gets the system itself right — so the bookkeeping that runs inside it can be trusted.",
    href: "/bookkeeping-software-support",
    includes: [
      "QuickBooks Online setup for new or restarting businesses",
      "QBO cleanup of miscategorized, duplicated, or unreconciled activity",
      "Chart of accounts design and restructuring",
      "Bank and credit card feed connection and categorization rules",
      "Migration from another accounting system or spreadsheets",
      "Handoff to ongoing monthly bookkeeping once the file is sound",
    ],
    outputs: [
      "A correctly configured accounting file",
      "A chart of accounts structured around how your business reports",
      "Connected bank feeds with categorization rules in place",
      "A written summary of what was set up, corrected, or migrated",
    ],
    goodFor: [
      "New businesses starting on QuickBooks Online",
      "Businesses whose existing QBO file has become unreliable",
      "Anyone moving off desktop software, another platform, or spreadsheets",
    ],
    notIncluded: [
      "Ongoing monthly bookkeeping after setup (see Bookkeeping)",
      "Reconstructing months of missing records (see Catch-Up Bookkeeping)",
      "Software subscription fees, which are billed by the software provider",
    ],
    subServices: [
      {
        slug: "quickbooks-online-setup",
        name: "QuickBooks Online Setup",
        oneLiner: "Configuring a new QuickBooks Online file correctly from the start.",
        body: [
          "Setup covers company settings, users and permissions, sales tax settings where they apply, products and services, and the preferences that control how transactions are recorded.",
          "Getting these right at the start avoids the rework that comes from fixing a file after months of transactions have been recorded against the wrong settings.",
        ],
      },
      {
        slug: "qbo-cleanup",
        name: "QBO Cleanup",
        oneLiner: "Correcting an existing QuickBooks Online file so its reports can be trusted again.",
        body: [
          "Cleanup identifies and fixes miscategorized transactions, duplicates, unapplied payments, stale open items, and accounts that no longer reconcile.",
          "The result is a file whose balances tie back to your bank and card statements, ready for ongoing bookkeeping or tax preparation.",
        ],
      },
      {
        slug: "chart-of-accounts-setup",
        name: "Chart of Accounts Setup",
        oneLiner: "Designing or restructuring the chart of accounts around how your business actually reports.",
        body: [
          "The chart of accounts decides how every transaction is grouped, and therefore what your profit and loss and balance sheet can tell you.",
          "Setup builds a structure that fits your industry and reporting needs, and restructuring merges or retires accounts that have grown cluttered over time.",
        ],
      },
      {
        slug: "bank-feed-setup",
        name: "Bank-Feed Setup",
        oneLiner: "Connecting bank and card accounts and setting rules so transactions land in the right place.",
        body: [
          "Bank feeds bring transactions into the accounting file automatically; categorization rules decide where recurring transactions are recorded.",
          "Well-configured feeds cut manual entry, and well-written rules keep routine activity consistent month to month.",
        ],
      },
      {
        slug: "accounting-software-migration",
        name: "Accounting Software Migration",
        oneLiner: "Moving your books from another accounting system or spreadsheets into a new platform.",
        body: [
          "Migration covers mapping your existing accounts, bringing over opening balances and the history you need, and confirming balances match between the old and new systems.",
          "A clear cutover date keeps records complete, with nothing recorded twice or lost between systems.",
        ],
      },
    ],
  },
};

export const extraServiceList: ExtraServiceDefinition[] = Object.values(extraServices);
