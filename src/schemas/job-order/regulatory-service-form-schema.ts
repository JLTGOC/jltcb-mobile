import * as z from "zod";

import { ACCREDITED_TYPES, CLIENT_TYPES } from "@/types/jobOrderEnums";

export const regulatoryServiceFormSchema = z.object({
	subject: z.string().trim().min(1, "Subject is required."),
	email_body: z.string().trim().min(1, "Email body is required."),
	client_type: z.enum(CLIENT_TYPES, "Client type is required."),
	service: z.string().trim().min(1, "Service is required."),
	accredited: z.enum(ACCREDITED_TYPES, "Accredited is required."),
	remarks: z.string().trim(),
});
export type RegulatoryServiceFormSchema = z.infer<
	typeof regulatoryServiceFormSchema
>;
