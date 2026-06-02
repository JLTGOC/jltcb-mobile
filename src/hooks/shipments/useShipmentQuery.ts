import { useQuery } from "@tanstack/react-query";

import { shipmentQueryOptions } from "@/query-options/shipments/shipmentQueryOptions";

export function useShipmentQuery(shipmentId: number) {
  return useQuery(shipmentQueryOptions(shipmentId));
}
