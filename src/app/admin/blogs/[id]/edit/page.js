import { notFound } from "next/navigation"; import { getAdminBlog } from "@/actions/blogActions"; import AdminBlogForm from "@/components/AdminBlogForm";
export const dynamic="force-dynamic";
export default async function EditBlog({params}){const {id}=await params;const result=await getAdminBlog(id);if(!result.data)notFound();return <><h1 className="text-3xl font-black">Edit Blog</h1><AdminBlogForm blog={result.data}/></>}

