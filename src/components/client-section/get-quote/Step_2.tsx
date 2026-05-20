import type { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native";

import Service from "@/components/client-section/get-quote/step-2/Service";
import type { QuoteForm } from "@/types/client-quotation";
import Commodity from "./step-2/Commodity";
import Shipment from "./step-2/Shipment";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};

export default function Step_2({ formData, setFormData }: Props) {
  return (
    <ScrollView
      style={{ gap: 10, padding: 10 }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Service formData={formData} setFormData={setFormData} />
      {formData.service?.type !== "BUSINESS SOLUTION" ? (
        <>
          <Commodity formData={formData} setFormData={setFormData} />
          <Shipment formData={formData} setFormData={setFormData} />
        </>
      ) : (
        ""
      )}
    </ScrollView>
  );
}
