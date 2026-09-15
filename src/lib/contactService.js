import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function createContactRecord(input) {
  const values =
    input instanceof FormData ? Object.fromEntries(input.entries()) : input;
  const name = String(values?.name || "").trim();
  const email = String(values?.email || "")
    .trim()
    .toLowerCase();
  const phone = String(values?.phone || "").trim();
  const subject = String(values?.subject || "").trim();
  const message = String(values?.message || "").trim();

  if (!name || !email || !message)
    return {
      success: false,
      status: 400,
      message: "Name, email and message are required.",
    };
  if (!/^\S+@\S+\.\S+$/.test(email))
    return {
      success: false,
      status: 400,
      message: "Please enter a valid email address.",
    };
  if (
    name.length > 100 ||
    email.length > 160 ||
    phone.length > 25 ||
    subject.length > 180 ||
    message.length > 5000
  ) {
    return {
      success: false,
      status: 400,
      message:
        "Some form details are too long. Please shorten them and try again.",
    };
  }

  await connectDB();
  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
  });
  if (!contact?._id) throw new Error("Contact record was not created");

  return {
    success: true,
    status: 201,
    message:
      "Your consultation request has been submitted successfully. Our team will contact you soon.",
    id: contact._id.toString(),
  };
}
