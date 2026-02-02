export type FieldKey =
  | "consignee"
  | "company_address"
  | "contact_person"
  | "contact_number"
  | "email";

export type Field = {
  label: string;
  key: FieldKey;
};

export type QuoteForm = {
    [K in FieldKey]?: string
}
