import { queryOptions } from "@tanstack/react-query";

import { shipmentKeys } from "@/query-key-factories/shipments";
import { fetchShipment } from "@/services/shipments";

export const shipmentQueryOptions = (shipmentId: number) =>
  queryOptions({
    queryKey: shipmentKeys.detail(shipmentId),
    queryFn: () => fetchShipment(shipmentId),
    enabled: !!shipmentId,
  });
