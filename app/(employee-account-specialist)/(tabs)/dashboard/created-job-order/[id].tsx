import { useLocalSearchParams } from "expo-router";

import SharedLogisticsJobOrder from "@/src/components/screens/SharedLogisticsJobOrder";
import SharedRegulatoryJobOrder from "@/src/components/screens/SharedRegulatoryJobOrder";
import type { JobTypeSummary } from "@/src/types/job-order";

export default function JobOrder() {
	const { service } = useLocalSearchParams<{ service: JobTypeSummary }>();
	if (service === "Logistics Services") {
		return <SharedLogisticsJobOrder />;
	} else if (service === "Regulatory Services") {
		return <SharedRegulatoryJobOrder />;
	}
}
