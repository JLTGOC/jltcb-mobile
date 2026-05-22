import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";

import SharedLogisticsJobOrder from "@/components/screens/SharedLogisticsJobOrder";
import SharedRegulatoryJobOrder from "@/components/screens/SharedRegulatoryJobOrder";

import { useJobOrderQuery } from "@/hooks/useJobOrderQuery";

export default function JobOrder() {
  const { jobOrderId } = useLocalSearchParams<{ jobOrderId: string }>();
  const { data, isPending } = useJobOrderQuery(Number(jobOrderId));

  const jobType = data?.data.job_type;

  if (isPending) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (jobType === "LOGISTICS") {
    return <SharedLogisticsJobOrder />;
  } else if (jobType === "REGULATORY") {
    return <SharedRegulatoryJobOrder />;
  }
}
