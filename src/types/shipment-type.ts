export type ShipmentDetails = {
    general_info: GeneralInfo;
    commodity_details: CommodityDetails;
    contact_person: ContactPerson;
    shipment_information: ShipmentDetails;
};

export type GeneralInfo = {
  reference_number: string;
  quotation_id: number;
  client: string;
  accoun_speacialist: string;
  status: string;
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
  creates_at: string;
  updates_at: string;
};
