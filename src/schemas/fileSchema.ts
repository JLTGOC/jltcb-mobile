import * as z from "zod";

export const fileSchema = z.object({
	uri: z.string(),
	name: z.string(),
	mimeType: z.string().optional(),
	size: z.number().positive().optional(),
	lastModified: z.number(),
});
