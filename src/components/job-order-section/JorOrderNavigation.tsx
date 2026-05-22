import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Box from "@material-symbols/svg-500/outlined/box.svg";
import Files from "@material-symbols/svg-500/outlined/files.svg";
import { Link } from "expo-router";

import type { JobType } from "@/types/job-order";
import { BottomNavigation } from "./BottomNavigation";

interface Props {
  quotationId: number;
  jobType: JobType;
}

export default function JobOrderNavigation({ quotationId, jobType }: Props) {
  return (
    <BottomNavigation.Root>
      <Link
        href={{
          pathname: "/quotation/[quotationId]",
          params: { quotationId },
        }}
        asChild
        push
      >
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
      <Link
        href={{
          pathname: "/quotation/[quotationId]",
          params: { quotationId, tab: "documents" },
        }}
        asChild
        push
      >
        <BottomNavigation.Action>
          <Files width={24} height={24} fill="white" />
          <BottomNavigation.ActionText>Documents</BottomNavigation.ActionText>
        </BottomNavigation.Action>
      </Link>
    </BottomNavigation.Root>
  );
}
