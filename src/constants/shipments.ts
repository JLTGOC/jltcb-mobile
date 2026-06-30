import type { ShipmentStatus } from "@/types/shipments";

export const ShipmentStatuses = [
  "Berthed",
  "Not Yet Departed",
  "Discharged",
  "In Transit",
  "Delivered",
  "Arrived",
] as const;

export const ShipmentStatusColors: Partial<Record<ShipmentStatus, string>> = {
  DELIVERED: "#0B8600",
  DISCHARGED: "#C8CE72",
};
