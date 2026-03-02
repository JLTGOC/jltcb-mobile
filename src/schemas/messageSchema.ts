import * as z from "zod";

export const messageFormSchema = z.object({
  content: z.string().trim(),
});

export type MessageForm = z.infer<typeof messageFormSchema>;
