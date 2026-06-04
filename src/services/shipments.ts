import type {
  ShipmentDetails,
  ShipmentListQueryParams,
  ShipmentListResponse,
} from "@/types/shipments";
import { apiGet } from "./axiosInstance";

export const fetchShipments = (filter: ShipmentListQueryParams) =>
  apiGet<ShipmentListResponse>("shipments", { params: filter });

export const fetchShipment = (shipmentId: number) =>
  apiGet<ShipmentDetails>(`shipments/${shipmentId}`);
