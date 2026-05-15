import StepScrollView from "@/components/client-section/get-quote/StepScrollView";
import LogisticsForm from "@/components/client-section/get-quote/step-2/LogisticsForm";
import RegulatoryForm from "@/components/client-section/get-quote/step-2/RegulatoryForm";

import { useClientQuotationFormStore } from "@/stores/useClientQuotationFormStore";

export default function Step2() {
  const service = useClientQuotationFormStore((state) => state.service);

  return (
    <StepScrollView>
      {service === "LOGISTICS" && <LogisticsForm />}
      {service === "REGULATORY" && <RegulatoryForm />}
    </StepScrollView>
  );
}
