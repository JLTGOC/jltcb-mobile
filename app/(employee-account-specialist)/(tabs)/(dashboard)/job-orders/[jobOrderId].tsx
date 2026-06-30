import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";

import SharedLogisticsJobOrder from "@/components/screens/SharedLogisticsJobOrder";
import SharedRegulatoryJobOrder from "@/components/screens/SharedRegulatoryJobOrder";

import { jobOrderQueries } from "@/queries/job-orders";

export default function JobOrder() {
  const { jobOrderId } = useLocalSearchParams<{ jobOrderId: string }>();
  const { data, isPending } = useQuery(
    jobOrderQueries.detail(Number(jobOrderId)),
  );

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
