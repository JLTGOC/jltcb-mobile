import StepScrollView from "@/src/components/client-section/get-quote/StepScrollView";
import LogisticsForm from "@/src/components/client-section/get-quote/step-2/LogisticsForm";
import RegulatoryForm from "@/src/components/client-section/get-quote/step-2/RegulatoryForm";

import { useClientQuotationFormStore } from "@/src/stores/useClientQuotationFormStore";

export default function Step2() {
	const service = useClientQuotationFormStore((state) => state.service);

	return (
		<StepScrollView>
			{service === "LOGISTICS" && <LogisticsForm />}
			{service === "REGULATORY" && <RegulatoryForm />}
		</StepScrollView>
	);
}
