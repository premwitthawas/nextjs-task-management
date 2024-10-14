import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is Required").email(),
  password: z.string().min(8, "Password must more than 8 characters."),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().trim().min(1, "Email is Required").email(),
  password: z.string().min(8, "Password must more than 8 characters."),
});
