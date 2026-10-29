import mongoose from "mongoose";

if (!global.__mongoosePromise) global.__mongoosePromise = null;
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing. See .env.example");
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!global.__mongoosePromise) {
    global.__mongoosePromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
  }
  try {
    await global.__mongoosePromise;
  } catch (error) {
    global.__mongoosePromise = null;
    throw error;
  }
  return mongoose;
}
