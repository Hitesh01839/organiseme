import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  email: z.email(),
  username: z.string(),
  password: z.string().min(8),
});
