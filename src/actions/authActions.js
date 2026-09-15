"use server";

import crypto from "node:crypto";
import { createAdminSession, destroyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { hashPassword, verifyPassword } from "@/lib/password";

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export async function loginAdmin(_state, formData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };

  try {
    await connectDB();
    let admin = await Admin.findOne({ email }).select(
      "+passwordHash +passwordSalt",
    );

    if (
      !admin &&
      process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD &&
      safeEqual(email, process.env.ADMIN_EMAIL.toLowerCase()) &&
      safeEqual(password, process.env.ADMIN_PASSWORD)
    ) {
      const passwordData = await hashPassword(password);
      admin = await Admin.create({
        email,
        ...passwordData,
        name: "Advocate Vishnu Admin",
        role: "super-admin",
      });
    }

    if (
      !admin ||
      !admin.active ||
      !(await verifyPassword(password, admin.passwordHash, admin.passwordSalt))
    ) {
      return { error: "Invalid email or password." };
    }

    admin.lastLoginAt = new Date();
    await admin.save();
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    return {
      error: "Admin login is unavailable. Check the database configuration.",
    };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await destroyAdminSession();
  redirect("/admin/login");
}
