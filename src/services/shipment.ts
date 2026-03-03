import { apiPost, apiGet } from "./axiosInstance";
import { ShipmentDetails } from "../types/shipment-type";

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

export async function fetchShipments(search: string): Promise<ShipmentDetails> {
  const params = {
    search: search || undefined,
  };

  return (await apiGet<ShipmentDetails>(`shipments`, { params })).data;
}
