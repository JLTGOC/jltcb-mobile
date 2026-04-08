import { JobOrderFormSchema } from "@/src/schemas/makeJobOrderFormSchema";
import { CreateJobOrderRequestBody, JobType } from "@/src/types/job-order";
import { format } from "date-fns";

export const transformToApiPayload = ({
  data,
  jobType,
  quotationReference,
}: {
  data: JobOrderFormSchema;
  jobType: JobType;
  quotationReference: string;
}): CreateJobOrderRequestBody => {
  const formatDate = (date?: Date) =>
    date ? format(date, "yyyy-MM-dd HH:mm:ss") : "";

  return {
    quotation_reference_number: quotationReference,
    job_type: jobType,
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
