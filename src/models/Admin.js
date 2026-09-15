import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    passwordSalt: { type: String, required: true, select: false },
    name: { type: String, default: "Administrator", trim: true },
    role: {
      type: String,
      enum: ["admin", "super-admin"],
      default: "super-admin",
    },
    active: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "admins" },
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
