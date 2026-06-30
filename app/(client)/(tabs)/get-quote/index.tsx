import StepScrollView from "@/components/client-section/get-quote/StepScrollView";
import LogisticsForm from "@/components/client-section/get-quote/step-1/LogisticsForm";
import RegulatoryForm from "@/components/client-section/get-quote/step-1/RegulatoryForm";

import { useClientQuotationFormStore } from "@/stores/useClientQuotationFormStore";

export default function Step1Form() {
  const service = useClientQuotationFormStore((state) => state.service);

  return (
    <StepScrollView keyboardShouldPersistTaps="never">
      {service === "LOGISTICS" && <LogisticsForm />}
      {service === "REGULATORY" && <RegulatoryForm />}
    </StepScrollView>
  );
}
