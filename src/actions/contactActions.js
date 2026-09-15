"use server";

import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { createContactRecord } from "@/lib/contactService";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

/**
 * SUBMIT CONTACT FORM
 */
export async function submitContact(data) {
  try {
    const result = await createContactRecord(data);

    revalidatePath("/admin/contacts");

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error("SUBMIT CONTACT ERROR:", error);

    return {
      success: false,
      message:
        "Your request could not be submitted. Please try again or call +91 8171974067.",
    };
  }
}

/**
 * GET CONTACTS
 */
export async function getContacts() {
  try {
    await requireAdmin();
    await connectDB();

    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(contacts)),
    };
  } catch (error) {
    console.error("GET CONTACTS ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch contacts.",
      data: [],
    };
  }
}

/**
 * UPDATE CONTACT STATUS
 */
export async function updateContactStatus(id, status) {
  try {
    await requireAdmin();
    await connectDB();

    const allowedStatus = ["new", "read", "replied"];

    if (!allowedStatus.includes(status)) {
      return {
        success: false,
        message: "Invalid contact status.",
      };
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!contact) {
      return {
        success: false,
        message: "Contact not found.",
      };
    }

    revalidatePath("/admin/contacts");

    return {
      success: true,
      message: "Contact status updated.",
      data: JSON.parse(JSON.stringify(contact)),
    };
  } catch (error) {
    console.error("UPDATE CONTACT STATUS ERROR:", error);

    return {
      success: false,
      message: "Failed to update contact status.",
    };
  }
}

/**
 * DELETE CONTACT
 */
export async function deleteContact(id) {
  try {
    await requireAdmin();
    await connectDB();

    if (!id) {
      return {
        success: false,
        message: "Contact ID is required.",
      };
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return {
        success: false,
        message: "Contact not found.",
      };
    }

    revalidatePath("/admin/contacts");

    return {
      success: true,
      message: "Contact deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);

    return {
      success: false,
      message: "Failed to delete contact.",
    };
  }
}
