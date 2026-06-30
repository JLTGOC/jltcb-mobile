<<<<<<< HEAD
=======
import * as z from "zod";

>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
import {
  ACCREDITED_TYPES,
  BILLING_TYPES,
  CLIENT_TYPES,
  SERVICE_LEVEL_TYPES,
<<<<<<< HEAD
} from "@/src/types/jobOrderEnums";
import * as z from "zod";

export const logisticsServiceFormSchema = z.object({
=======
} from "@/types/jobOrderEnums";
import { fileSchema } from "../fileSchema";

export const logisticsJobOrderFormSchema = z.object({
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  subject: z.string().trim().min(1, "Subject is required."),
  email_body: z.string().trim().min(1, "Message is required."),

  // Client Information
  client_type: z.enum(CLIENT_TYPES, "Client type is required."),
  accredited: z.enum(ACCREDITED_TYPES, "Accredited is required."),
  remarks: z.string().trim(),

  // Service Information
  service_level: z.enum(SERVICE_LEVEL_TYPES, "Service level is required."),
  bl_no: z.string().trim().min(1, "BL No. is required."),
  eta: z.date("Estimated time of arrival is required."),
  etd: z.date("Estimated time of departure is required."),

  // Shipment Information
  hs_code: z.string().trim(),
  rod: z.string().trim(),
  permits: z.string().trim(),
  if_coordinated: z.string().trim(),
  shipment_special_remarks: z.string().trim(),

  // Commitment Information
  delivery_date: z.date("Target delivery is required."),
  completion_date: z.date("Target completion period is required.").optional(),
  target_special_remarks: z.string().trim(),

  // Billing Information
  terms_of_payment: z.string().trim().min(1, "Terms of payment is required."),
  billing_date: z.date("When to bill is required.").optional(),
  // billing_date: z.string().trim(),
  shall_be_billed: z.enum(BILLING_TYPES, "Shall be billed is required."),
<<<<<<< HEAD
});
export type LogisticsServiceFormSchema = z.infer<
  typeof logisticsServiceFormSchema
>;

export const step1Schema = z.intersection(
  logisticsServiceFormSchema.pick({
=======
  attached_docs: z.array(fileSchema).optional(),
});
export type LogisticsJobOrderFormSchema = z.infer<
  typeof logisticsJobOrderFormSchema
>;

export const step1Schema = z.intersection(
  logisticsJobOrderFormSchema.pick({
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
    subject: true,
    email_body: true,
    client_type: true,
    accredited: true,
    remarks: true,
    service_level: true,
    bl_no: true,
  }),
<<<<<<< HEAD
  logisticsServiceFormSchema
=======
  logisticsJobOrderFormSchema
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
    .pick({
      eta: true,
      etd: true,
    })
    .superRefine((data, ctx) => {
      const etaDate = new Date(data.eta);
      const etdDate = new Date(data.etd);

      if (etaDate > etdDate) {
        ctx.addIssue({
          code: "custom",
          message: "ETA must not be later than ETD.",
          path: ["eta"],
        });
        ctx.addIssue({
          code: "custom",
          message: "ETD must not be earlier than ETA.",
          path: ["etd"],
        });
      }
    }),
);
export type Step1Fields = z.infer<typeof step1Schema>;

<<<<<<< HEAD
export const step2Schema = logisticsServiceFormSchema.pick({
=======
export const step2Schema = logisticsJobOrderFormSchema.pick({
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  hs_code: true,
  rod: true,
  permits: true,
  if_coordinated: true,
  shipment_special_remarks: true,
});
export type Step2Fields = z.infer<typeof step2Schema>;

<<<<<<< HEAD
const step3BaseSchema = logisticsServiceFormSchema.pick({
=======
const step3BaseSchema = logisticsJobOrderFormSchema.pick({
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  delivery_date: true,
  completion_date: true,
  target_special_remarks: true,
  terms_of_payment: true,
  billing_date: true,
  shall_be_billed: true,
<<<<<<< HEAD
=======
  attached_docs: true,
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
});

export const step3Schema = step3BaseSchema;

const makeStep3EtaValidationSchema = (eta?: Date) =>
  z
    .object({
<<<<<<< HEAD
      delivery_date: logisticsServiceFormSchema.shape.delivery_date.optional(),
=======
      delivery_date: logisticsJobOrderFormSchema.shape.delivery_date.optional(),
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
    })
    .superRefine((data, ctx) => {
      if (!eta || !data.delivery_date) {
        return;
      }

      const etaDate = new Date(eta);
      const deliveryDate = new Date(data.delivery_date);

      if (deliveryDate <= etaDate) {
        ctx.addIssue({
          code: "custom",
          message: "Target delivery must be after ETA.",
          path: ["delivery_date"],
        });
      }
    });

export const createStep3Schema = (eta?: Date) =>
  z.intersection(step3BaseSchema, makeStep3EtaValidationSchema(eta));

export type Step3Fields = z.infer<typeof step3BaseSchema>;
