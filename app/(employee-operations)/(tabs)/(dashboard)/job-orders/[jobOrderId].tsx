import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import JobOrderNavigation from "@/components/job-order-section/JorOrderNavigation";
import SharedLogisticsJobOrder from "@/components/screens/SharedLogisticsJobOrder";
import SharedRegulatoryJobOrder from "@/components/screens/SharedRegulatoryJobOrder";

import { useJobOrderQuery } from "@/hooks/useJobOrderQuery";

export default function JobOrder() {
  const { jobOrderId } = useLocalSearchParams<{
    jobOrderId: string;
  }>();
  const { data, isPending } = useJobOrderQuery(Number(jobOrderId));

  const jobType = data?.data.job_type;
  const quotationId = data?.data.quotation_id;

  if (isPending) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (jobType === "LOGISTICS") {
    return (
      <View style={styles.container}>
        <SharedLogisticsJobOrder
          contentContainerStyle={styles.jobOrderContainer}
        />
        {quotationId && (
          <JobOrderNavigation quotationId={quotationId} jobType={jobType} />
        )}
      </View>
    );
  } else if (jobType === "REGULATORY") {
    return (
      <View style={styles.container}>
        <SharedRegulatoryJobOrder
          contentContainerStyle={styles.jobOrderContainer}
        />
        {quotationId && (
          <JobOrderNavigation quotationId={quotationId} jobType={jobType} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobOrderContainer: {
    paddingBottom: 60,
  },
  loader: {
    flex: 1,
  },
});
