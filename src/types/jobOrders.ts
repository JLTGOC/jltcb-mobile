export const CLIENT_TYPES = ["NEW", "RENEWAL"] as const;
export type ClientType = (typeof CLIENT_TYPES)[number];

export const ACCREDITED_TYPES = ["REGULAR", "EXPEDITED"] as const;
export type AccreditedType = (typeof ACCREDITED_TYPES)[number];

export const SERVICE_LEVEL_TYPES = [
  "CARGO CONSOLIDATION (CC)",
  "DIRECT EXPORT (DE)",
  "INTERNATIONAL FREIGHT FORWARDING (IFF)",
  "CARGO CONSOLIDATION (CC), DIRECT EXPORT (DE)",
  "INTERNATIONAL FREIGHT FORWARDING (IFF), CARGO CONSOLIDATION (CC)",
  "INTERNATIONAL FREIGHT FORWARDING (IFF), CARGO CONSOLIDATION (CC), DIRECT EXPORT (DE)",
] as const;
export type ServiceLevelType = (typeof SERVICE_LEVEL_TYPES)[number];

export const BILLING_TYPES = [
  "AS PER QUOTE",
  "AS PER RECEIPT",
  "THIRD-PARTY RECEIPTED CHARGES ADVANCES, DEBIT NOTE, CHARGES UPON DELIVERY",
  "CARGO CONSOLIDATION (CC), DIRECT EXPORT (DE)",
  "UPON SERVICE RENDERED (COD)",
] as const;
export type BillingType = (typeof BILLING_TYPES)[number];

export interface JobOrderEnums {
  client_types: ClientType[];
  accredited: AccreditedType[];
  service_levels: ServiceLevelType[];
  shall_be_billed: BillingType[];
}

type EnumOption<T> = { id: T; title: T };

export interface JobOrderEnumsFormatted {
  client_types: EnumOption<ClientType>[];
  accredited: EnumOption<AccreditedType>[];
  service_levels: EnumOption<ServiceLevelType>[];
  shall_be_billed: EnumOption<BillingType>[];
}
