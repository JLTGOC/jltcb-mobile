import StepScrollView from "@/src/components/client-section/get-quote/StepScrollView";
import LogisticsForm from "@/src/components/client-section/get-quote/step-1/LogisticsForm";
import RegulatoryForm from "@/src/components/client-section/get-quote/step-1/RegulatoryForm";

import { useClientQuotationFormStore } from "@/src/stores/useClientQuotationFormStore";

export default function Step1Form() {
  const service = useClientQuotationFormStore((state) => state.service);

  return (
    <StepScrollView keyboardShouldPersistTaps="never">
      {service === "LOGISTICS" && <LogisticsForm />}
      {service === "REGULATORY" && <RegulatoryForm />}
    </StepScrollView>
  );
}
