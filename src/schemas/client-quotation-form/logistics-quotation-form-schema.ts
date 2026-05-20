import * as z from "zod";

import { CARGO_TYPES } from "@/types/job-order";
import {
  LOGISTICS_SERVICE_LEVELS,
  LOGISTICS_TRANSPORT_MODES,
} from "@/types/quotations";

import { sharedStep1FormSchema, step3FormSchema } from "./shared-form-schema";

export const extendedLogisticsQuotationFormSchema = z
  .object({
    companyContactPerson: z
      .string()
      .trim()
      .min(1, "Contact person is required."),

    // Step 2
    serviceType: z.enum(LOGISTICS_SERVICE_LEVELS, "Service type is required."),
    serviceTransportMode: z.enum(
      LOGISTICS_TRANSPORT_MODES,
      "Transport mode is required.",
    ),
    serviceOptions: z
      .array(z.string())
      .min(1, "At least one service option must be selected."),
    commodityCommodity: z.string().trim().min(1, "Commodity is required."),
    commodityCargoType: z.enum(CARGO_TYPES, "Cargo type is required."),
    commodityContainerSize: z.enum(["1x20", "1x40"]).optional(),
    shipmentOrigin: z.string().trim().min(1, "Origin is required."),
    shipmentDestination: z.string().trim().min(1, "Destination is required."),
  })
  .extend(step3FormSchema.shape);

export type ExtendedLogisticsQuotationFormData = z.infer<
  typeof extendedLogisticsQuotationFormSchema
>;

export const logisticsQuotationFormSchema = sharedStep1FormSchema.extend(
  extendedLogisticsQuotationFormSchema.shape,
);
export type LogisticsQuotationFormData = z.infer<
  typeof logisticsQuotationFormSchema
>;

export const logisticsStep1FormSchema = logisticsQuotationFormSchema.pick({
  companyName: true,
  companyAddress: true,
  companyContactPerson: true,
  companyContactNumber: true,
  companyEmail: true,
});
export type LogisticsStep1FormData = z.infer<typeof logisticsStep1FormSchema>;

const baseLogisticsStep2FormSchema = logisticsQuotationFormSchema.pick({
  serviceType: true,
  serviceOptions: true,
  serviceTransportMode: true,
  commodityCommodity: true,
  commodityCargoType: true,
  commodityContainerSize: true,
  shipmentOrigin: true,
  shipmentDestination: true,
});
export const logisticsStep2FormSchema = baseLogisticsStep2FormSchema.refine(
  (data) =>
    data.commodityCargoType !== "CONTAINERIZED" ||
    !!data.commodityContainerSize,
  {
    message: "Container size is required.",
    path: ["commodityContainerSize"],
    when(payload) {
      return baseLogisticsStep2FormSchema
        .pick({ commodityCargoType: true, commodityContainerSize: true })
        .safeParse(payload.value).success;
    },
  },
);
export type LogisticsStep2FormData = z.infer<typeof logisticsStep2FormSchema>;

export const logisticsStep3FormSchema = logisticsQuotationFormSchema.pick({
  // No additional fields for step 3, but we can keep this for consistency and future-proofing
});
export type LogisticsStep3FormData = z.infer<typeof logisticsStep3FormSchema>;
