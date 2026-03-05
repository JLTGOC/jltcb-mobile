export type ShipmentData = {
  shipments: ShipmentDetails[];
  pagination: Pagination;
};

export type ShipmentDetails = {
  general_info: GeneralInformation;
  commodity_details: CommodityInformation;
  contact_person: ContactPersonInformation;
  shipment_information: ShipmentInformation;
  payment_details?: PaymentInformation;
};

export type Pagination = {
  prev_cursor: string | null;
  next_cursor: string | null;
  prev_page_url: string | null;
  next_page_url: string | null;
};

export type GeneralInformation = {
  reference_number: string;
  id: number;
  status: string;
  commodity: string;
  date: string;
};

export type CommodityInformation = {
  commodity: string;
  consignee_name: string;
  cargo_type: string;
  container_size: string;
};

export type ContactPersonInformation = {
  full_name: string;
  contact_number: string;
  email: string;
};

export type ShipmentInformation = {
  origin: string;
  destination: string;
  account_handler?: string;
  created_at?: string;
  eta?: string;
};

export type PaymentInformation = {
  status?: string;
  paid_by?: string;
  billing_date?: string;
  payment_date?: string;
};
