"use server";

import { signIn } from "@/app/api/auth/[...nextauth]/route";
import { loginSchema, signUpSchema } from "@/lib/validation";

export const loginUserAction = async (prevState, formData) => {
  const email = formData.get("email").toString();
  const password = formData.get("password").toString();

  const validation = await loginSchema.safeParseAsync({ email, password });

  if (!validation.success)
    return {
      success: false,
      message: JSON.parse(validation.error.message)[0].message,
    };

  const res = await signIn("credentials", {
    redirect: false,
    email: email,
    password: password,
  });

  if (res.ok === false) {
    return { success: false, message: res.error };
  }

  return {
    success: true,
    message: "Logged in successfully!",
  };
};

export const signUpUserAction = async (prevState, formData) => {
  const email = formData.get("email").toString();
  const username = formData.get("username").toString();
  const password = formData.get("password").toString();

  const baseUrl = process.env.NEXTAUTH_URL;

  const validation = await signUpSchema.safeParseAsync({
    email,
    username,
    password,
  });

  if (!validation.success)
    return {
      success: false,
      message: JSON.parse(validation.error.message)[0].message,
      // message: validation.error.message,
    };

  const res = await fetch(`${baseUrl}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (res.ok === false) {
    return { success: false, message: res.error };
  }

  return {
    success: true,
    message: "Registerd successfully!",
  };
};
