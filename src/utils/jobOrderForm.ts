import { format, formatDistance, isSameDay } from "date-fns";

import type { LogisticsJobOrderFormSchema } from "@/src/schemas/job-order/logistics-service-form-schema";
import type { RegulatoryServiceFormSchema } from "@/src/schemas/job-order/regulatory-service-form-schema";
import type { CreateJobOrderRequestBody } from "@/src/types/job-order";

export const transformToLogisticsJobOrderPayload = ({
  data,
  quotationReference,
}: {
  data: LogisticsJobOrderFormSchema;
  quotationReference: string;
}): CreateJobOrderRequestBody => {
  const formatDate = (date?: Date) =>
    date ? format(date, "yyyy-MM-dd HH:mm:ss") : "";

  return {
    quotation_reference_number: quotationReference,
    job_type: "LOGISTICS",
    subject: {
      subject: data.subject,
      email_body: data.email_body,
    },
    client: {
      client_type: data.client_type,
      accredited: data.accredited,
      remarks: data.remarks ?? "",
    },
    service: {
      service_level: data.service_level,
      bl_no: data.bl_no,
      eta: formatDate(data.eta),
      etd: formatDate(data.etd),
    },
    shipment: {
      hs_code: data.hs_code,
      rod: data.rod,
      permits: data.permits,
      if_coordinated: data.if_coordinated,
      special_remarks: data.shipment_special_remarks,
    },
    target: {
      delivery_date: formatDate(data.delivery_date),
      completion_date: formatDate(data.completion_date),
      special_remarks: data.target_special_remarks,
    },
    billing: {
      terms_of_payment: data.terms_of_payment,
      billing_date: formatDate(data.billing_date),
      shall_be_billed: data.shall_be_billed,
    },
  };
};

export const transformToRegulatoryJobOrderPayload = ({
  data,
  quotationReference,
}: {
  data: RegulatoryServiceFormSchema;
  quotationReference: string;
}): CreateJobOrderRequestBody => {
  return {
    quotation_reference_number: quotationReference,
    job_type: "REGULATORY",
    subject: {
      subject: data.subject,
      email_body: data.email_body,
    },
    client: {
      client_type: data.client_type,
      accredited: data.accredited,
      remarks: data.remarks,
      service_type: data.service,
    },
  };
};

export const formatTargetDeliveryDate = (date: Date, arrivalDate: Date) => {
  if (isSameDay(date, arrivalDate)) {
    return "On arrival date";
  }

  return `${formatDistance(date, arrivalDate)} after arrival`;
};
