import { useMutation } from "@tanstack/react-query";

import { shipmentQueries } from "@/queries/shipments";
import { updateShipment } from "@/services/shipments";
import type { UpdateShipmentPayload } from "@/types/shipments";

export function useUpdateShipmentMutation(shipmentId: number) {
  return useMutation({
    mutationFn: (payload: UpdateShipmentPayload) =>
      updateShipment(shipmentId, payload),
    meta: {
      invalidates: [
        shipmentQueries.detail(shipmentId).queryKey,
        shipmentQueries.list({ filter: { status: "ONGOING" } }).queryKey,
      ],
    },
  });
}
