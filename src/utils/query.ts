export const cleanParams = <T extends Record<string, unknown>>(
  params: T,
): T => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined,
    ),
  ) as T;
};
