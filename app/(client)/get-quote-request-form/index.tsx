import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Check } from "lucide-react-native";
import { useMutation } from "@tanstack/react-query";
import StepIndicator from "react-native-step-indicator";

import Step_1 from "../../../src/components/client-section/get-quote/Step_1";
import Step_2 from "../../../src/components/client-section/get-quote/Step_2";
import Step_3 from "../../../src/components/client-section/get-quote/Step_3";
import Buttons from "../../../src/components/client-section/get-quote/Buttons";
import Header from "../../../src/components/client-section/Header";
import Success from "@/src/components/client-section/get-quote/Success";
import { postClientQuote } from "@/src/services/ClientQuote";
import {
  QuoteForm,
  initialQuoteForm,
  FieldConfig,
} from "../../../src/types/client";

import { routes } from "@/src/constants/routes";

export default function Index() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [formData, setFormData] = useState<QuoteForm>(initialQuoteForm);
  const [error, setError] = useState(false);

  const stepConfigs: Record<
    number,
    { fields: FieldConfig[]; section: keyof QuoteForm }
  > = {
    0: {
      section: "company",
      fields: [
        { label: "CONSIGNEE", key: "name", required: true },
        { label: "COMPANY ADDRESS", key: "address", required: true },
        { label: "CONTACT PERSON", key: "contact_person", required: true },
        { label: "CONTACT NUMBER", key: "contact_number", required: true },
        { label: "EMAIL", key: "email", required: true },
      ],
    },
    1: {
      section: "service",
      fields: [],
    },
    2: {
      section: "commodity",
      fields: [],
    },
  };

  const postQuoteFormMutation = useMutation({
    mutationFn: postClientQuote,
    onSuccess: ({ data }) => {
      console.log("Success", data);
      setCurrentPosition(3);
    },
    onError: (err) => {
      setError(true);
      console.log("error", err);
      console.log("console log ", error);
    },
  });

  const handleSumbit = () => {
    postQuoteFormMutation.mutate(formData);
  };

  return (
    <>
      <FlatList
        data={[1]}
        renderItem={() => (
          <>
            <Header title={"Get Quote"} route={routes.CLIENT_DB} />
            <View style={{ padding: 20, flex: 1 }}>
              <StepIndicator
                customStyles={stepIndicatorStyles}
                currentPosition={currentPosition}
                stepCount={3}
                renderStepIndicator={(params) =>
                  params.stepStatus === "finished" ? (
                    <Check color="#FFFFFF" width={20} height={20} />
                  ) : null
                }
              />

              <View style={{ flex: 1, marginTop: 20 }}>
                {currentPosition === 0 && (
                  <Step_1
                    error={error}
                    formData={formData}
                    setFormData={setFormData}
                    fields={stepConfigs[0].fields}
                  />
                )}
                {currentPosition === 1 && (
                  <Step_2 formData={formData} setFormData={setFormData} />
                )}
                {currentPosition === 2 && <Step_3 />}
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {currentPosition === 3 && <Success />}
                </View>
              </View>
              {currentPosition < 3 && (
                <Buttons
                  currentPosition={currentPosition}
                  setCurrentPosition={setCurrentPosition}
                  setError={setError}
                  formData={formData}
                  stepConfigs={stepConfigs}
                  handleSumbit={handleSumbit}
                  loading={postQuoteFormMutation.isPending}
                />
              )}
            </View>
          </>
        )}
      />
    </>
  );
}

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#161F3C",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#161F3C",
  stepStrokeUnFinishedColor: "#C5C9D6",
  separatorFinishedColor: "#161F3C",
  separatorUnFinishedColor: "#C5C9D6",
  stepIndicatorFinishedColor: "#161F3C",
  stepIndicatorUnFinishedColor: "#FFFFFF",
  stepIndicatorCurrentColor: "#FFFFFF",
};
