import type { ShipmentDetails, ShipmentListResponse } from "@/types/shipments";
import { apiGet } from "./axiosInstance";

export const fetchShipments = () => apiGet<ShipmentListResponse>("shipments");

export const fetchShipment = (shipmentId: number) =>
  apiGet<ShipmentDetails>(`shipments/${shipmentId}`);
