/** Original demo editorial content. Nothing is copied from the reference firm's articles. */
const profiles = {
  property: {
    name: "Property, ownership and possession",
    overview:
      "An Indian property matter often turns on the chain of title, possession, the nature of the transfer and the relief being requested. Mutation or a tax receipt may have evidentiary value but should not be treated as conclusive proof of ownership.",
    cases: [
      "Reviewing title and earlier transfer deeds before a transaction",
      "Assessing a disagreement about possession, boundaries or a family share",
      "Responding to a disputed sale, gift, power of attorney or mutation entry",
      "Considering whether urgent protective relief may be appropriate",
    ],
    documents: [
      "Registered sale, gift, conveyance or partition documents",
      "Revenue or municipal entries and property-tax records",
      "Approved plans, possession records, encumbrance details and notices",
      "A chronology identifying who occupied or managed the property",
    ],
    process: [
      "Reconstruct the ownership history and identify missing links.",
      "Compare documentary title with possession and official records.",
      "Check the court or authority having jurisdiction and available relief.",
      "Assess negotiation, notice, injunction or substantive proceedings as appropriate.",
    ],
    questions: [
      "Who currently has physical possession, and since when?",
      "Are any earlier sales, loans, mortgages or pending cases known?",
      "What outcome is required: protection, declaration, partition or recovery?",
    ],
  },
  family: {
    name: "Family and matrimonial matters",
    overview:
      "Family disputes involve rights and obligations shaped by the governing personal law, the relationship, the welfare of children and the case history. Litigation is only one possible route; safety, documentation and appropriate settlement discussions may also matter.",
    cases: [
      "Considering mutual consent or contested matrimonial proceedings",
      "Reviewing maintenance, residence, protection or financial-support issues",
      "Addressing parenting arrangements, guardianship and child welfare",
      "Responding to proceedings pending in another city or country",
    ],
    documents: [
      "Marriage or relationship records and a concise event chronology",
      "Communications, earlier notices and court orders, if any",
      "Income, expense and asset records where financial relief is relevant",
      "Child-related documents and information about existing arrangements",
    ],
    process: [
      "Identify the governing law, marriage status and competent forum.",
      "Separate immediate protection concerns from long-term family relief.",
      "Review the documents and any parallel proceedings.",
      "Discuss available court applications, mediation and practical risks.",
    ],
    questions: [
      "Are any existing maintenance, custody or protection orders in place?",
      "Are both parties and any children ordinarily resident in India or abroad?",
      "Is urgent intervention needed for safety, residence or a child?",
    ],
  },
  nri: {
    name: "NRI and cross-border Indian legal matters",
    overview:
      "When parties live in different jurisdictions, a matter may involve Indian documents and courts alongside foreign proceedings. Residence abroad does not automatically resolve jurisdiction, service, recognition or authority to sign on someone’s behalf.",
    cases: [
      "Indian property or inheritance issues for an overseas resident",
      "Remote collection or verification of documents and case records",
      "Cross-border family proceedings and existing foreign orders",
      "Planning a limited, properly executed authority for representation",
    ],
    documents: [
      "Relevant Indian property, family or company records",
      "Passport or overseas residence documents where relevant",
      "Copies of foreign orders, translations and service papers",
      "Power-of-attorney drafts and proof of prior communications",
    ],
    process: [
      "Map the countries, courts and parties involved in the matter.",
      "Identify the specific Indian law and competent forum.",
      "Check authentication, stamping, registration and execution requirements.",
      "Coordinate with foreign-qualified counsel when foreign law is material.",
    ],
    questions: [
      "Is there an existing foreign order or Indian case?",
      "Does someone in India currently hold an authority or original documents?",
      "Would a limited authorization be appropriate for particular tasks?",
    ],
  },
  criminal: {
    name: "Criminal procedure, defence and bail",
    overview:
      "Criminal matters require careful attention to the allegations, procedural stage, evidence, applicable offences and the rights of the persons concerned. Bail is determined through the applicable statutory framework and judicial assessment, never as a guaranteed result.",
    cases: [
      "Reviewing an FIR, complaint, summons or investigation notice",
      "Preparing information relevant to anticipatory or regular bail",
      "Understanding arrest, remand, chargesheet and trial procedure",
      "Identifying whether there are parallel civil or regulatory issues",
    ],
    documents: [
      "FIR or complaint and notices issued by authorities",
      "Relevant orders, bail history and custody information",
      "Transaction records, communications or other available evidence",
      "Details of previous litigation that must be disclosed",
    ],
    process: [
      "Identify the exact allegation and current procedural stage.",
      "Review materials actually supplied and applicable legal provisions.",
      "Check urgent deadlines, appearance requirements and bail options.",
      "Prepare an evidence-led strategy and preserve relevant records.",
    ],
    questions: [
      "Has any FIR, notice, summons or arrest order been issued?",
      "What documents are relied on for and against the allegation?",
      "Is a court date or period of custody involved?",
    ],
  },
  business: {
    name: "Commercial disputes and business law",
    overview:
      "Commercial matters frequently depend on the actual contract, parties, performance, payment history and agreed dispute-resolution mechanism. An invoice alone may not explain the entire transaction, and limitation or forum questions should be examined promptly.",
    cases: [
      "Unpaid invoices, disputed deliveries and contract breaches",
      "Shareholder, partnership or management disagreements",
      "Arbitration clauses, notices and enforcement questions",
      "Corporate compliance or specialist tribunal proceedings",
    ],
    documents: [
      "Signed agreements, work orders and amendments",
      "Invoices, bank records, ledgers and tax documents",
      "Email or other correspondence evidencing performance",
      "Demand notices, settlement proposals and prior orders",
    ],
    process: [
      "Identify contracting parties, obligations and breach allegations.",
      "Build a dated record of work, delivery, payments and objections.",
      "Review limitation, jurisdiction and arbitration or forum clauses.",
      "Assess negotiated resolution, notice, proceedings and enforcement.",
    ],
    questions: [
      "What contract terms control payment or dispute resolution?",
      "Was the service or supply accepted or contested?",
      "Is the counterparty operational and are assets or security known?",
    ],
  },
  immigration: {
    name: "Immigration, citizenship and travel matters",
    overview:
      "Immigration and citizenship procedures differ by country and can change. For Indian documentation, the relevant Indian authorities and current eligibility rules govern. Foreign visa appeals or representation may require a professional licensed in that jurisdiction.",
    cases: [
      "Reviewing a visa or immigration refusal notice",
      "Understanding Indian OCI, citizenship or registration paperwork",
      "Identifying time-sensitive submission or appeal questions",
      "Checking which country’s qualified counsel should advise",
    ],
    documents: [
      "Passport and status or residence documents",
      "Entire application, refusal decision and reference numbers",
      "Relevant supporting records and official correspondence",
      "A list of submission deadlines and travel history",
    ],
    process: [
      "Read the decision and the exact rule or ground cited.",
      "Confirm the correct government source and current process.",
      "Identify whether review, fresh application or appeal is available.",
      "Refer foreign-law representation to appropriately qualified counsel.",
    ],
    questions: [
      "Which authority issued the notice, and on what date?",
      "Does the letter specify a review or appeal right?",
      "What material information or documentation may be missing?",
    ],
  },
  medical: {
    name: "Medical, negligence and consumer issues",
    overview:
      "A poor treatment outcome does not alone prove actionable negligence. An assessment usually requires examining the chronology, clinical records, applicable standard of care, causation and the proper legal forum.",
    cases: [
      "Requesting and preserving complete treatment records",
      "Reviewing alleged errors in diagnosis or treatment",
      "Understanding consent and communication issues",
      "Assessing consumer, civil or other appropriate remedies",
    ],
    documents: [
      "Hospital records, prescriptions and discharge summaries",
      "Investigation results, bills and correspondence",
      "Consent forms and consultation notes, if available",
      "An objective chronology of treatment and subsequent events",
    ],
    process: [
      "Secure authentic and complete records as early as possible.",
      "Identify the professional conduct or decision in question.",
      "Consider independent specialist assessment where needed.",
      "Check limitation, jurisdiction, relief and evidence requirements.",
    ],
    questions: [
      "What specific medical act or omission is alleged?",
      "Which records can be authenticated?",
      "What evidence connects the alleged breach to the claimed harm?",
    ],
  },
  civil: {
    name: "Civil disputes, notices and court proceedings",
    overview:
      "Civil cases require a clear cause of action, maintainable relief, jurisdiction and supporting evidence. The form of the remedy depends on whether the dispute concerns contract, property, an injunction, a declaration or another civil right.",
    cases: [
      "Responding to legal notices and pending suits",
      "Assessing injunction, recovery, declaration or appeal options",
      "Documenting a contractual or personal dispute",
      "Preparing for mediation, settlement or formal proceedings",
    ],
    documents: [
      "Written agreements, notices and acknowledgements",
      "Relevant receipts, correspondence and official records",
      "Existing plaints, replies, orders or interim applications",
      "A dated chronology and desired relief",
    ],
    process: [
      "Identify rights, parties, key dates and contested facts.",
      "Check limitation, territorial and subject-matter jurisdiction.",
      "Assess the evidentiary record and interim relief, if justified.",
      "Decide the appropriate response, filing or settlement method.",
    ],
    questions: [
      "What exact relief is sought and against which party?",
      "Has any suit, proceeding or notice already been served?",
      "Are there facts requiring prompt interim protection?",
    ],
  },
  estate: {
    name: "Wills, succession and estate documentation",
    overview:
      "The route to transfer assets after a death depends on the nature of the asset, succession law, the existence of a will and the relevant forum. Probate, succession certificates, mutation and title transfer serve different purposes.",
    cases: [
      "Reviewing a will, codicil or disputed testamentary document",
      "Identifying heirs and estate assets",
      "Understanding probate or succession-certificate questions",
      "Documenting a proposed distribution or inherited share",
    ],
    documents: [
      "Death certificate and family relationship details",
      "Original will or copies and witness information",
      "Bank, investment, property and liability records",
      "Any existing succession, probate or revenue orders",
    ],
    process: [
      "Identify the asset type and whether a will exists.",
      "Ascertain governing personal law and potential beneficiaries.",
      "Distinguish certificate, probate and transfer requirements.",
      "Review objections, documentation and appropriate proceedings.",
    ],
    questions: [
      "Are the assets movable, immovable or both?",
      "Is an original will available and is its validity contested?",
      "Has any person already transferred, sold or encumbered property?",
    ],
  },
};
const specialty = {
  "divorce-lawyer-india":
    "For mutual consent matters, both parties should understand settlement terms, financial arrangements, disclosure and whether children are involved. A contested case has different pleadings and evidence. Foreign marriages or decrees add separate jurisdictional questions.",
  "criminal-lawyer-bail":
    "The court considers statutory conditions and case-specific factors including the allegations, evidence, custody circumstances and possible interference with witnesses. A bail order does not determine guilt or innocence.",
  "nri-property-lawyer-india":
    "An overseas owner should pay particular attention to the scope and execution of any power of attorney, chain of title, encumbrances, tenancy and mutation records. An agency arrangement should never be assumed to transfer title.",
  "real-estate-title-search":
    "Due diligence can include tracing the registered ownership chain, checking encumbrances, approvals, sanctioned plans, possession and litigation records. The appropriate records vary by property category and state.",
  "medical-negligence":
    "A review should distinguish an unfortunate result from a departure from accepted professional standards. Medical opinions and preservation of original treatment records may be central.",
  "corporate-nclt":
    "Company disputes may involve shareholder rights, governance documents, board action and specialist Companies Act or insolvency procedures. The appropriate NCLT forum depends on the legal issue.",
  "cheque-bounce-ni-act":
    "Dishonoured cheques may raise issues under Section 138 of the Negotiable Instruments Act, but statutory preconditions, notice service, legally enforceable liability and limitation must be checked against the actual dates.",
  "cybercrime-lawyer":
    "Preserve transaction IDs, screenshots, account statements and reporting acknowledgements. Prompt reporting through the applicable official cybercrime channels may help investigation, but fund recovery cannot be promised.",
  "prenuptial-agreements":
    "A proposed agreement should be assessed against the applicable Indian personal and public-policy framework. It should not be assumed that a foreign-style prenuptial contract will automatically be enforceable in India.",
  "adoption-intercountry-domestic":
    "Adoption procedures and eligibility can involve statutory child-protection frameworks and competent central or state authorities. Private shortcuts should not replace the lawful process.",
  "surrogacy-law-india":
    "Assisted reproductive and surrogacy arrangements are subject to specific statutory conditions and current regulatory requirements. Before acting, verify eligibility and the applicable rules with official authorities.",
  "us-visa-refusal":
    "US immigration decisions are governed by US law. Indian counsel can help organize India-side documents but a substantive US immigration appeal or strategy may require qualified US immigration counsel.",
  "uk-visa-refusal-appeal":
    "UK refusals are governed by UK immigration rules and do not all carry the same appeal rights. Examine the decision notice and consult an appropriately regulated UK adviser for UK-law representation.",
  "child-custody-guardianship":
    "The welfare and best interests of the child ordinarily lie at the heart of custody decisions. Schooling, stability, care arrangements and existing orders are more relevant than simply asserting a parent’s preference.",
  "money-recovery-suits":
    "Identify the exact debtor entity, dates of supply or service, acceptance of performance, contractual due dates and payment acknowledgements before choosing between a civil suit, arbitration or other lawful process.",
  "domestic-violence-law":
    "Legal protections may include safety, residence and other statutory relief subject to the facts and applicable requirements. Immediate danger should be addressed through appropriate emergency services.",
  "delhi-high-court-lawyer":
    "The Delhi High Court exercises distinct original, writ, appellate and supervisory jurisdictions. The challenged order, forum below, remedy and prescribed limitation influence the proper filing.",
  "banking-finance":
    "A banking dispute may involve loan documentation, notices, mandates, account entries or financial regulation. The first task is identifying the contractual transaction and responsible institution.",
  "immigration-oci-citizenship":
    "Current OCI and citizenship eligibility must be verified against official Indian government guidance. Citizenship and immigration are distinct legal questions and should not be conflated.",
};
const categoryOf = (s) => {
  const t = (s.title + " " + s.slug + " " + s.category).toLowerCase();
  if (
    /visa|immigra|citizenship|naturalization|oci|foreigners registration/.test(
      t,
    )
  )
    return "immigration";
  if (
    /nri|inter-country|intercountry|international child|foreign.*divorce|cross.border/.test(
      t,
    )
  )
    return "nri";
  if (
    /adoption|family|divorce|custody|child|matrimonial|alimony|domestic violence|surrogacy|separation|prenup|pre-nuptial/.test(
      t,
    )
  )
    return "family";
  if (
    /murder|criminal|bail|assault|battery|rape|weapon|cybercrime|abuse/.test(t)
  )
    return "criminal";
  if (/medical|negligence|informed consent|malpractice/.test(t))
    return "medical";
  if (/will|probate|succession|inheritance|estate|trust/.test(t))
    return "estate";
  if (
    /property|real estate|landlord|tenant|mortgage|land acquisition|construction|partition|title search|builder|asset protection/.test(
      t,
    )
  )
    return "property";
  if (
    /arbitrat|nclt|company|banking|finance|business|trade|contracts|corporat|trademark|intellectual|copyright|patent|credit|debtor|debt|project|securities/.test(
      t,
    )
  )
    return "business";
  return "civil";
};
function bullets(rows) {
  return rows.map((v) => `- ${v}`).join("\n");
}
export function enrichService(s) {
  const category = categoryOf(s),
    p = profiles[category],
    extra =
      specialty[s.slug] ||
      `${s.title} has its own requirements. The key question is not simply which general area of law applies, but which act, omission, document or decision is actually being contested. Specific claims, defences and time limits must be identified from the record.`;
  const text = `# ${s.title}\n\n${s.summary || p.overview}\n\n## What this area of law involves\n\n${p.overview} ${extra}\n\n## Situations that may require legal guidance\n\n${bullets(p.cases.map((v, i) => (i === 0 ? `${v} in the context of ${s.title.toLowerCase()}` : v)))}\n\n## Documents to collect before discussing the matter\n\n${bullets(p.documents)}\n\nPrepare a short, dated chronology and retain complete copies of notices and orders. The exact documents will depend on your matter; a generic list is not a demand for sensitive information through a public form.\n\n## How an initial assessment usually works\n\n${p.process.map((v, i) => `${i + 1}. ${v}`).join("\n")}\n\n## Questions to clarify\n\n${bullets(p.questions)}\n\n## Practical next steps\n\nWrite down what happened, what has already been filed or communicated, which deadlines may be approaching and what result you are seeking. If there is an existing hearing or authority deadline, mention the date at the first consultation. Your advocate can then discuss the appropriate forum, evidence, feasible procedure, professional terms and potential risks.\n\n## Consultation about ${s.title}\n\nUse the appointment or enquiry page to describe the broad matter and ask about availability. This is original illustrative website content and is **not legal advice**. The applicable rules and case law should be verified at the time of use; no particular outcome is promised.`;
  return {
    ...s,
    summary: s.summary || p.overview,
    content: text,
    contentCategory: category,
  };
}
const blogSpecific = {
  "mutual-consent-divorce-delhi-process": [
    "A mutual-consent petition is based on both spouses agreeing to seek dissolution under the applicable marriage law. The settlement and required procedural conditions should be considered before filing.",
    "Discuss maintenance, property or belongings, withdrawal or resolution of other proceedings and arrangements for children if relevant.",
    "The court evaluates statutory requirements and statements made before it. A lawyer should check the law governing the marriage and current judicial directions.",
  ],
  "nri-property-dispute-india": [
    "Indian property remains subject to the relevant Indian title and property laws even when its owner is overseas.",
    "Check who holds original deeds and possession, whether any power of attorney has been signed, and whether a registered transfer or encumbrance exists.",
    "Remote coordination may be possible for some tasks, but court or registrar requirements should be confirmed individually.",
  ],
  "cheque-bounce-notice-timeline": [
    "Bank memo dates, validity, service of statutory notice and the date a cause of action accrues matter in cheque dishonour cases.",
    "The usual NI Act framework involves a notice following dishonour and a statutory opportunity to pay; precise dates should be calculated from the record.",
    "Bank returns, copies of the cheque, underlying transaction papers and reliable proof of dispatch and service help counsel evaluate the matter.",
  ],
  "bail-application-process-india": [
    "Bail concerns liberty during investigation or trial, rather than final determination of criminal liability.",
    "The stage of proceedings, allegation, evidence, custody, criminal antecedents where relevant and statutory restrictions can affect the court’s decision.",
    "Supply complete previous bail orders and a truthful history of the case; do not conceal past applications.",
  ],
  "wills-and-succession-india": [
    "A will, nomination, mutation and succession certificate do not have identical legal functions.",
    "Identify the type and location of each asset, relevant heirs, whether there is a will and whether its authenticity is contested.",
    "The appropriate route depends on governing succession law and the institution or authority handling the asset.",
  ],
  "cyber-fraud-complaint-india": [
    "Fast preservation of digital evidence is often crucial after suspected online fraud.",
    "Secure accounts, contact your bank or payment provider promptly, report using the applicable official cybercrime channel and retain the acknowledgement.",
    "Do not share OTPs or passwords with anyone offering recovery. Legal remedies depend on the transactions, evidence and investigation.",
  ],
};
const blogByCategory = {
  "Property Law": [
    "Verify the identity and authority of the person who claims to own or transfer the property.",
    "Compare title deeds with official records, possession and any disclosed encumbrances.",
    "Check deadlines or registration requirements before signing or making a large payment.",
  ],
  "NRI Legal": [
    "List the countries in which relevant people, property or proceedings are located.",
    "Collect India-side records and check foreign orders separately for their effect under Indian law.",
    "Limit the scope of any power of attorney and follow required execution formalities.",
  ],
  "Family Law": [
    "Clarify the governing personal law, relationship history and any current proceedings.",
    "Keep the welfare of children and immediate safety concerns distinct from financial claims.",
    "Record any settlement proposal carefully instead of assuming verbal terms will resolve all issues.",
  ],
  "Banking Law": [
    "Identify the actual bank transaction and the parties legally liable.",
    "Preserve statements, return memos, notices and proof of service.",
    "Ask counsel to calculate limitation and procedural deadlines from actual dates.",
  ],
  "Criminal Law": [
    "Preserve documents and avoid altering digital or physical evidence.",
    "Understand the exact allegation and stage of investigation or trial.",
    "Disclose earlier orders and pending cases fully when seeking procedural relief.",
  ],
  "Cyber Law": [
    "Preserve transaction IDs and screenshots while they remain accessible.",
    "Notify relevant institutions and authorities promptly through official channels.",
    "Protect credentials and beware of fraudulent recovery demands.",
  ],
  "Civil Law": [
    "Identify the cause of action and legal relief sought.",
    "Check jurisdiction, limitation and any existing notices or interim orders.",
    "Organize primary documents and a dated chronology.",
  ],
  "Commercial Law": [
    "Read the contract and any dispute-resolution clause closely.",
    "Create a record of performance, acceptance, invoices and payments.",
    "Consider negotiation and notice alongside formal proceedings.",
  ],
  Succession: [
    "Identify the heirs, will and asset categories.",
    "Collect death and relationship records alongside title or account documents.",
    "Choose the correct certificate, probate or transfer procedure.",
  ],
  "Medical Law": [
    "Request full medical records and preserve the original chronology.",
    "Avoid equating a negative outcome with proven professional negligence.",
    "Consider the need for qualified clinical assessment of care and causation.",
  ],
  "Corporate Law": [
    "Review constitutional documents and board or member decisions.",
    "Preserve statutory filings, contracts and correspondence.",
    "Check whether a court, NCLT or arbitration is the appropriate forum.",
  ],
  "Court Procedure": [
    "Obtain certified orders and confirm their operative portions.",
    "Note when the order was communicated and any statutory filing period.",
    "Determine whether appeal, review or another route is legally available.",
  ],
  "Consumer Law": [
    "Keep invoices, warranties, communication and proof of deficiency.",
    "Check the suitable consumer forum and any specialised remedy.",
    "State the relief sought and the supporting facts with precision.",
  ],
  "Legal Guide": [
    "Prepare a one-page history and list of questions.",
    "Keep original documents secure and share only relevant copies through agreed channels.",
    "Ask about scope, fees, timelines and likely next procedural steps.",
  ],
};
export function enrichPost(post, index) {
  const facts = blogSpecific[post.slug],
    tips = blogByCategory[post.category] || blogByCategory["Legal Guide"];
  const focus = post.title.replace(/[?.]$/, "");
  const intro =
    facts?.[0] ||
    `${focus} can have different legal consequences depending on the documents, chronology, the nature of the parties and the court or authority concerned. The first objective is to distinguish a general concern from a precise legal question.`;
  const text = `# ${focus}\n\n${intro}\n\n## Why this issue deserves careful attention\n\n${facts?.[1] || `In ${post.category.toLowerCase()} matters, small details can change the available remedy. A signed document, a missed procedural communication or the location of the dispute can affect the correct approach. Avoid relying on a broad online answer without examining the actual record.`}\n\n## Initial checks to make\n\n${bullets(tips)}\n\n## Documents and evidence worth organizing\n\nArrange a dated summary of events, the identities of the relevant parties, agreements or official records, communications, notices, payments and any previous judicial orders. Label originals and copies separately. If documents contain confidential personal or banking information, use a secure channel agreed with your lawyer.\n\n## Understanding the procedure\n\n${facts?.[2] || `The appropriate route could involve a notice, negotiation, authority representation, complaint, suit, application or appeal. Whether any of these is available depends on the governing law, the relief sought and the stage of the matter. Forum selection and limitation should be checked before filing.`}\n\n## Common mistakes to avoid\n\n- Ignoring the date printed on a notice or court order.\n- Assuming that a website explanation settles the facts of an individual dispute.\n- Relying on verbal assurances without checking the written record.\n- Providing confidential material through unverified contacts.\n- Assuming a particular outcome or exact duration can be guaranteed.\n\n## Questions for your legal consultation\n\nAsk which law is likely to apply, which evidence is missing, where a case could be filed, whether a deadline or urgent remedy is relevant, what the expected stages are and how fees and expenses will be handled. Explain any parallel case or overseas connection at the outset.\n\n## Conclusion\n\n${focus} should be approached through accurate records, clear objectives and case-specific legal advice. This independently authored demonstration article is for general awareness, not a substitute for legal advice, and should be checked for current law before publication.`;
  return {
    ...post,
    content: text,
    excerpt: (post.excerpt || intro).replace(
      "independently written demonstration article exploring",
      "practical introduction to",
    ),
    author: "Editorial Team — Demo Content",
    seoDescription: post.seoDescription || intro.slice(0, 155),
  };
}
export function enrichFaq(q) {
  const c = q.category || "General";
  const hints =
    blogByCategory[c] ||
    (c.includes("NRI")
      ? blogByCategory["NRI Legal"]
      : c.includes("Divorce")
        ? blogByCategory["Family Law"]
        : c.includes("Inheritance")
          ? blogByCategory["Succession"]
          : c.includes("Property")
            ? blogByCategory["Property Law"]
            : c.includes("Criminal")
              ? blogByCategory["Criminal Law"]
              : blogByCategory["Legal Guide"]);
  let specific = "";
  const question = q.question.toLowerCase();
  if (question.includes("mutation"))
    specific =
      "A mutation entry usually serves revenue or municipal administrative purposes and should not be treated as identical to a valid transfer of legal title.";
  else if (question.includes("foreign divorce"))
    specific =
      "A foreign divorce decree is not automatically conclusive in every Indian proceeding; jurisdiction, applicable matrimonial law and statutory recognition rules require examination.";
  else if (question.includes("power of attorney"))
    specific =
      "A power of attorney should have narrowly defined powers and be executed, authenticated and registered where applicable under the relevant rules.";
  else if (question.includes("welfare") || question.includes("custody"))
    specific =
      "The child’s welfare and best interests carry substantial weight; existing orders, care arrangements and the individual facts matter.";
  else if (question.includes("visa"))
    specific =
      "Read the exact refusal decision and verify rights or timelines through the responsible foreign authority; foreign immigration law requires qualified local advice.";
  else if (question.includes("bail"))
    specific =
      "Bail is a case-specific judicial decision governed by criminal procedure and any statutory restrictions. The order does not determine guilt.";
  else if (question.includes("guarantee") || question.includes("promise"))
    specific =
      "No ethical legal practice should promise a certain case result or date because judicial outcomes depend on evidence, law and the proceeding.";
  else if (question.includes("video consultation"))
    specific =
      "An initial remote conversation can be requested, although document verification, identification and court appearances may still have their own requirements.";
  else
    specific = `For ${c.toLowerCase()} matters, a first assessment usually involves verifying relevant records, legal rights, urgency and the correct authority or forum.`;
  return {
    ...q,
    answer: `${specific} Practical first checks include: ${hints.slice(0, 2).join(" ")} The exact answer depends on your documents and applicable current law. Request a case-specific consultation for a definitive assessment.`,
  };
}
