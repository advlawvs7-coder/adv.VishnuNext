import {
  catalogueServices,
  menuGroups,
  suggestedBlogTitles,
  sampleFaqTopics,
} from "./catalogue.mjs";
import { enrichService, enrichPost, enrichFaq } from "./rich-content.mjs";
const court =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1800&q=80";
const books =
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1300&q=80";
const pillar =
  "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1300&q=80";
const legal =
  "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1300&q=80";
export const settings = {
  key: "main",
  brandName: "ADVOCATE DR. VISHNU SHARMA",
  subBrand: "LEGAL COUNSEL • NEW DELHI",
  tagline: "An informed approach to every legal matter",
  siteTitle: "Dr. Advocate Vishnu Sharma | Legal Services in Delhi & India",
  siteDescription:
    "Explore civil, criminal, matrimonial, property and NRI legal services with Dr. Advocate Vishnu Sharma in Delhi, India.",
  siteUrl: "https://advocatevishnusharma.com",
  phone: "+91 98731 81685",
  whatsapp: "919873181685",
  email: "advocatevishnu@yahoo.in",
  address: "Office No. 101, Himland House, Karampura, Delhi – 110015",
  officeHours: "By prior appointment",
  locationText: "Delhi, India",
  headerCtaText: "Consultation",
  headerCtaHref: "/book-appointment",
  footerBlurb:
    "Independent legal practice offering clear guidance in matrimonial, civil, criminal, property and NRI-related matters. All information here is for general awareness.",
  instagram: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  aboutEyebrow: "Who We Are",
  aboutTitle: "Committed to responsible legal representation",
  aboutContent:
    "Dr. Advocate Vishnu Sharma provides legal consultation and representation across civil, criminal, matrimonial, property and related disputes. The practice focuses on understanding each client’s circumstances, explaining available legal options, and developing a considered strategy within the framework of Indian law. Domestic and NRI clients can enquire about remote consultations and case coordination in India.",
  aboutImage: books,
  experienceLabel: "15+ Years in Legal Practice",
  consultationTitle: "Discuss your legal concern",
  consultationText:
    "Share a short summary of your matter. The office can respond to discuss the availability and scope of a consultation.",
  googleMapsUrl: "",
  disclaimerText:
    "The material on this website is provided for informational purposes only and does not constitute legal advice, solicitation or advertisement. Viewing this website does not establish an advocate–client relationship. You acknowledge that you are seeking information of your own accord. Prior results do not guarantee outcomes.",
  seoTitle: "Dr. Advocate Vishnu Sharma | Delhi Advocate",
  seoDescription:
    "Legal information and consultation enquiries for matrimonial, criminal, civil, property and NRI matters in India.",
};
export const slides = [
  {
    eyebrow: "LEGAL CONSULTATION • DELHI, INDIA",
    title: "Experienced Counsel. Thoughtful Legal Solutions.",
    subtitle:
      "Civil, criminal, matrimonial, property and NRI legal services with a practical, case-focused approach.",
    image: court,
    ctaText: "Request Consultation",
    ctaHref: "/book-appointment",
    order: 1,
    enabled: true,
  },
  {
    eyebrow: "DOMESTIC & NRI LEGAL MATTERS",
    title: "Legal Guidance, Wherever You Are.",
    subtitle:
      "Discuss Indian legal matters from home or abroad. Online consultation requests can be submitted directly.",
    image: pillar,
    ctaText: "Explore Practice Areas",
    ctaHref: "/practice-areas",
    order: 2,
    enabled: true,
  },
  {
    eyebrow: "ADVOCATE DR. VISHNU SHARMA",
    title: "Every Legal Matter Deserves Attention.",
    subtitle:
      "Understand your options, evidence, procedure and next steps through clear legal advice.",
    image: legal,
    ctaText: "About the Practice",
    ctaHref: "/about",
    order: 3,
    enabled: true,
  },
];
export const sections = [
  {
    sectionKey: "feature-strip",
    eyebrow: "",
    title: "Service Highlights",
    bullets:
      "Focused Legal Consultation\nEnquiries From India & Abroad\nCivil, Criminal & Family Matters",
    order: 1,
    enabled: true,
  },
  {
    sectionKey: "process",
    eyebrow: "How We Work",
    title: "A clear path from consultation to action",
    description:
      "Each matter is assessed on its own facts, documents and applicable law.",
    bullets:
      "Listen & Understand|Review the facts, concerns and relevant documents.\nStrategy & Advice|Discuss the legal position, options, risks and procedural steps.\nRepresentation & Updates|Take agreed legal steps and share progress when relevant.",
    order: 10,
    enabled: true,
  },
  {
    sectionKey: "practice",
    eyebrow: "Our Practice Areas",
    title: "Legal services for important moments",
    description:
      "Explore the matters for which you can seek advice and representation.",
    order: 20,
    enabled: true,
  },
  {
    sectionKey: "nri",
    eyebrow: "For Clients Living Abroad",
    title: "India-focused legal support for NRIs",
    description:
      "Distance should not prevent you from understanding your legal options. Discuss family disputes, inheritance, property, powers of attorney, and ongoing proceedings in India.",
    image: pillar,
    ctaText: "Explore NRI Services",
    ctaHref: "/practice-areas/nri-legal-services",
    bullets:
      "Remote initial consultation\nDocument and case review\nCoordination for legal matters in India",
    order: 30,
    enabled: true,
  },
  {
    sectionKey: "nri-geography",
    eyebrow: "International Enquiries",
    title: "India-related legal enquiries from abroad",
    description:
      "People residing overseas may enquire about India-related legal concerns. These are enquiry regions, not claims of foreign offices or completed representations.",
    bullets:
      "USA\nCanada\nUnited Kingdom\nAustralia\nUAE\nSingapore\nGermany\nNew Zealand",
    order: 35,
    enabled: true,
  },
  {
    sectionKey: "why",
    eyebrow: "Our Approach",
    title: "Professional care at every stage",
    description:
      "Effective representation begins with clarity about the issues and the process.",
    bullets:
      "Clarity in Advice|Legal options explained in straightforward language.\nThoughtful Planning|Case strategy grounded in applicable law and documents.\nConfidential Communication|Respect for sensitive client information.\nResponsive Coordination|Practical follow-ups and updates on active matters.",
    order: 40,
    enabled: true,
  },
  {
    sectionKey: "videos",
    eyebrow: "Legal Awareness",
    title: "Videos & legal explainers",
    description: "Short educational resources about common legal questions.",
    order: 50,
    enabled: true,
  },
  {
    sectionKey: "team",
    eyebrow: "About the Advocate",
    title: "Meet Dr. Advocate Vishnu Sharma",
    description: "Learn about the legal practitioner behind this office.",
    order: 60,
    enabled: true,
  },
  {
    sectionKey: "blog",
    eyebrow: "Knowledge Centre",
    title: "Latest legal articles",
    description: "Plain-language articles on Indian law and legal procedure.",
    order: 70,
    enabled: true,
  },
  {
    sectionKey: "faqs",
    eyebrow: "Common Questions",
    title: "Frequently asked questions",
    description: "Helpful starting points before consulting an advocate.",
    order: 80,
    enabled: true,
  },
  {
    sectionKey: "about-principles",
    eyebrow: "Professional Values",
    title: "A thoughtful approach to every legal matter",
    description:
      "The aim is responsible legal advice based on facts, evidence and applicable law.",
    bullets:
      "Clarity in Advice|Understand available procedures and options.\nConfidential Communication|Respect for client information.\nIndividual Case Strategy|Consider the particular facts and records.",
    order: 95,
    enabled: true,
  },
  {
    sectionKey: "consultation",
    eyebrow: "Enquire Now",
    title: "Request a legal consultation",
    description: "Submit your enquiry through our secure contact form.",
    order: 90,
    enabled: true,
  },
];
const originalServices = [
  [
    "Divorce & Matrimonial Law",
    "divorce-matrimonial-law",
    "Family & Matrimonial",
    "heart-handshake",
    "Consultations relating to mutual consent divorce, contested divorce, maintenance and matrimonial disputes.",
  ],
  [
    "Child Custody & Guardianship",
    "child-custody-guardianship",
    "Family & Matrimonial",
    "users",
    "Legal guidance on guardianship, parenting arrangements and the welfare of children.",
  ],
  [
    "Domestic Violence Matters",
    "domestic-violence-law",
    "Family & Matrimonial",
    "shield",
    "Advice on legal remedies, protection applications and proceedings under applicable law.",
  ],
  [
    "NRI Legal Services",
    "nri-legal-services",
    "NRI & Property",
    "globe",
    "India-related legal support for NRIs, including matrimonial, inheritance and property concerns.",
  ],
  [
    "Property & Real Estate",
    "property-lawyer-delhi",
    "NRI & Property",
    "building-2",
    "Advice concerning title, sale, partition, possession and property disputes.",
  ],
  [
    "Wills, Succession & Inheritance",
    "will-succession-lawyer",
    "NRI & Property",
    "scroll-text",
    "Guidance on succession, wills, inheritance and connected court procedures.",
  ],
  [
    "Criminal Defence & Bail",
    "criminal-lawyer-bail",
    "Criminal & Courts",
    "scale",
    "Assistance in criminal proceedings, bail matters and case defence.",
  ],
  [
    "Cybercrime & Online Fraud",
    "cybercrime-lawyer",
    "Criminal & Courts",
    "shield-check",
    "Legal assistance related to online fraud, cyber complaints and investigations.",
  ],
  [
    "Civil Litigation",
    "civil-litigation",
    "Civil & Business",
    "landmark",
    "Representing clients in civil disputes and related litigation processes.",
  ],
  [
    "Cheque Bounce Matters",
    "cheque-bounce-ni-act",
    "Civil & Business",
    "file-check-2",
    "Consultations related to cheque dishonour proceedings under applicable law.",
  ],
  [
    "Debt & Money Recovery",
    "money-recovery-suits",
    "Civil & Business",
    "hand-coins",
    "Legal routes for recovery of unpaid dues and contractual claims.",
  ],
  [
    "Arbitration & Commercial Disputes",
    "arbitration-commercial",
    "Civil & Business",
    "briefcase-business",
    "Advice on commercial disagreements, arbitration agreements and dispute resolution.",
  ],
].map(([title, slug, category, icon, summary], i) => ({
  title,
  slug,
  category,
  icon,
  summary,
  image: i % 2 ? legal : books,
  order: i + 1,
  featured: i < 6,
  published: true,
  seoTitle: `${title} | Dr. Advocate Vishnu Sharma`,
  seoDescription: summary,
  content: `## About ${title}\n\n${summary}\n\nEach legal matter is different. The appropriate next step depends on the facts, available documents, jurisdiction and the latest applicable law.\n\n## How a consultation can help\n\nDuring a consultation, you can discuss the key facts, relevant documents, legal options, expected procedures and practical next steps.\n\n## Documents you may need\n\nKeep relevant correspondence, notices, agreements, court documents and identification available where applicable. The exact documents depend on your matter.\n\n## Request an appointment\n\nUse the consultation form to briefly describe your concern. **This sample text is editable in the admin dashboard.**`,
}));
const originalPosts = [
  [
    "Mutual Consent Divorce in Delhi: Process and Key Documents",
    "mutual-consent-divorce-delhi-process",
    "Family Law",
    "A simple overview of the procedure, documents and practical questions commonly raised by couples.",
  ],
  [
    "How Can an NRI Handle a Property Dispute in India?",
    "nri-property-dispute-india",
    "NRI Law",
    "An introduction to title documents, representation and possible legal remedies for overseas owners.",
  ],
  [
    "Cheque Bounce Notice: Understanding the Timeline",
    "cheque-bounce-notice-timeline",
    "Banking Law",
    "What to consider when a cheque is dishonoured and how the notice and limitation rules work.",
  ],
  [
    "Understanding Bail Applications in India",
    "bail-application-process-india",
    "Criminal Law",
    "A plain-language introduction to bail and factors considered by courts.",
  ],
  [
    "A Practical Guide to Wills and Succession",
    "wills-and-succession-india",
    "Property Law",
    "Common questions about testamentary documents and inheritance in India.",
  ],
  [
    "Cyber Fraud Complaint: First Steps",
    "cyber-fraud-complaint-india",
    "Cyber Law",
    "Steps to document and report a suspected online fraud incident.",
  ],
].map(([title, slug, category, excerpt], i) => ({
  title,
  slug,
  category,
  excerpt,
  content: `## Introduction\n\n${excerpt}\n\nThis article provides general information and does not replace advice tailored to specific facts.\n\n## Key legal considerations\n\nThe legal approach depends on the available evidence, jurisdiction, applicable legislation and the particular circumstances of the dispute.\n\n## Practical preparation\n\nCollect relevant notices, correspondence, contracts, identity documents and records. Make a dated timeline of events before discussing your matter with a legal professional.\n\n## When to seek advice\n\nConsult an advocate if a limitation period may apply or urgent action is required.\n\n*Editorial note: This is editable demonstration content for the new website. Replace it with a reviewed original article before publication.*`,
  coverImage: i % 3 === 0 ? court : i % 3 === 1 ? pillar : books,
  author: "Dr. Advocate Vishnu Sharma",
  publishedAt: new Date(Date.now() - i * 86400000 * 8),
  featured: i < 3,
  published: true,
  seoTitle: title,
  seoDescription: excerpt,
}));
const originalFaqs = [
  [
    "How can I request a legal consultation?",
    "Fill out the enquiry form with your name, contact details and a brief description of your legal matter. The office can contact you about scheduling and scope of consultation.",
  ],
  [
    "Can NRI clients enquire from outside India?",
    "Yes. NRI clients can submit a remote enquiry about legal matters concerning India. Availability and procedural requirements depend on the case.",
  ],
  [
    "What documents should I bring to the consultation?",
    "Bring any notices, orders, agreements, correspondence, receipts and other records relevant to your matter. A specific document list can be discussed after the facts are reviewed.",
  ],
  [
    "Does sending the enquiry form create an advocate–client relationship?",
    "No. A website enquiry alone does not establish an advocate–client relationship or guarantee representation.",
  ],
  [
    "Can you advise about divorce, custody and property disputes?",
    "The practice lists matrimonial, family and property matters among its areas of focus. The correct procedure depends on your circumstances and jurisdiction.",
  ],
  [
    "Is my case outcome guaranteed?",
    "No advocate can responsibly guarantee a legal outcome. Results depend on the evidence, law, procedural developments and court decisions.",
  ],
].map(([question, answer], i) => ({
  question,
  answer,
  category: "General",
  order: i + 1,
  published: true,
}));
export const team = [
  {
    name: "Dr. Advocate Vishnu Sharma",
    designation: "Advocate • Legal Consultant",
    description:
      "Advocate with over 15 years of legal practice experience. Former Honorary Secretary Member, Bar Council of Delhi. Profile details and portrait should be reviewed before launch.",
    image: "/images/portrait-placeholder.svg",
    order: 1,
    published: true,
  },
];
export const videos = [
  {
    title: "Live-in Relationships: Legal Rights in India",
    description:
      "Educational video slot. Add your official YouTube link and thumbnail through the admin panel.",
    youtubeUrl: "",
    thumbnail: legal,
    order: 1,
    published: true,
  },
  {
    title: "Understanding Cheque Bounce Law",
    description:
      "Add the published video URL through the admin panel to enable viewing.",
    youtubeUrl: "",
    thumbnail: books,
    order: 2,
    published: true,
  },
  {
    title: "Senior Citizens and Legal Protection",
    description: "Placeholder for an original legal awareness video.",
    youtubeUrl: "",
    thumbnail: court,
    order: 3,
    published: true,
  },
];
const originalNavigation = [
  ["Home", "/", "", 1],
  ["About", "/about", "", 2],
  ["Practice Areas", "/practice-areas", "", 3],
  ["Blog", "/blog", "", 4],
  ["Videos", "/videos", "", 5],
  ["Team", "/team", "", 6],
  ["FAQs", "/faqs", "", 7],
  ["Contact", "/contact", "", 8],
  ["Book Appointment", "/book-appointment", "", 9],
].map(([label, href, parent, order]) => ({
  label,
  href,
  parent,
  order,
  enabled: true,
}));
const originalPages = [
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    excerpt: "How website enquiries and contact details are handled.",
    content:
      "## Privacy Policy\n\nWe receive details that visitors choose to provide in the enquiry form, such as name, contact information and a brief description of a legal concern. This information is used to respond to the enquiry and support consultation administration.\n\n## Data and retention\n\nAccess is limited to authorized administrators. Data is held using the configured database and hosting services. Review and expand this sample policy based on the actual production systems and applicable obligations before launch.\n\n## Contact\n\nFor questions about website data, use the contact details listed on this site.",
    published: true,
    seoTitle: "Privacy Policy | Dr. Advocate Vishnu Sharma",
  },
  {
    title: "Disclaimer",
    slug: "disclaimer",
    excerpt: "Professional and informational website disclaimer.",
    content: `## Disclaimer\n\n${settings.disclaimerText}\n\n## No guaranteed results\n\nInformation about services does not promise any particular legal outcome.\n\n## Editorial note\n\nHave this disclaimer reviewed for applicable Bar Council of India rules before putting the website live.`,
    published: true,
    seoTitle: "Disclaimer | Dr. Advocate Vishnu Sharma",
  },
];
export const testimonials = [
  {
    quote:
      "DUMMY TESTIMONIAL — Do not publish without an authentic review, consent and professional-rule review.",
    author: "Demonstration Only",
    role: "Admin placeholder",
    order: 1,
    published: false,
  },
];

const slugs = new Set();
export const services = [...catalogueServices, ...originalServices]
  .filter((x) => {
    if (slugs.has(x.slug)) return false;
    slugs.add(x.slug);
    return true;
  })
  .map((x, i) => enrichService({ ...x, order: i + 1 }));
const slugify = (x) =>
  x
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const generatedPosts = suggestedBlogTitles.map(([title, category], i) => ({
  title,
  slug: slugify(title),
  category,
  excerpt: `An independently written demonstration article exploring ${title.toLowerCase()}.`,
  author: "Editorial Demo — Review Before Publishing",
  publishedAt: new Date(Date.UTC(2026, 8, 20 - i)),
  coverImage: [court, books, pillar, legal][i % 4],
  featured: i < 3,
  published: true,
  seoTitle: `${title} | Advocate Vishnu Sharma`,
  seoDescription: `An introductory guide to ${title.toLowerCase()} in India.`,
  content: `## Introduction\n\n${title} is a common area of legal concern. Before making decisions, identify the relevant facts, documents, legal framework and forum. This is an original sample article intended to illustrate a full blog page and not individual legal advice.\n\n## What you should clarify\n\nBegin with the sequence of events, who is involved, any relevant notices or orders, and the relief being considered. A procedural option may depend on the nature of the dispute, applicable limitation periods, evidence and jurisdiction.\n\n## Helpful records\n\nCollect signed documents, letters, available official records, communications and a short chronology. For sensitive matters, avoid submitting detailed confidential information through a public form.\n\n## The consultation stage\n\nA lawyer can review the particular facts, explain possible procedures, and discuss professional fees and expected steps. There is no universal timeline or guaranteed outcome.\n\n## Editorial note\n\nThis article is seeded dummy material. Replace it with reviewed, original, up-to-date legal guidance before making this page public.`,
}));
export const posts = [...originalPosts, ...generatedPosts].map(enrichPost);
const createdFaqs = sampleFaqTopics.map(([category, question], i) => ({
  question,
  category,
  answer: `The answer depends on your documents, the applicable legal framework, current procedural requirements and the jurisdiction. For ${category.toLowerCase()} matters, prepare the relevant notices, orders and chronology before requesting advice. This is a short demonstration answer to be professionally reviewed before launch.`,
  order: i + 1,
  published: true,
}));
export const faqs = [
  ...createdFaqs,
  ...originalFaqs.map((x, i) => ({ ...x, order: createdFaqs.length + i + 1 })),
].map(enrichFaq);
export const navigation = [
  { label: "Home", href: "/", parent: "", order: 1, enabled: true },
  { label: "About", href: "/about", parent: "", order: 2, enabled: true },
  {
    label: "Practice Areas",
    href: "/practice-areas",
    parent: "",
    order: 3,
    enabled: true,
  },
  { label: "Videos", href: "/videos", parent: "", order: 4, enabled: true },
  { label: "Blog", href: "/blog", parent: "", order: 5, enabled: true },
  { label: "Contact", href: "/contact", parent: "", order: 6, enabled: true },
  { label: "FAQs", href: "/faqs", parent: "", order: 7, enabled: true },
  {
    label: "Book Appointment",
    href: "/book-appointment",
    parent: "",
    order: 8,
    enabled: true,
  },
  ...menuGroups.flatMap((g, i) =>
    g.links.map(([label, slug], j) => ({
      label,
      href: `/practice-areas/${slug}`,
      parent: "Practice Areas",
      group: g.label,
      order: i * 20 + j + 10,
      enabled: true,
    })),
  ),
];
export const siteMapAudit = {
  menuGroups: menuGroups.length,
  menuLinks: menuGroups.reduce((n, g) => n + g.links.length, 0),
  generalPracticeLinks: 31,
  specificPracticeLinks: 78,
};

export const pages = [
  ...originalPages,
  {
    title: "Billing and Fees",
    slug: "billing-and-fees",
    excerpt: "How consultation and professional fees may be structured.",
    published: true,
    seoTitle: "Billing and Fees | Advocate Vishnu Sharma",
    content:
      "## Understanding professional fees\n\nThe scope, complexity and work involved vary from case to case. Professional fees and reimbursable expenses should be discussed and agreed before engagement.\n\n## Consultation and opinion\n\nAn initial consultation may involve reviewing background facts and providing preliminary procedural guidance. Any fee should be confirmed directly with the office.\n\n## Stage-based or matter-based arrangements\n\nDepending on the work, a written engagement may specify a fee for drafting, appearances or other agreed stages. Always review what is included and what is not.\n\n## Payments\n\nPayment details are confirmed only through an official office communication. No fixed charges are advertised on this demonstration website.",
  },
  {
    title: "Terms of Use",
    slug: "terms-of-use",
    excerpt: "Terms governing demonstration website usage.",
    published: true,
    content:
      "## Website information\n\nContent is general information and is not legal advice. Website use does not establish representation.\n\n## Accuracy\n\nInformation may not reflect the latest changes. Seek individual advice before taking steps.\n\n## Content rights\n\nText and visual assets used by this demonstration project should be independently cleared before publication.",
  },
  {
    title: "Media and Publications",
    slug: "media-and-publications",
    excerpt: "Placeholders for verified media appearances and legal education.",
    published: true,
    content:
      "## Publications and media\n\nAdd only verified appearances, articles, interviews and professional achievements through the admin dashboard. No affiliation with any broadcaster or award body is implied by this placeholder.\n\n## Educational videos\n\nVisit our video section for demonstration slots that can be replaced with the office’s own published educational videos.",
  },
];

// Original demonstration blocks mirroring the reference site's breadth, without inventing honors or client metrics.
sections.push(
  {
    sectionKey: "professional-highlights",
    eyebrow: "Professional Profile",
    title: "Experience, Context & Care",
    description:
      "A few professional details about the office. Edit these in the admin after verification.",
    bullets:
      "15+|Years in legal practice\nDelhi|Primary office location\nIndian Law|Domestic and NRI-related enquiries",
    order: 28,
    enabled: true,
  },
  {
    sectionKey: "courts-and-forums",
    eyebrow: "Courts of Practice",
    title: "Finding the Correct Legal Forum",
    description:
      "Indian courts, forums and tribunals have distinct rules and jurisdiction. A case assessment identifies the correct path.",
    bullets:
      "High Courts|Writs and appeals\nFamily Courts|Matrimonial and child matters\nCivil & Criminal Courts|Litigation and bail\nTribunals|Specialist statutory proceedings",
    ctaText: "Explore Courts & Tribunals",
    ctaHref: "/courts-of-practice",
    order: 42,
    enabled: true,
  },
  {
    sectionKey: "professional-credentials",
    eyebrow: "Professional Journey",
    title: "A Practice Guided by Preparation",
    description:
      "Advocate Dr. Vishnu Sharma has over 15 years of practice experience and previously served as an Honorary Secretary Member of the Bar Council of Delhi. Please verify any further credentials before publication.",
    ctaText: "View Advocate Profile",
    ctaHref: "/profile",
    order: 62,
    enabled: true,
  },
  {
    sectionKey: "publication-highlights",
    eyebrow: "Publications & Insights",
    title: "Legal Education & Verified Media",
    description:
      "This section is reserved for published legal resources and authenticated press appearances. No unverified awards or media affiliations are claimed.",
    ctaText: "Media & Publications",
    ctaHref: "/media",
    order: 76,
    enabled: true,
  },
);

// Footer URLs are also editable as navigation rows under the 'Footer' parent group.
navigation.push(
  ...[
    ["Advocate Profile", "/profile"],
    ["Billing and Fees", "/billing-and-fees"],
    ["Brief Contact Details", "/contact"],
    ["Book Appointment", "/book-appointment"],
    ["Practice Areas", "/practice-areas"],
    ["Online Consultation", "/online-consultation"],
    ["Recent Videos", "/videos"],
    ["Legal Articles", "/blog"],
    ["FAQs", "/faqs"],
    ["Disclaimer", "/pages/disclaimer"],
    ["Directions to Office", "/directions"],
  ].map(([label, href], i) => ({
    label,
    href,
    parent: "Footer",
    group: "Important Links",
    order: 300 + i,
    enabled: true,
  })),
);

// Expanded original informational copy for footer and utility pages.
const pageEditorial = {
  "privacy-policy": `## Introduction and scope

This page explains, in general terms, the personal information a visitor may choose to provide through advocatevishnusharma.com. The final production privacy policy must be checked against the actual hosting, analytics, email, cloud-storage and database setup. This is editable demonstration text, not a representation that particular systems are already operating.

## Information provided in enquiries

An enquiry may contain a name, telephone number, email address, category of legal matter, subject and a brief message. Please do not put identity-document scans, full financial-account details, passwords, OTPs or privileged evidence into an initial public form. An enquiry does not create a professional relationship.

## Intended uses

When the enquiry feature is configured, supplied details may be used to understand the general request, respond to the visitor, arrange appointments and maintain a record of communication. The office should set its actual operational retention and access policies before launch.

## Hosting, service providers and security

The demonstration project allows content and enquiries to be stored in a MongoDB database. Hosting providers, email services and image hosts may process technical information in accordance with their own terms. Configure transport security, limited administrator permissions, backups and access controls before production deployment.

## Retention and access

The administrator should establish retention periods consistent with applicable law and legitimate professional requirements. Requests concerning correction or data access should be reviewed under the laws that apply to the operational website.

## External links and analytics

Some pages may link to map providers, social platforms or YouTube. Such third-party websites operate independently. This template does not represent that a particular analytics tool or cookie category has been enabled.

## Contact and policy changes

For website-data questions, use the office details on the Contact page. Update this notice whenever data handling, infrastructure or applicable law changes.`,
  disclaimer: `## Important legal disclaimer

This website supplies general legal information concerning Indian law and possible consultation services. It is not intended as advertising, solicitation or a substitute for independent legal advice. Viewing pages, reading articles, completing a form or communicating through public links does not establish an advocate–client relationship.

## Voluntary access

Visitors confirm they have reached the site voluntarily to seek information. Any applicable professional-conduct requirements of the Bar Council of India and relevant rules should be independently reviewed before launch.

## No guarantee of result

Legal outcomes depend on facts, documentary evidence, judicial discretion, applicable legislation, procedural stage and other circumstances. Illustrative case examples or discussions of remedies are not promises about a particular matter.

## Accuracy and currency

Law, procedural practice and court interpretations change. Sample service content and blog posts may be incomplete or out of date and must be reviewed before publication and before being relied on.

## No confidential submission

Do not send privileged documents, identification scans or highly sensitive facts through an initial public enquiry. The office may be unable to accept representation because of availability, conflict or other professional reasons.

## Third-party services

Links to government resources, maps or media platforms are for convenience and do not imply endorsement. External content is maintained by its publisher.

## For urgent matters

If a court deadline, emergency or immediate threat exists, seek timely advice or contact appropriate emergency authorities. Do not assume that messages sent through this website are read immediately.

## Contact

For questions about the material or a possible appointment, use the official Contact page.`,
  "terms-of-use": `## Terms governing website use

The information on this website is educational and provided as-is. No professional relationship arises simply from browsing the site or sending an initial enquiry. The actual terms of any professional engagement must be agreed separately and in writing where appropriate.

## Permitted use

Visitors may review the public pages for their own information. Do not attempt to access protected administrative functions, overload the service, submit abusive content or misrepresent another person.

## Editorial and content rights

Written content in this project is original demonstration material. Images may use third-party sources and must be checked for licensing before publication. Reuse of content from other firms, news publishers or websites requires appropriate permission or independent authorship.

## No reliance or guaranteed accuracy

Law is contextual and may change. Information may be simplified or incomplete. Verify procedural requirements, official forms and deadlines with the relevant authority or qualified adviser before acting.

## Enquiries and consultation

Form submission is a request to be contacted, not a confirmed appointment or agreement to act. Responses, availability, fees and scope of work are confirmed separately.

## Links and technical operation

Third-party links are outside the office's control. The website may be updated or temporarily unavailable. Preview forms require MongoDB configuration to store enquiries; use the provided telephone or email alternatives if unavailable.

## Applicable law and revisions

These template terms should be reviewed and tailored for the site's actual operation under applicable Indian law. The office may update them when services or relevant rules change.`,
  "billing-and-fees": `## How consultation fees are discussed

Professional work differs in scope and complexity, so an accurate fee discussion begins with understanding what assistance is requested. A preliminary consultation, examination of a document set, preparation of notices, drafting of pleadings and court appearances are different services and may be scoped separately.

## Initial consultation

Before booking, ask whether a consultation fee applies, the expected duration and whether the meeting involves an oral discussion or a written opinion. Do not assume a telephone conversation or form submission constitutes a free legal opinion.

## Written scope of work

Where an engagement is accepted, parties should understand which proceedings, stages, appearances, drafts and communications are included. Professional fees should be distinguished from court fees, filing costs, travel, translation, notarisation and other third-party expenses.

## Stage-based work

Some matters can be divided into preliminary document review, pre-litigation communication, filing, interim applications, evidence, arguments and appellate steps. Fees may be discussed for the actual stages required rather than predicting an uncertain case duration.

## Payment safeguards

Confirm the correct payee, bank details and documentary acknowledgment through an official office communication before transferring funds. Do not pay an unverified third party claiming to act for the office.

## No guaranteed result

A professional fee is charged for agreed legal work, not for a guaranteed court decision. No success rate, award, refund arrangement or universal price is promised through this demonstration page.

## Questions to ask before engaging

- What legal work is included in the quoted scope?
- Which out-of-pocket expenses may arise separately?
- How will further hearings or appeals be agreed and charged?
- Who will communicate major case developments?
- What documents and authorisations are needed at the start?

For your particular matter, use the appointment page to request a discussion of scope and charges.`,
  "media-and-publications": `## Legal awareness and professional publications

This section is designed to present original legal education, articles, interviews and documentary appearances of Advocate Dr. Vishnu Sharma after verification. Placeholder material must not be mistaken for a published endorsement or media appearance.

## Original legal articles

The site's article library covers procedural questions concerning family, civil, criminal, commercial and NRI-related Indian law. Visitors can explore and filter individual articles by topic. Each article should receive legal and editorial review before production publication.

## Videos and presentations

Educational video slots are available for discussions of cheque dishonour, live-in relationships, senior-citizen protections, bail and other common legal questions. Add an official video URL or a related article link through the administration panel before treating a video as available.

## Interviews and third-party media

Only use a newspaper logo, broadcaster mark, interview claim, award name or publication cover when it is authentic, authorised and attributable to the practitioner. An unrelated firm's achievements are not part of this site's content.

## Corrections and copyright

If a factual mistake is found, the editorial administrator should update the published content and, where appropriate, add a correction. Respect the copyrights and personal rights of photographers, publishers and interview subjects.

## Invite an enquiry

For genuine interview requests or legal-education collaboration queries, use the Contact page to describe the proposed subject, organisation and time frame.`,
};
for (const p of pages) {
  if (pageEditorial[p.slug]) p.content = pageEditorial[p.slug];
}
videos.push(
  ...[
    {
      title: "What Is Mutual Consent Divorce?",
      description:
        "Demo video topic about matrimonial procedure, settlement and court requirements.",
      relatedHref: "/practice-areas/divorce-lawyer-india",
      thumbnail: books,
    },
    {
      title: "NRI Property and Power of Attorney",
      description:
        "Demo video topic about Indian title records, remote coordination and PoA safeguards.",
      relatedHref: "/practice-areas/nri-property-lawyer-india",
      thumbnail: pillar,
    },
    {
      title: "Bail, Remand and Investigation Stages",
      description:
        "Demo video topic explaining key procedural differences; this is not a published video.",
      relatedHref: "/practice-areas/criminal-lawyer-bail",
      thumbnail: court,
    },
    {
      title: "Property Documents Before Purchase",
      description:
        "Demo video topic on sale deeds, title search, possession and encumbrances.",
      relatedHref: "/practice-areas/real-estate-title-search",
      thumbnail: legal,
    },
    {
      title: "Child Custody and Welfare",
      description:
        "Demo video topic on court evaluation of custody and parenting arrangements.",
      relatedHref: "/practice-areas/child-custody-guardianship",
      thumbnail: books,
    },
    {
      title: "Money Recovery and Commercial Claims",
      description:
        "Demo video topic concerning overdue invoices and contractual enforcement.",
      relatedHref: "/practice-areas/money-recovery-suits",
      thumbnail: pillar,
    },
  ].map((v, i) => ({ ...v, youtubeUrl: "", order: i + 4, published: true })),
);
for (const v of videos.slice(0, 3))
  v.relatedHref = {
    "Live-in Relationships: Legal Rights in India":
      "/practice-areas/domestic-violence-law",
    "Understanding Cheque Bounce Law": "/practice-areas/cheque-bounce-ni-act",
    "Senior Citizens and Legal Protection": "/practice-areas/family-law",
  }[v.title];
