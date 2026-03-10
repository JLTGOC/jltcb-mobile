import { ShipmentData, ShipmentDetails } from "../types/shipment-type";
import { apiGet, apiPost } from "./axiosInstance";

// Accepeted Quotation
export async function acceptQuotation(
  reference_id: string,
): Promise<ShipmentDetails> {
  return (
    await apiPost<ShipmentDetails>(`shipments`, {
      reference_number: reference_id,
    })
  ).data;
}

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
    status: status || undefined,
    // "filter[status}": status || undefined,
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
