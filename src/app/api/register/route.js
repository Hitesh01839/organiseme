import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectMongoose } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectMongoose();
    const { username, email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashed });
    console.log(newUser);
    return NextResponse.json(newUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
