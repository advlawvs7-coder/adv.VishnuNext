import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { PageBanner } from "@/components/site/Elements";
import { Page, one } from "@/lib/content";
export const metadata = {
  title: "Media & Publications | Advocate Dr. Vishnu Sharma",
};
export default async function Media() {
  const p = await one(Page, {
    slug: "media-and-publications",
    published: true,
  });
  return (
    <>
      <PageBanner
        eyebrow="Professional Publications"
        title="Media & Publications"
        description="A reserved area for verified editorial contributions and appearances."
        image={
          "https://res.cloudinary.com/damwcqwvs/image/upload/v1793347032/7.jpg"
        }
      />
      <div className="section-pad container-site">
        <div className="prose-content mx-auto max-w-3xl">
          <ReactMarkdown>
            {p?.content ||
              "Verified publications and appearances may be added here."}
          </ReactMarkdown>
          <Link href="/videos" className="btn-dark mt-7">
            Legal Awareness Videos
          </Link>
        </div>
      </div>
    </>
  );
}
