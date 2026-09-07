import { createContactRecord } from "@/lib/contactService";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const input = contentType.includes("application/json") ? await request.json() : await request.formData();
    const result = await createContactRecord(input);
    return Response.json({ success: result.success, message: result.message, id: result.id }, { status: result.status });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return Response.json({ success: false, message: "Your request could not be submitted. Please try again or call +91 8171974067." }, { status: 500 });
  }
}
