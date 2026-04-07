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
