import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env.local");

let cached = global.mongoose || { conn: null, promise: null };

export async function connectMongoose() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "nextauth_db",
    });
  }
  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}
