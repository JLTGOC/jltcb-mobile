import type { File } from "@/types";

const isReactNativeFile = (value: unknown): value is File =>
  typeof value === "object" &&
  value !== null &&
  "uri" in value &&
  "name" in value &&
  "mimeType" in value;

export const jsonToFormData = <T extends object>(
  obj: T,
  parentKey?: string,
): FormData => {
  const formData = new FormData();

  const append = (data: unknown, key: string) => {
    if (data === null || data === undefined) return;

    if (data instanceof File || data instanceof Blob) {
      formData.append(key, data);
    } else if (isReactNativeFile(data)) {
      const { uri, name, mimeType } = data;
      formData.append(key, { uri, name, type: mimeType } as unknown as Blob);
    } else if (Array.isArray(data)) {
      data.forEach((item, i) => {
        append(item, `${key}[${i}]`);
      });
    } else if (typeof data === "object") {
      Object.entries(data).forEach(([k, v]) => {
        append(v, `${key}[${k}]`);
      });
    } else {
      formData.append(key, String(data));
    }
  };

  Object.entries(obj).forEach(([key, value]) => {
    append(value, parentKey ? `${parentKey}[${key}]` : key);
  });

  return formData;
};
