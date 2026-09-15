import Link from "next/link";
import { getAdminBlogs } from "@/actions/blogActions";
import AdminBlogActions from "@/components/AdminBlogActions";
export const dynamic = "force-dynamic";
export default async function AdminBlogs() {
  const { data: blogs = [] } = await getAdminBlogs();
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">Manage Blogs</h1>
          <p className="text-slate-500 mt-1">
            Create, edit and control publishing.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="bg-slate-900 text-amber-400 px-5 py-3 rounded-lg font-bold"
        >
          Add Blog
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 mt-7 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">Article</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="p-4">
                  <b>{blog.title}</b>
                  <p className="text-xs text-slate-500 mt-1">/{blog.slug}</p>
                </td>
                <td className="p-4">
                  {blog.published ? "Published" : "Draft"}
                </td>
                <td className="p-4">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="p-4">
                  <AdminBlogActions blog={blog} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!blogs.length && (
          <p className="p-8 text-center text-slate-500">No blogs yet.</p>
        )}
      </div>
    </>
  );
}
