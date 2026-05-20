import Box from "@material-symbols/svg-500/outlined/box.svg";
import Files from "@material-symbols/svg-500/outlined/files.svg";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import { BottomNavigation } from "@/components/job-order-section/BottomNavigation";
import SharedLogisticsJobOrder from "@/components/screens/SharedLogisticsJobOrder";
import SharedRegulatoryJobOrder from "@/components/screens/SharedRegulatoryJobOrder";

import { JobTypeSummary } from "@/types/job-order";

export default function JobOrder() {
  const { service } = useLocalSearchParams<{
    service: JobTypeSummary;
  }>();

  if (service === "Logistics Services") {
    return (
      <View style={styles.container}>
        <SharedLogisticsJobOrder
          contentContainerStyle={styles.jobOrderContainer}
        />
        <JobOrderNavigation />
      </View>
    );
  } else if (service === "Regulatory Services") {
    return (
      <View style={styles.container}>
        <SharedRegulatoryJobOrder
          contentContainerStyle={styles.jobOrderContainer}
        />
        <JobOrderNavigation />
      </View>
    );
  }
}

function JobOrderNavigation() {
  const params = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <BottomNavigation.Root>
      <Link
        href={{
          pathname: "/dashboard/job-order/quotation/[id]",
          params,
        }}
        asChild
      >
        <BottomNavigation.Action>
          <Box width={24} height={24} fill="white" />
          <BottomNavigation.ActionText>
            View Shipment
          </BottomNavigation.ActionText>
        </BottomNavigation.Action>
      </Link>
      <Link
        href={{
          pathname: "/dashboard/job-order/quotation/[id]",
          params: { ...params, tab: "Documents" },
        }}
        asChild
      >
        <BottomNavigation.Action>
          <Files width={24} height={24} fill="white" />
          <BottomNavigation.ActionText>Documents</BottomNavigation.ActionText>
        </BottomNavigation.Action>
      </Link>
    </BottomNavigation.Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobOrderContainer: {
    paddingBottom: 60,
  },
});
