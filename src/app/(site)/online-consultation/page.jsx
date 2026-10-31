import { PageBanner } from "@/components/site/Elements";
import InquiryForm from "@/components/site/InquiryForm";
import { Globe2, FileText, LockKeyhole } from "lucide-react";
export const metadata = {
  title: "Online Legal Consultation | Advocate Dr. Vishnu Sharma",
};
export default function OnlineConsultation() {
  return (
    <>
      <PageBanner
        eyebrow="Consultation"
        title="Online Consultation"
        description="Send a preliminary enquiry from India or overseas about an India-related legal matter."
        image={
          "https://res.cloudinary.com/damwcqwvs/image/upload/v1793347032/6.jpg"
        }
      />
      <section className="section-pad container-site grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <h2 className="display-title mb-7">Discuss Your Legal Concern</h2>
          <p className="mb-7 leading-8 text-[var(--theme-muted)]">
            Submit only a general description of the issue. The office can
            review your request for availability. A form submission alone does
            not mean the matter is accepted or that legal advice has been
            provided.
          </p>
          <div className="space-y-6">
            {[
              [
                Globe2,
                "Domestic & overseas enquiries",
                "For people seeking information about legal proceedings in India.",
              ],
              [
                FileText,
                "Initial subject review",
                "Identify the general issue and relevant appointment type.",
              ],
              [
                LockKeyhole,
                "Avoid sensitive attachments",
                "Wait for engagement and secure-document instructions before sharing confidential papers.",
              ],
            ].map(([Icon, t, d]) => (
              <div key={t} className="flex items-start gap-4">
                <Icon size={26} className="shrink-0 text-gold" />
                <div>
                  <h3 className="font-serif text-xl font-bold">{t}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--theme-muted)]">
                    {d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[var(--theme-border)] bg-sand p-6 md:p-10">
          <InquiryForm source="Online Consultation" />
        </div>
      </section>
    </>
  );
}
