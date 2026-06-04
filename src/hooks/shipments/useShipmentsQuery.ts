import { shipmentKeys } from "@/query-key-factories/shipments";
import { fetchShipments } from "@/services/shipments";
import type { ShipmentListQueryParams } from "@/types/shipments";
import { useQuery } from "@tanstack/react-query";

export function useShipmentsQuery(filter: ShipmentListQueryParams = {}) {
  return useQuery({
    queryKey: shipmentKeys.list(filter),
    queryFn: () => fetchShipments(filter),
  });
}
