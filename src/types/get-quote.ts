export type FieldKey = "full_name" | "email" | "contact_number";

export type Field = {
  label: string;
  key: FieldKey;
};

export type ContactFormData = {
  [K in FieldKey]?: string;
} & {
  message?: string;
  imageUri?: string;
}