import * as z from "zod";
import {
  ACCREDITED_TYPES,
  CLIENT_TYPES,
  SERVICE_LEVEL_TYPES,
} from "../types/jobOrderEnums";

export const subjectSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required."),
  email_body: z.string().trim().min(1, "Message is required."),
});

export const clientInfoSchema = z.object({
  client_type: z.enum(CLIENT_TYPES, "Client type is required."),
  accredited: z.enum(ACCREDITED_TYPES, "Accredited is required."),
  remarks: z.string().trim(),
});

export const serviceInfoSchema = z.object({
  service_level: z.enum(SERVICE_LEVEL_TYPES, "Service level is required."),
  bl_no: z.string().trim().min(1, "BL No. is required."),
  eta: z.iso.datetime("Estimated time of arrival is required."),
  etd: z.iso.datetime("Estimated time of departure is required."),
});

// export const step1Schema = z.object({
//   subject: subjectSchema,
//   client: clientInfoSchema,
//   service: serviceInfoSchema,
// });
export const step1Schema = z.object({
  subject: z.string().trim().min(1, "Subject is required."),
  email_body: z.string().trim().min(1, "Message is required."),
  client_type: z.enum(CLIENT_TYPES, "Client type is required."),
  accredited: z.enum(ACCREDITED_TYPES, "Accredited is required."),
  remarks: z.string().trim(),
  service_level: z.enum(SERVICE_LEVEL_TYPES, "Service level is required."),
  bl_no: z.string().trim().min(1, "BL No. is required."),
  eta: z.iso.datetime("Estimated time of arrival is required."),
  etd: z.iso.datetime("Estimated time of departure is required."),
});
export type Step1Fields = z.infer<typeof step1Schema>;
