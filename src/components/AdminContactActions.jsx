"use client";
import { useRouter } from "next/navigation"; import { deleteContact,updateContactStatus } from "@/actions/contactActions";
export default function AdminContactActions({contact}){const router=useRouter();return <div className="flex gap-2"><select value={contact.status} onChange={async e=>{await updateContactStatus(contact._id,e.target.value);router.refresh()}} className="border rounded px-2 py-2 text-xs"><option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option></select><button onClick={async()=>{if(confirm("Delete this enquiry?")){await deleteContact(contact._id);router.refresh()}}} className="text-xs text-red-700 bg-red-50 px-3 rounded">Delete</button></div>}

