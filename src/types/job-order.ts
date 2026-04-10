import { AccreditedType, ClientType } from "./jobOrderEnums";

export const JOB_TYPES = ["LOGISTICS", "REGULATORY"] as const;
export type JobType = (typeof JOB_TYPES)[number];

export type JobOrder = {
  id: number;
  reference_number: string;
  service: string;
  client: string;
  date_created: string;
  quotation_id: number;
  assigned_to: string;
};

export type JobOrderResponse = {
  message: string;
  data: JobOrder[];
};

interface CreateJobOrderBaseRequestBody<T extends JobType = JobType> {
  quotation_reference_number: string;
  job_type: T;
  subject: {
    subject: string;
    email_body: string;
  };
  client: {
    client_type: ClientType;
    accredited: AccreditedType;
    remarks: string;
  };
}

export interface CreateLogisticsJobOrderRequestBody extends CreateJobOrderBaseRequestBody<"LOGISTICS"> {
  service: {
    service_level: string;
    bl_no: string;
    eta: string;
    etd: string;
  };
  shipment: {
    hs_code: string;
    rod: string;
    permits: string;
    special_remarks: string;
  };
  target: {
    delivery_date: string;
    completion_date: string;
    special_remarks: string;
  };
  billing: {
    terms_of_payment: string;
    billing_date: string;
    shall_be_billed: string;
  };
}

export interface CreateRegulatoryJobOrderRequestBody extends CreateJobOrderBaseRequestBody<"REGULATORY"> {
  service: {
    service: string;
  };
}

export type CreateJobOrderRequestBody =
  | CreateLogisticsJobOrderRequestBody
  | CreateRegulatoryJobOrderRequestBody;
