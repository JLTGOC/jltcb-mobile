export const shipmentKeys = {
  all: () => ["shipments"] as const,
  lists: () => [...shipmentKeys.all(), "list"] as const,
  details: () => [...shipmentKeys.all(), "detail"] as const,
  detail: (id: number) => [...shipmentKeys.details(), id] as const,
};
