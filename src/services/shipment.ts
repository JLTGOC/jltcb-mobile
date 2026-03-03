import { apiPost } from "./axiosInstance";
import {ShipmentDetails} from "../types/shipment-type";

// Get Single Quote
export async function acceptQuotation( reference_id: string): Promise<ShipmentDetails> {
  return (await apiPost<ShipmentDetails>(`shipments`,{reference_number: reference_id})).data;

}