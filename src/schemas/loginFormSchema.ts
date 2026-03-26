import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Username or email is required."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
