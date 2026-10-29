"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageCircleQuestion,
  Send,
  X,
  Sparkles,
  ArrowUpRight,
  Scale,
  LoaderCircle,
  RefreshCw,
  Phone,
  Mail,
  CalendarDays,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const PHONE = "+91 8171974067";
const EMAIL = "info@advocatevishnu.com";
const CONTACT_URL = "/contact";
const WEBSITE = "https://www.advocatevishnu.com";

const contactLinks = [
  { title: "Contact Us", href: CONTACT_URL },
  { title: "Call Office", href: "tel:+918171974067" },
];

const groups = [
  {
    category: "Office & Contact",
    answer: `You can contact Advocate Dr. Vishnu Sharma's office at ${PHONE} or email ${EMAIL}. Office hours listed on the website are Monday to Saturday, 10:00 AM to 7:00 PM IST. You can also submit a consultation request through the Contact Us page.`,
    links: contactLinks,
    questions: [
      "How can I contact your office?",
      "What is your office phone number?",
      "How can I connect with the office by phone?",
      "What is your official email address?",
      "What are your office working hours?",
      "Is your office open on Saturdays?",
      "How can I send an email to your office?",
      "How do I submit an enquiry?",
      "Where can I find your contact details?",
      "How can I speak to the office team?",
    ],
  },
  {
    category: "Advocate Profile",
    answer:
      "Advocate Dr. Vishnu Sharma is a legal professional practising in civil and criminal matters, among other areas. His website profile also describes his former leadership roles at the Bar Council of Delhi and his work with LAWVS Legal India. Visit the About page for further profile information.",
    links: [
      { title: "About the Advocate", href: "/about" },
      { title: "Contact for Consultation", href: CONTACT_URL },
    ],
    questions: [
      "Who is Advocate Dr. Vishnu Sharma?",
      "What is Advocate Dr. Vishnu Sharma known for?",
      "What is the advocate's professional background?",
      "Which legal matters does the advocate handle?",
      "What is the advocate's experience in law?",
      "What was his role at the Bar Council of Delhi?",
      "What is LAWVS Legal India?",
      "Where can I read the advocate's biography?",
      "How can I learn more about the advocate?",
      "How can I request a consultation with the advocate?",
    ],
  },
  {
    category: "Appointments & Consultation",
    answer:
      "To request a consultation, visit the Contact Us page and submit your name, contact information and a brief description of your legal matter. You may also call the office at +91 8171974067. The office team can guide you about the next steps and availability.",
    links: [
      { title: "Book / Request Consultation", href: CONTACT_URL },
      { title: "Call Office", href: "tel:+918171974067" },
    ],
    questions: [
      "How can I book a legal consultation?",
      "How do I schedule an appointment?",
      "Can I request an online consultation?",
      "Can I discuss my case before booking?",
      "How can I ask about consultation fees?",
      "What happens during the first consultation?",
      "How can I reschedule my appointment?",
      "What details should I provide for an appointment?",
      "How can I request an urgent consultation?",
      "How do I know if an appointment is confirmed?",
    ],
  },
  {
    category: "Website Help",
    answer:
      "You can explore the official website to learn about legal services, the advocate's profile, legal articles and consultation options. For a specific enquiry, use the Contact Us page or call +91 8171974067.",
    links: [
      { title: "Visit Website", href: WEBSITE },
      { title: "Contact Us", href: CONTACT_URL },
    ],
    questions: [
      "What information is available on this website?",
      "Where can I find the legal services offered?",
      "Where can I read legal articles?",
      "How do I find the advocate's profile?",
      "Where can I submit a legal enquiry?",
      "Can I use this website to request legal help?",
      "Where can I find the latest legal updates?",
      "How do I navigate the website?",
      "How can I report a website issue?",
      "Where can I find the official contact page?",
    ],
  },
  {
    category: "Civil & Property Law",
    answer:
      "Civil and property matters can involve ownership records, agreements, notices, possession, inheritance or other disputes. Keep relevant documents and a timeline of events ready. The appropriate legal options depend on the facts and applicable law, so consider obtaining advice from a qualified advocate.",
    links: contactLinks,
    questions: [
      "How can I resolve a property dispute?",
      "What documents are needed for a property case?",
      "What should I do about disputed land ownership?",
      "How can I handle an inheritance dispute?",
      "What if someone occupies my property illegally?",
      "How can I resolve a boundary dispute?",
      "What should I do if a property agreement is breached?",
      "Can I send a legal notice for a property dispute?",
      "How can I deal with a civil dispute?",
      "What documents should I bring to a property consultation?",
    ],
  },
  {
    category: "Family & Matrimonial Law",
    answer:
      "Family and matrimonial matters depend on the facts, applicable personal law and relevant legal procedures. Documents such as marriage proof, identity records, communications and financial records may be useful, depending on the issue. A qualified family-law advocate can explain the options for your circumstances.",
    links: contactLinks,
    questions: [
      "What documents are needed for divorce?",
      "How does mutual consent divorce work?",
      "What is a contested divorce?",
      "How can I seek child custody?",
      "How is maintenance decided?",
      "What can I do about domestic disputes?",
      "Can a lawyer help with marital disputes?",
      "What documents should I bring for a family case?",
      "How can I understand my matrimonial legal options?",
      "How do I request a family-law consultation?",
    ],
  },
  {
    category: "Criminal Law & Police Matters",
    answer:
      "If you are involved in a criminal matter, preserve relevant documents, messages and other evidence, and seek advice from a qualified criminal-law advocate promptly. If there is an immediate threat to safety, contact local emergency services. The correct procedure depends on the circumstances and applicable law.",
    links: contactLinks,
    questions: [
      "What should I do if an FIR is registered against me?",
      "How can I seek legal help after an arrest?",
      "What should I do if police call me for questioning?",
      "How can I report a criminal offence?",
      "What is anticipatory bail?",
      "What should I do if I receive a court summons?",
      "Can a lawyer help with a criminal complaint?",
      "What evidence should I preserve for a criminal case?",
      "How can I prepare for a criminal-law consultation?",
      "How do I get advice about a bail matter?",
    ],
  },
  {
    category: "Legal Notices & Court Cases",
    answer:
      "Read the notice or court document carefully, note every deadline and preserve the envelope, attachments and related records. Avoid ignoring the matter or sending an impulsive reply. A qualified advocate can review the document and explain the appropriate response based on your situation.",
    links: contactLinks,
    questions: [
      "What should I do after receiving a legal notice?",
      "How can I reply to a legal notice?",
      "What happens if I ignore a legal notice?",
      "How can I prepare for a court hearing?",
      "What should I do after receiving a court summons?",
      "Which documents are useful for a court case?",
      "How can I check the progress of my case?",
      "How do I prepare a timeline of legal events?",
      "When should I consult an advocate about a notice?",
      "Can I get legal help reviewing a document?",
    ],
  },
  {
    category: "Business & Commercial Law",
    answer:
      "Business disputes may involve unpaid invoices, contracts, delayed payments, partnership issues or breach of agreed terms. Preserve contracts, invoices, payment records and relevant communications. The suitable remedy depends on the agreement, evidence, limitation periods and applicable law.",
    links: contactLinks,
    questions: [
      "How can a business recover unpaid invoices?",
      "What can I do if a client does not pay?",
      "How can I handle a breach of contract?",
      "What documents are needed for a commercial dispute?",
      "How can I recover money under an agreement?",
      "What should I do if a business partner breaches an agreement?",
      "Can an advocate review a business contract?",
      "How can I respond to a payment dispute?",
      "What evidence should I preserve for a business case?",
      "How can I request a commercial-law consultation?",
    ],
  },
  {
    category: "NRI & General Legal Guidance",
    answer:
      "Legal matters involving NRIs can depend on the location of the property, parties, documents and proceedings. Keep copies of relevant records and seek advice on jurisdiction, representation and any required authorisation. General information cannot replace advice based on the full facts of your case.",
    links: contactLinks,
    questions: [
      "How can an NRI handle a property dispute in India?",
      "Can an NRI request a legal consultation remotely?",
      "What documents may an NRI need for a property case?",
      "How does a power of attorney work?",
      "How can I seek legal help while living abroad?",
      "What should I do if someone owes me money?",
      "How can I find out which type of advocate I need?",
      "What should I prepare before contacting an advocate?",
      "Can I ask a general legal question through this website?",
      "How do I contact the office from outside India?",
    ],
  },
];

const suggestions = groups.flatMap((group, groupIndex) =>
  group.questions.map((question, questionIndex) => ({
    id: `${groupIndex}-${questionIndex}`,
    question,
    answer: group.answer,
    category: group.category,
    links: group.links,
  })),
);

function normalizeQuestion(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[?!.,'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const initialMessage = {
  role: "bot",
  text: "Namaste! Welcome to Advocate Dr. Vishnu Sharma's legal assistant. I can help you explore the website, office contact details, consultation options and general legal topics. Choose a suggested question or type your own.",
  links: [
    { title: "Contact Us", href: CONTACT_URL },
    { title: "View Advocate Profile", href: "/about" },
  ],
};

export default function LegalChat({ initialOpen = false }) {
  const [open, setOpen] = useState(initialOpen);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [suggestionStart, setSuggestionStart] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const endRef = useRef(null);
  const requestLock = useRef(false);
  const abortRef = useRef(null);
  const answerCache = useRef(new Map());

  // const visibleSuggestions = Array.from(
  //   { length: 4 },
  //   (_, index) => suggestions[(suggestionStart + index) % suggestions.length],
  // );

  const visibleSuggestions = suggestions
    .filter((item) => !usedQuestions.includes(item.id))
    .slice(0, 4);

  const nextSuggestions = () => {
    setUsedQuestions((prev) => {
      const currentVisibleIds = suggestions
        .filter((item) => !prev.includes(item.id))
        .slice(0, 4)
        .map((item) => item.id);

      return [...prev, ...currentVisibleIds];
    });
  };
  useEffect(() => {
    if (open && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, busy, open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  function addMessage(message) {
    setMessages((previous) => [...previous, message].slice(-30));
  }

  async function send(input) {
    const query = String(input ?? question).trim();

    if (requestLock.current || query.length < 3 || query.length > 600) {
      return;
    }

    requestLock.current = true;
    setBusy(true);
    setQuestion("");
    addMessage({ role: "user", text: query });

    try {
      // Predefined questions are answered locally: no Gemini/API request.
      const predefined = suggestions.find(
        (item) => normalizeQuestion(item.question) === normalizeQuestion(query),
      );

      if (predefined) {
        addMessage({
          role: "bot",
          text: predefined.answer,
          links: predefined.links,
          category: predefined.category,
        });
        return;
      }

      // Reuse repeated custom answers during this page session.
      const cacheKey = normalizeQuestion(query);
      const cached = answerCache.current.get(cacheKey);

      if (cached && Date.now() - cached.time < 6 * 60 * 60 * 1000) {
        addMessage({
          role: "bot",
          text: cached.answer,
          links: cached.links || [],
        });
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
        signal: controller.signal,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorText =
          response.status === 429
            ? "The assistant has reached its current request limit. Please try again later or contact the office directly."
            : result.error ||
              "Sorry, I could not process your question right now.";

        addMessage({
          role: "bot",
          text: errorText,
          links: contactLinks,
        });
        return;
      }

      const answer =
        result.answer ||
        "I could not find an answer to that question. Please contact the office for assistance.";

      const safeLinks = Array.isArray(result.links)
        ? result.links.filter(
            (link) =>
              link &&
              typeof link.title === "string" &&
              typeof link.href === "string" &&
              (link.href.startsWith("/") ||
                link.href.startsWith("https://") ||
                link.href.startsWith("http://") ||
                link.href.startsWith("tel:") ||
                link.href.startsWith("mailto:")),
          )
        : [];

      answerCache.current.set(cacheKey, {
        answer,
        links: safeLinks,
        time: Date.now(),
      });

      if (answerCache.current.size > 50) {
        const oldestKey = answerCache.current.keys().next().value;
        if (oldestKey) answerCache.current.delete(oldestKey);
      }

      addMessage({
        role: "bot",
        text: answer,
        links: safeLinks,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        addMessage({
          role: "bot",
          text: "Connection problem. Please try again or contact our office directly.",
          links: contactLinks,
        });
      }
    } finally {
      abortRef.current = null;
      requestLock.current = false;
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open legal assistant"
          className="fixed bottom-5 left-4 z-[70] flex items-center gap-2 rounded-full bg-[var(--theme-primary)] px-4 py-3 text-sm font-bold text-white shadow-2xl transition hover:-translate-y-1 sm:left-6"
        >
          <MessageCircleQuestion size={20} />
          Ask Legal Question
        </button>
      )}

      {open && (
        <section
          aria-label="Legal assistant chat"
          className="fixed bottom-3 left-3 z-[80] flex h-[calc(100dvh-24px)] max-h-[760px] w-[calc(100vw-24px)] max-w-[410px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:bottom-6 sm:left-6 sm:h-[min(760px,calc(100dvh-48px))]"
        >
          {/* Header - fixed at top */}
          <header className="flex shrink-0 items-center justify-between gap-3 bg-[var(--theme-dark)] px-4 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Scale size={23} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">Legal Assistant</h2>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/75">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Ai Agent
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="shrink-0 rounded-full p-2 transition hover:bg-white/15"
            >
              <X size={21} />
            </button>
          </header>

          {/* Quick contact bar - fixed below header */}
          <div className="grid shrink-0 grid-cols-2 gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2.5">
            <a
              href="tel:+918171974067"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
            >
              <Phone size={15} />
              Call Office
            </a>

            <Link
              href={CONTACT_URL}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
            >
              <CalendarDays size={15} />
              Consultation
            </Link>
          </div>

          {/* ONE SCROLL AREA: Answers + Suggested Questions */}
          <div
            className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain scroll-smooth"
            role="log"
            aria-live="polite"
            aria-label="Chat answers and suggested questions"
          >
            {/* Chat messages */}
            <div className="space-y-4 px-3 py-4 sm:px-4">
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-[var(--theme-primary)] text-white"
                        : "rounded-bl-md border border-slate-100 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {message.role === "bot" && (
                      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--theme-dark)]">
                        <Sparkles size={13} />
                        {message.category || "Legal Assistant"}
                      </div>
                    )}

                    <p className="whitespace-pre-wrap break-words">
                      {message.text}
                    </p>

                    {message.links?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.links.map((link, linkIndex) => {
                          const external = /^(https?:|tel:|mailto:)/i.test(
                            link.href,
                          );

                          return (
                            <a
                              key={`${link.href}-${linkIndex}`}
                              href={link.href}
                              target={
                                link.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                link.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              onClick={() => {
                                if (!external) setOpen(false);
                              }}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                            >
                              {link.title}
                              {external ? (
                                <ExternalLink size={12} />
                              ) : (
                                <ArrowUpRight size={12} />
                              )}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {busy && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                    <LoaderCircle size={16} className="animate-spin" />
                    Preparing your answer...
                  </div>
                </div>
              )}
            </div>

            {/* Suggested questions - answer ke footer mein */}
            <div className="border-t border-slate-100 bg-white px-3 py-4 sm:px-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Suggested Questions
                </p>

                <button
                  type="button"
                  onClick={nextSuggestions}
                  disabled={busy}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[var(--theme-dark)] transition hover:bg-slate-100 disabled:opacity-40"
                >
                  <RefreshCw size={13} />
                  Next Questions
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {visibleSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setUsedQuestions((prev) =>
                        prev.includes(item.id) ? prev : [...prev, item.id],
                      );

                      send(item.question);
                    }}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-left text-xs leading-5 text-slate-700 transition hover:border-[var(--theme-primary)] hover:bg-slate-50 disabled:opacity-50"
                  >
                    <span>{item.question}</span>
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll target at the end of messages + suggestions */}
            <div ref={endRef} />
          </div>

          {/* Input footer - always visible */}
          <div className="shrink-0 border-t border-slate-100 bg-white px-3 pb-3 pt-2 sm:px-4">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
              className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 focus-within:border-slate-400"
            >
              <textarea
                rows={1}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    send();
                  }
                }}
                maxLength={600}
                placeholder="Type your legal question..."
                aria-label="Type your legal question"
                className="max-h-24 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={busy || question.trim().length < 3}
                aria-label="Send question"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-primary)] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </form>

            <p className="mt-2 flex items-start gap-1.5 text-[10px] leading-4 text-slate-400">
              <Scale size={12} className="mt-0.5 shrink-0" />
              General information only; not a substitute for legal advice based
              on your specific circumstances.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 hover:text-slate-800"
            >
              <Mail size={11} />
              {EMAIL}
            </a>
          </div>
        </section>
      )}
    </>
  );
}
