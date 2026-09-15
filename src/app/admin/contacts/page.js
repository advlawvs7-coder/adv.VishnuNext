import { getContacts } from "@/actions/contactActions";
import AdminContactActions from "@/components/AdminContactActions";
export const dynamic = "force-dynamic";
export default async function Contacts() {
  const { data = [] } = await getContacts();
  return (
    <>
      <h1 className="text-3xl font-black">Consultation Enquiries</h1>
      <p className="text-slate-500 mt-1">
        Messages submitted through the website.
      </p>
      <div className="space-y-4 mt-7">
        {data.map((c) => (
          <article
            key={c._id}
            className="bg-white rounded-2xl border border-slate-200 p-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <h2 className="font-black">{c.name}</h2>
                <p className="text-sm text-slate-500">
                  {c.email} {c.phone && `• ${c.phone}`}
                </p>
                <p className="text-xs text-amber-700 font-bold mt-2">
                  {c.subject || "Legal consultation"}
                </p>
              </div>
              <AdminContactActions contact={c} />
            </div>
            <p className="mt-4 text-sm text-slate-700 whitespace-pre-wrap">
              {c.message}
            </p>
            <p className="text-xs text-slate-400 mt-4">
              {new Date(c.createdAt).toLocaleString("en-IN")}
            </p>
          </article>
        ))}
        {!data.length && (
          <p className="bg-white p-8 rounded-2xl text-center text-slate-500">
            No enquiries yet.
          </p>
        )}
      </div>
    </>
  );
}
