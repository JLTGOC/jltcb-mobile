import { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native";

import { QuoteForm } from "../../../types/client";
import Service from "@/src/components/client-section/get-quote/step-2/Service";
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
      {formData.service?.type === "IMPORT" ? (
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
