import { getBlogs } from "@/actions/blogActions";
import BlogExplorer from "@/components/BlogExplorer";
export const dynamic = "force-dynamic";
export const metadata = { title: "Legal Blogs & Articles | Advocate Dr. Vishnu Sharma", description: "Practical legal insights on civil, criminal, matrimonial and corporate law by Advocate Dr. Vishnu Sharma." };
export default async function BlogsPage(){const result=await getBlogs();return <main className="min-h-screen premium-texture-bg pt-28 pb-16 bg-slate-50"><div className="max-w-7xl mx-auto px-4"><div className="border-l-4 border-amber-500 pl-4 mb-10"><p className="text-xs font-bold uppercase tracking-widest text-amber-600">Legal Knowledge Hub</p><h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Legal Blogs & Articles</h1><p className="text-sm text-slate-500 max-w-2xl mt-2">Clear, practical legal guidance from 17+ years of litigation experience.</p></div><BlogExplorer blogs={result.data||[]}/></div></main>}
