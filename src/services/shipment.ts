import { apiPost, apiGet } from "./axiosInstance";
import { ShipmentData, ShipmentDetails } from "../types/shipment-type";

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

export async function fetchShipments({search, status}: {search?: string, status?: string}): Promise<ShipmentData> {
  const params = {
    search: search || undefined,
    status: status || undefined,
  };

  return (await apiGet<ShipmentData>(`shipments`, { params })).data;
}
