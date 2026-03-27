import type { ShipmentData, ShipmentDetails } from "../types/shipment-type";
import { apiGet } from "./axiosInstance";

export type ShipmentListPage = ShipmentData & {
  message?: string;
};

export async function fetchShipments({
  search,
  status,
  cursor,
}: {
  search?: string;
  status?: string;
  cursor?: string;
}): Promise<ShipmentData> {
  const params = {
    search: search || undefined,
    // status: status || undefined,
    "filter[status]": status || undefined,
    cursor: cursor || undefined,
  };

  return (await apiGet<ShipmentData>(`shipments`, { params })).data;
}

export async function fetchShipmentDetails(
  shipmentId: number,
): Promise<ShipmentDetails> {
  try {
    return (await apiGet<ShipmentDetails>(`shipments/${shipmentId}`)).data;
  } catch (error) {
    const fallback = await fetchShipments({});
    const found = fallback.shipments.find(
      (shipment) => shipment.general_info.id === shipmentId,
    );

    if (found) return found;

    throw error;
  }
}
