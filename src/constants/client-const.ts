import Container20 from "../assets/get_quote/container20.png";
import Container40 from "../assets/get_quote/container40.png";

import { QuoteForm } from "../types/client-type";

// Initial Form
export const initialQuoteForm: QuoteForm = {
  account_specialist: "",
  company: {
    name: "",
    address: "",
    contact_person: "",
    contact_number: "",
    email: "",
  },
  service: {
    type: "",
    transport_mode: "",
    options: [],
  },
  commodity: {
    commodity: "",
    cargo_type: "",
    cargo_volume: 1,
    container_size: "",
  },
  shipment: {
    origin: "",
    destination: "",
  },
  documents: [],
};

// Constants
export const transpoMode = ["SEA", "AIR"];
export const serviceType = ["IMPORT", "EXPORT", "BUSINESS SOLUTION"];
export const options = [
  "CUSTOMS CLEARANCE",
  "PEZA PROCESSING & COMPLIANCE",
  "CUSTOMS DISPUTE RESOLUTIONS",
  "POST CLEARANCE SERVICE",
  "SPECIALIZED ENTRY TYPES",
  "CUSTOMS AND TRADE CONSULTANCY",
  "INTERNATIONAL FREIGHT FORWARDING",
  "DOMESTIC FREIGHT FORWARDING",
  "TRUCKINGS SERVICES",
  "PROJECT CARGO",
];
export const commodities = ["CASTABLE 16 REFRACTOR"];
export const cargo_type = ["CONTAINERIZED", "LCL"];
export const container_size = [
  { image: Container20, size: "1x20" },
  { image: Container40, size: "1x40" },
];
