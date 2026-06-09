import { queryOptions } from "@tanstack/react-query";

import { fetchShipment, fetchShipments } from "@/services/shipments";
import type { ShipmentListQueryParams } from "@/types/shipments";

export const shipmentQueries = {
  all: () => ["shipments"],
  lists: () => [...shipmentQueries.all(), "list"],
  list: (filters: ShipmentListQueryParams) =>
    queryOptions({
      queryKey: [...shipmentQueries.lists(), filters],
      queryFn: () => fetchShipments(filters),
    }),
  details: () => [...shipmentQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...shipmentQueries.details(), id],
      queryFn: () => fetchShipment(id),
    }),
};
