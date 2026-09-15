import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Contact from "@/models/Contact";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  await connectDB();
  const [blogs, published, enquiries, newEnquiries] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ published: true }),
    Contact.countDocuments(),
    Contact.countDocuments({ status: "new" }),
  ]);
  const cards = [
    ["Total Blogs", blogs],
    ["Published", published],
    ["Enquiries", enquiries],
    ["New Enquiries", newEnquiries],
  ];
  return (
    <>
      <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
      <p className="text-slate-500 mt-2">Website content and lead overview.</p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {cards.map(([label, value]) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-3xl font-black text-slate-900 mt-2">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
