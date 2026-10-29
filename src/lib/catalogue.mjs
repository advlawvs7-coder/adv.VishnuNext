/** Independently written demonstration data; aligned to the reference site's NAVIGATION COVERAGE, not its protected text. */
export const menuGroups = [
  {
    label: "NRI & Property",
    links: [
      ["NRI Property Lawyer", "nri-property-lawyer-india"],
      ["NRI Legal Services", "nri-legal-services"],
      ["Real Estate & Title Search", "real-estate-title-search"],
      ["Property Lawyer", "property-lawyer-delhi"],
    ],
  },
  {
    label: "Family & Matrimonial",
    links: [
      ["Divorce Lawyer", "divorce-lawyer-india"],
      ["Matrimonial Disputes & Custody", "matrimonial-disputes-child-custody"],
      ["Prenuptial Agreements", "prenuptial-agreements"],
      ["Adoption (Inter-country & Domestic)", "adoption-intercountry-domestic"],
      ["Surrogacy Law", "surrogacy-law-india"],
    ],
  },
  {
    label: "Immigration & Visa",
    links: [
      ["Immigration, OCI/PIO & Citizenship", "immigration-oci-citizenship"],
      ["Visa Refusal Lawyer", "visa-refusal-lawyer"],
      ["US Visa Refusal", "us-visa-refusal"],
      ["UK Visa Refusal Appeal", "uk-visa-refusal-appeal"],
    ],
  },
  {
    label: "Courts & Criminal",
    links: [
      ["Delhi High Court Lawyer", "delhi-high-court-lawyer"],
      ["Criminal Lawyer & Bail", "criminal-lawyer-bail"],
      ["Arbitration & Litigation", "arbitration-litigation"],
    ],
  },
  {
    label: "Additional Areas",
    links: [
      ["Medical Negligence", "medical-negligence"],
      ["Corporate & NCLT", "corporate-nclt"],
      ["Banking & Finance", "banking-finance"],
    ],
  },
];
export const generalPracticeNames = [
  "Adoptions Inter-Country",
  "Domestic Adoptions",
  "Succession Certificate",
  "Real Estate Services",
  "NCLT Matters",
  "Transfer of Property",
  "Landlord Tenant Dispute",
  "Partition of Property",
  "Tax Matters",
  "Prenuptial Agreement",
  "Builder / Developer Claims",
  "Criminal Litigation and Bail",
  "Immigration Laws",
  "Citizenship & Immigration",
  "Divorce and Family Laws",
  "NRI Laws / NRI Lawyers",
  "International Child Abduction",
  "Medical Negligence",
  "OCI / PIO Card Assistance",
  "International Arbitration",
  "Foreigners Registration",
  "Business and Corporate Laws",
  "Will & Fraudulent Documents",
  "Title Documents Search",
  "Surrogacy Law",
  "Banking / Finance Matters",
  "Child Custody Matters",
  "Litigation Matters",
  "Inter-Country Matrimonial Laws",
  "Liaison Tasks",
  "India Visa Assistance",
];
export const specificPracticeNames = [
  "Administrative Law",
  "Adoption (International & Domestic)",
  "Agricultural Law (Land Acquisition)",
  "Alimony (Divorce & Post Divorce)",
  "Animal Law (Cruelty Cases)",
  "Appellate Practice",
  "Arbitration (International & Domestic)",
  "Assault (Mental & Physical)",
  "Asset Protection",
  "Banking & Finance",
  "Banking Law",
  "Business Litigation",
  "Business Law",
  "Battery",
  "Child Abuse",
  "Child Support & Custody",
  "Child Visitation",
  "Civil Litigation",
  "Constitutional Law",
  "Construction Law",
  "Consumer Law",
  "Contracts",
  "Copyright",
  "Credit & Mortgage",
  "Criminal Defense",
  "Criminal Law",
  "Murder",
  "Naturalization & Citizenship",
  "Negligence",
  "Nonprofit Organizations",
  "Patents",
  "Personal Property",
  "Pre-nuptial Agreements",
  "Probate",
  "Professional Liability",
  "Project Finance",
  "Property Law",
  "Property Management",
  "Public Finance",
  "Debt Relief",
  "Debtor & Creditor",
  "Defamation, Libel & Slander",
  "Divorce (Foreign & Indian)",
  "Domestic Violence",
  "Education Law",
  "Environmental Law",
  "Estate & Trust",
  "Extradition",
  "Family Law",
  "Finance",
  "General Practice",
  "Government Contracts",
  "Information Technology",
  "Informed Consent",
  "Inheritance Law",
  "Intellectual Property",
  "International Arbitration",
  "International Trade",
  "Landlord & Tenant Law",
  "Islamic Law",
  "Litigation",
  "Mass Tort",
  "Medical Law",
  "Medical Malpractice",
  "Motor Vehicle Accidents",
  "Rape (Legal Support)",
  "Real Estate",
  "Securities",
  "Separation",
  "Torts",
  "Trade",
  "Trade Investment",
  "Trade Secrets",
  "Trademark",
  "Weapon Laws",
  "Will",
  "Workers Compensation",
  "Wrongful Termination",
];
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const topicDetails = {
  "nri-property-lawyer-india": [
    "Review of inheritance papers, property title, possession concerns and authority given through powers of attorney.",
    "Title deeds, previous conveyances, tax records, PoA copies, correspondence, identity and residence documents.",
  ],
  "real-estate-title-search": [
    "Due diligence on ownership records, encumbrances, municipal entries, possession and proposed sale conditions.",
    "Property particulars, ownership chain, proposed agreement, mutation documents, revenue records and relevant court notices.",
  ],
  "divorce-lawyer-india": [
    "Mutual-consent and contested divorce questions, settlement provisions, maintenance and child-related issues.",
    "Marriage records, chronology, relevant communications, income information, prior legal notices and orders.",
  ],
  "matrimonial-disputes-child-custody": [
    "Matrimonial disputes, child welfare considerations, guardianship, maintenance and parenting arrangements.",
    "Family chronology, child-related records, existing orders, communication records and financial information.",
  ],
  "prenuptial-agreements": [
    "Discussion of proposed pre-marital arrangements and their enforceability under the applicable Indian legal framework.",
    "Proposed terms, disclosure details, family-law context and relevant foreign-jurisdiction documents.",
  ],
  "adoption-intercountry-domestic": [
    "Understanding the applicable adoption authority, eligibility requirements, documentation and procedural safeguards.",
    "Identity, marital status, residence, eligibility and other records required by the competent authority.",
  ],
  "surrogacy-law-india": [
    "General eligibility and procedural questions involving assisted reproduction and surrogacy legislation.",
    "Medical and eligibility records, clinic communications and documentation requested by relevant authorities.",
  ],
  "immigration-oci-citizenship": [
    "Indian immigration, OCI and citizenship-related administrative questions within the limits of applicable law.",
    "Passport, travel history, immigration correspondence, OCI details and authority notices.",
  ],
  "visa-refusal-lawyer": [
    "Reviewing refusal notices and understanding appeal or reconsideration procedures where permitted.",
    "Complete refusal decision, application copy, supporting records and relevant deadlines.",
  ],
  "us-visa-refusal": [
    "Understanding US visa refusal grounds and identifying when specialist US-licensed immigration counsel is necessary.",
    "Refusal letter, visa type, application copy and correspondence with the relevant mission.",
  ],
  "uk-visa-refusal-appeal": [
    "Understanding UK immigration refusal notices and possible procedural options with suitably qualified UK counsel.",
    "Decision letter, visa category, supporting submissions, refusal reasons and deadline details.",
  ],
  "delhi-high-court-lawyer": [
    "Writ proceedings, civil and criminal appeals, interim relief and matters within the Court’s jurisdiction.",
    "Impugned orders, pleadings, annexures, chronology, lower-court records and relevant correspondence.",
  ],
  "arbitration-litigation": [
    "Commercial claims, contractual disputes, arbitration clauses and available dispute-resolution paths.",
    "Executed contracts, arbitration clause, invoices, notices, payment records and communication history.",
  ],
  "medical-negligence": [
    "Review of alleged treatment failures, medical records and the evidence ordinarily needed before deciding legal steps.",
    "Medical records, prescriptions, discharge documents, bills and independent medical observations where available.",
  ],
  "corporate-nclt": [
    "Corporate disputes, company law issues, NCLT procedures and insolvency-related questions.",
    "Company filings, board resolutions, financial records, contracts, notices and tribunal papers.",
  ],
  "banking-finance": [
    "Banking disputes, contractual obligations, lender correspondence and related legal proceedings.",
    "Loan agreements, bank communications, statements, notices and payment confirmations.",
  ],
};
const headerBlurb =
  "This demonstration page gives an overview of the subject. Legal options depend on the individual facts, forum, governing legislation and current procedure. The draft must be reviewed before publication.";
function contentFor(title, slug, category) {
  const [scope, docs] = topicDetails[slug] || [
    `Questions relating to ${title.toLowerCase()}, including rights, duties, documentation, applicable forums and dispute-resolution options.`,
    `Agreements, official correspondence, transaction or family records, any court or authority orders, identity details and a clear chronology of events.`,
  ];
  return {
    title,
    slug,
    category,
    summary: scope,
    icon: category.includes("Property")
      ? "building-2"
      : category.includes("Family")
        ? "heart-handshake"
        : category.includes("Immigration")
          ? "globe"
          : category.includes("Courts")
            ? "scale"
            : "briefcase-business",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=75",
    published: true,
    featured: menuGroups.some((g) => g.links.some(([, s]) => s === slug)),
    seoTitle: `${title} | Advocate Vishnu Sharma`,
    seoDescription: `Legal information about ${title.toLowerCase()} and consultation enquiries in Delhi, India.`,
    content: `## Understanding ${title}\n\n${scope}\n\n${headerBlurb}\n\n## Common situations and legal questions\n\nA consultation may help identify the nature of the dispute, determine which law applies, assess urgency and limitation periods, and understand the roles of courts, tribunals or administrative authorities. Some cases may call for an interim application, formal reply, notice or appeal. These options are never automatic.\n\n## Records to prepare\n\n${docs}\n\nA clear chronological note explaining the key dates and the relief sought can make an initial review more focused. Avoid uploading sensitive or privileged material before a secure consultation and conflict check.\n\n## How the matter is assessed\n\nThe first step is to check jurisdiction and the governing procedure. Next, documents and events are reviewed, potential remedies and litigation risks are explained, and practical next steps are discussed. The circumstances may also call for negotiation, mediation or another dispute-resolution method.\n\n## Request a consultation\n\nUse the enquiry form to describe the broad subject. No result, timeline or acceptance of representation is guaranteed by this sample page.`,
  };
}
export const menuServices = menuGroups.flatMap((g) =>
  g.links.map(([title, slug]) => contentFor(title, slug, g.label)),
);
const existingSlugs = new Set(menuServices.map((s) => s.slug));
function addName(list, category) {
  return list
    .map((n) => contentFor(n, slug(n), category))
    .filter((s) => !existingSlugs.has(s.slug));
}
export const catalogueServices = [
  ...menuServices,
  ...addName(generalPracticeNames, "General Legal Services"),
  ...addName(specificPracticeNames, "Specific Legal Services"),
]
  .filter((s, i, a) => a.findIndex((x) => x.slug === s.slug) === i)
  .map((s, i) => ({ ...s, order: i + 1 }));
export const suggestedBlogTitles = [
  ["What to Check Before Buying Property in Delhi", "Property Law"],
  ["NRI Property Inheritance in India: A Starter Guide", "NRI Legal"],
  ["What Happens When a Family Property Is Jointly Owned?", "Property Law"],
  ["Understanding Mutual Consent Divorce in India", "Family Law"],
  ["Child Custody: How Courts Consider Welfare", "Family Law"],
  ["What Should You Do After Receiving a Legal Notice?", "Civil Law"],
  ["Cheque Bounce: Initial Steps and Documents", "Banking Law"],
  ["Bail Applications: Practical Questions", "Criminal Law"],
  ["Online Fraud Complaint: Preserve Evidence First", "Cyber Law"],
  ["Power of Attorney for NRIs: Common Precautions", "NRI Legal"],
  ["Understanding a Property Title Search", "Property Law"],
  ["How a Commercial Arbitration Clause Works", "Commercial Law"],
  ["Maintenance Questions in Matrimonial Disputes", "Family Law"],
  ["When Can a Civil Suit Be Filed?", "Civil Law"],
  ["Understanding Wills and Succession Certificates", "Succession"],
  ["What Is an Interim Injunction?", "Civil Law"],
  ["Medical Records and Negligence Allegations", "Medical Law"],
  ["Basic Documents for a NRI Legal Consultation", "NRI Legal"],
  ["Corporate Disputes: First Documents to Review", "Corporate Law"],
  ["What Does a Delhi High Court Appeal Involve?", "Court Procedure"],
  ["How Does a Landlord–Tenant Dispute Begin?", "Property Law"],
  ["Divorce Across Borders: Indian Court Considerations", "NRI Legal"],
  ["How to Prepare for Your First Lawyer Consultation", "Legal Guide"],
  ["Consumer Complaints: Starting Points", "Consumer Law"],
];
export const sampleFaqTopics = [
  [
    "NRI Property",
    "Can an NRI ask a lawyer to review property documents remotely?",
  ],
  [
    "NRI Property",
    "What should an NRI check before signing a power of attorney?",
  ],
  [
    "NRI Property",
    "What records help establish the chain of property ownership?",
  ],
  [
    "NRI Property",
    "What can be done when property papers appear to be forged?",
  ],
  ["NRI Property", "Does an NRI always need to travel to India for a case?"],
  ["NRI Property", "What is the difference between title and mutation?"],
  ["NRI Property", "Can jointly owned property be partitioned?"],
  ["NRI Property", "How can a suspected encumbrance be checked?"],
  [
    "NRI Property",
    "Does an NRI need legal advice before selling inherited property?",
  ],
  ["NRI Property", "What if a relative controls original property papers?"],
  [
    "Inheritance & Succession",
    "What is the difference between a will and a gift deed?",
  ],
  ["Inheritance & Succession", "When might probate be needed?"],
  ["Inheritance & Succession", "What does a succession certificate cover?"],
  ["Inheritance & Succession", "Can a will be challenged in court?"],
  [
    "Inheritance & Succession",
    "What if family members disagree about inheritance?",
  ],
  [
    "Inheritance & Succession",
    "Why is a family tree important in succession issues?",
  ],
  [
    "Inheritance & Succession",
    "Can a property transfer be questioned for fraud?",
  ],
  ["Inheritance & Succession", "Which documents help in a succession review?"],
  ["Property Disputes", "How do I respond to a property legal notice?"],
  [
    "Property Disputes",
    "When should a possession dispute be reviewed urgently?",
  ],
  ["Property Disputes", "What is an injunction?"],
  [
    "Property Disputes",
    "Can a builder delay lead to a consumer or RERA remedy?",
  ],
  [
    "Property Disputes",
    "What should a tenant do after receiving an eviction notice?",
  ],
  ["Property Disputes", "What can a landlord review before filing a case?"],
  ["Divorce & Child Custody", "What is mutual consent divorce?"],
  [
    "Divorce & Child Custody",
    "Is child welfare important in custody decisions?",
  ],
  [
    "Divorce & Child Custody",
    "Can a maintenance claim be considered separately?",
  ],
  [
    "Divorce & Child Custody",
    "What happens when spouses live in different countries?",
  ],
  [
    "Divorce & Child Custody",
    "Are all foreign divorce orders automatically valid in India?",
  ],
  [
    "Divorce & Child Custody",
    "What records may be useful in a matrimonial dispute?",
  ],
  ["Divorce & Child Custody", "How are visitation questions approached?"],
  [
    "Divorce & Child Custody",
    "Can domestic violence proceedings arise without divorce?",
  ],
  [
    "Divorce & Child Custody",
    "Does mediation resolve every matrimonial dispute?",
  ],
  [
    "Divorce & Child Custody",
    "What if a parent wants to relocate with a child?",
  ],
  [
    "Divorce & Child Custody",
    "Do matrimonial disputes have a single fixed timeline?",
  ],
  ["OCI & Immigration", "Where should OCI eligibility questions be verified?"],
  ["OCI & Immigration", "Can a visa refusal be reviewed?"],
  [
    "OCI & Immigration",
    "Are foreign immigration appeals handled under Indian law?",
  ],
  ["OCI & Immigration", "What documents help assess an immigration refusal?"],
  ["OCI & Immigration", "Do immigration requirements change?"],
  ["Criminal & Bail", "What is the purpose of bail?"],
  ["Criminal & Bail", "What records help prepare a bail consultation?"],
  [
    "Criminal & Bail",
    "Can a complaint and a civil claim arise from related facts?",
  ],
  ["Working With Us", "Does an enquiry form establish representation?"],
  ["Working With Us", "Will all documents be requested immediately?"],
  ["Working With Us", "Can I book a video consultation?"],
  ["Working With Us", "Can anyone promise a case result?"],
  ["Working With Us", "How are professional fees discussed?"],
  ["Working With Us", "Why does an advocate check for conflicts?"],
  ["Working With Us", "What should I include in my first enquiry?"],
];
