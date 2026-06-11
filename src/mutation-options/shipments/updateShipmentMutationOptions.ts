import { mutationOptions } from "@tanstack/react-query";

import { shipmentQueries } from "@/queries/shipments";
import { updateShipment } from "@/services/shipments";
import type { UpdateShipmentPayload } from "@/types/shipments";

export const updateShipmentMutationOptions = mutationOptions({
  mutationFn: ({
    shipmentId,
    payload,
  }: {
    shipmentId: number;
    payload: UpdateShipmentPayload;
  }) => updateShipment(shipmentId, payload),
  meta: {
    invalidates: [
      shipmentQueries.list({ filter: { status: "ONGOING" } }).queryKey,
    ],
  },
});
