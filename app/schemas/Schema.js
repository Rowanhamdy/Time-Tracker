import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "FirstName is required"),
  lastName: z.string().min(1, "LastName is required"),
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
