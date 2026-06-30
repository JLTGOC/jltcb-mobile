import type {
  ShipmentDetails,
  ShipmentListQueryParams,
  ShipmentListResponse,
  UpdateShipmentPayload,
} from "@/types/shipments";
import { apiGet, apiPut } from "./axiosInstance";

export const fetchShipments = (filter: ShipmentListQueryParams) =>
  apiGet<ShipmentListResponse>("shipments", { params: filter });

export const fetchShipment = (shipmentId: number) =>
  apiGet<ShipmentDetails>(`shipments/${shipmentId}`);

export const updateShipment = (
  shipmentId: number,
  params: UpdateShipmentPayload,
) => apiPut(`shipments/${shipmentId}`, params);
