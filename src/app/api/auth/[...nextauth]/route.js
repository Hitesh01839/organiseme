import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { clientPromise } from "@/lib/db";

import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectMongoose } from "@/lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        await connectMongoose();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found");

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) throw new Error("Invalid password");

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: { signIn: "/login" },
  secret: process.env.AUTH_SECRET,
});

export const { GET, POST } = handlers;
