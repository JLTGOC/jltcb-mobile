import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Box from "@material-symbols/svg-500/outlined/box.svg";
import Files from "@material-symbols/svg-500/outlined/files.svg";
import { type Href, Link } from "expo-router";

import type { JobType } from "@/types/job-order";
import { BottomNavigation } from "./BottomNavigation";

interface Props {
  targetId: number;
  jobType: JobType;
}

export default function JobOrderNavigation({ targetId, jobType }: Props) {
  const isLogistics = jobType === "LOGISTICS";

  const href: Href = isLogistics
    ? { pathname: "/shipments/[shipmentId]", params: { shipmentId: targetId } }
    : { pathname: "/services/[serviceId]", params: { serviceId: targetId } };

  const hrefDocuments: Href = isLogistics
    ? {
        pathname: "/shipments/[shipmentId]",
        params: { shipmentId: targetId, tab: "documents" },
      }
    : {
        pathname: "/services/[serviceId]",
        params: { serviceId: targetId, tab: "documents" },
      };

  return (
    <BottomNavigation.Root>
      <Link href={href} asChild push>
        <BottomNavigation.Action>
          {jobType === "LOGISTICS" ? (
            <Box width={24} height={24} fill="white" />
          ) : (
            <MaterialCommunityIcons name="license" size={24} color="white" />
          )}
          <BottomNavigation.ActionText>
            {jobType === "LOGISTICS" ? "View Shipment" : "Process Request"}
          </BottomNavigation.ActionText>
        </BottomNavigation.Action>
      </Link>
      <Link href={hrefDocuments} asChild push>
        <BottomNavigation.Action>
          <Files width={24} height={24} fill="white" />
          <BottomNavigation.ActionText>Documents</BottomNavigation.ActionText>
        </BottomNavigation.Action>
      </Link>
    </BottomNavigation.Root>
  );
}
