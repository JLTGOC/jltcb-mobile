import * as z from "zod";

export const searchSchema = z.object({
  search: z.string().trim(),
});
export type SearchForm = z.infer<typeof searchSchema>;
