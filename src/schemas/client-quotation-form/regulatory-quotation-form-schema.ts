import * as z from "zod";
import { CLIENT_TYPES } from "@/src/types/jobOrderEnums";
import {
	contactNumberSchema,
	sharedStep1FormSchema,
	step3FormSchema,
} from "./shared-form-schema";

export const extendedRegulatoryQuotationFormSchema = z
	.object({
		fullName: z.string().trim().min(1, "Full name is required."),
		companyPosition: z.string().trim().min(1, "Company position is required."),
		companyBusinessType: z.string().trim().min(1, "Business type is required."),
		companyContactPerson: z.string().trim(),
		companyContactPersonContactNumber: contactNumberSchema.or(z.literal("")),

		// Step 2
		type_of_regulatory_assistance: z
			.array(z.string())
			.min(1, "At least one type must be selected."),
		service_level: z.enum(CLIENT_TYPES, "Application type is required."),
		message: z.string().trim(),
	})
	.extend(step3FormSchema.shape);
export type ExtendedRegulatoryQuotationFormData = z.infer<
	typeof extendedRegulatoryQuotationFormSchema
>;

export const regulatoryQuotationFormSchema = sharedStep1FormSchema.extend(
	extendedRegulatoryQuotationFormSchema.shape,
);
export type RegulatoryQuotationFormData = z.infer<
	typeof regulatoryQuotationFormSchema
>;

export const regulatoryStep1FormSchema = regulatoryQuotationFormSchema.pick({
	fullName: true,
	companyName: true,
	companyAddress: true,
	companyPosition: true,
	companyContactNumber: true,
	companyEmail: true,
	companyBusinessType: true,
	companyContactPerson: true,
	companyContactPersonContactNumber: true,
});
export type RegulatoryStep1FormData = z.infer<typeof regulatoryStep1FormSchema>;

export const regulatoryStep2FormSchema = regulatoryQuotationFormSchema.pick({
	type_of_regulatory_assistance: true,
	service_level: true,
	message: true,
});
export type RegulatoryStep2FormData = z.infer<typeof regulatoryStep2FormSchema>;
