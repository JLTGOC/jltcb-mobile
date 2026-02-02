import React, { useState } from "react";
import { View } from "react-native";
import { Check } from "lucide-react-native";
import StepIndicator from "react-native-step-indicator";

import Step_1 from "../../../src/components/client-section/get-quote/Step_1";
import Step_2 from "../../../src/components/client-section/get-quote/Step_2";
import Step_3 from "../../../src/components/client-section/get-quote/Step_3";
import Buttons from "../../../src/components/client-section/get-quote/Buttons";
import Header from "../../../src/components/client-section/Header";
import { QuoteForm, Field } from "../../../src/types/client";

import { routes } from "@/src/constants/routes";

export default function Index() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [formData, setFormData] = useState<QuoteForm>({});
  const [error, setError] = useState(false);

  const stepFields: Record<number, Field[]> = {
    0: [
      { label: "CONSIGNEE", key: "consignee" },
      { label: "COMPANY ADDRESS", key: "company_address" },
      { label: "CONTACT PERSON", key: "contact_person" },
      { label: "CONTACT NUMBER", key: "contact_number" },
      { label: "EMAIL", key: "email" },
    ],
    1: [],
    2: [],
  };

  return (
    <>
      <Header title={"Get Quote"} route={routes.CLIENT_DB} />
      <View style={{ padding: 20 }}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          currentPosition={currentPosition}
          stepCount={3}
          renderStepIndicator={(params) => {
            if (params.stepStatus === "finished") {
              return <Check color="#FFFFFF" width={20} height={20} />;
            } else {
              return null;
            }
          }}
        />
        {currentPosition === 0 && (
          <Step_1 error={error} formData={formData} setFormData={setFormData}  fields={stepFields[0]}/>
        )}
        {currentPosition === 1 && <Step_2 />}
        {currentPosition === 2 && <Step_3 />}
        <Buttons
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          error={error}
          setError={setError}
          formData={formData}
          stepFields={stepFields}
        />
      </View>
    </>
  );
}

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,

  // Circle borders
  stepStrokeCurrentColor: "#161F3C",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#161F3C",
  stepStrokeUnFinishedColor: "#C5C9D6",

  // Line colors
  separatorFinishedColor: "#161F3C",
  separatorUnFinishedColor: "#C5C9D6",

  // Circle fill
  stepIndicatorFinishedColor: "#161F3C",
  stepIndicatorUnFinishedColor: "#FFFFFF",
  stepIndicatorCurrentColor: "#FFFFFF",
};
