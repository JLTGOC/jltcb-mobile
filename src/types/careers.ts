export const PositionsSample = [
  "Position Sample 1",
  "Position Sample 2",
  "Position Sample 3",
  "Position Sample 4",
  "Position Sample 5",
  "Position Sample 6",
  "Position Sample 7",
  "Position Sample 8",
] as const;

export type FieldKey = "full_name" | "email" | "contact_number";

export type Field = {
  label: string;
  subLabel: string;
  key: FieldKey;
};

export type OJTFormData = {
  [K in FieldKey]?: string;
} & {
  position: string;
  cv_cover: string[];
};