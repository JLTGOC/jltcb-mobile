import * as z from "zod";

import { fileSchema } from "../fileSchema";

export const contactNumberSchema = z
	.string()
	.trim()
	.length(11, "Contact number must be 11 digits.")
	.regex(/^09\d{9}$/, "Must be a valid PH mobile number starting with 09.");

export const sharedStep1FormSchema = z.object({
	companyName: z.string().trim().min(1, "Company name is required."),
	companyAddress: z.string().trim().min(1, "Company address is required."),
	companyContactNumber: contactNumberSchema,
	companyEmail: z.email("Invalid email address."),
});
export type SharedStep1FormData = z.infer<typeof sharedStep1FormSchema>;

export const step3FormSchema = z.object({
	documents: z
		.array(fileSchema)
		.min(1, "At least one document must be uploaded."),
	remarks: z.string().trim(),
});
export type Step3FormData = z.infer<typeof step3FormSchema>;
