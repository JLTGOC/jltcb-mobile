import type { ShipmentListQueryParams } from "@/types/shipments";

export const shipmentKeys = {
  all: () => ["shipments"] as const,
  lists: () => [...shipmentKeys.all(), "list"] as const,
  list: (filter: ShipmentListQueryParams) =>
    [...shipmentKeys.lists(), filter] as const,
  details: () => [...shipmentKeys.all(), "detail"] as const,
  detail: (id: number) => [...shipmentKeys.details(), id] as const,
};
