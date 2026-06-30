import type { REGIONS } from "@/constants/ports-catered";

export type Region = (typeof REGIONS)[number];

export type PortData = {
  port: string;
  subPorts: string[];
};

export type PortItem = {
  region: Region;
  ports: PortData[];
};
