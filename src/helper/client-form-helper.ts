import { QuoteForm } from "../types/client-type";

export function appendObjectToFormData(
  data: FormData,
  obj: Record<string, any> | undefined,
  prefix: string,
) {
  if (!obj) return;

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => data.append(`${prefix}[${key}][]`, item));
    } else {
      data.append(`${prefix}[${key}]`, value?.toString() || "");
    }
  });
}

export function appendFilesToFormData(
  data: FormData,
  files: QuoteForm["documents"] | undefined,
  fieldName = "documents[]",
) {
  if (!files?.length) return;

  files.forEach((file, index) => {
    data.append(fieldName, {
      uri: file.file_url,
      name: file.file_name || `file_${index}`,
      type: file.mimeType || "application/octet-stream",
    } as any);
  });
}
