export type ShipmentData = {
  shipments: ShipmentDetails[];
  pagination: Pagination;
};

export type ShipmentDetails = {
  general_info: GeneralInfo;
  commodity_details: CommodityDetails;
  contact_person: ContactPerson;
  shipment_information: ShipmentDetails;
};

export type Pagination = {
  prev_cursor: string | null;
  next_cursor: string | null;
  prev_page_url: string | null;
  next_page_url: string | null;
};

export type GeneralInfo = {
  reference_number: string;
  id: number;
  status: string;
  commodity: string;
  date: string;
};

export type CommodityDetails = {
  commodity: string;
  consignee_name: string;
  cargo_type_: string;
  container_size: string;
};

export type ContactPerson = {
  full_name: string;
  contact_number: string;
  email: string;
};

export type ShipmentInformation = {
  origin: string;
  destination: string;
  accounnd_handler: string,
  creates_at: string;
  updates_at: string;
};
