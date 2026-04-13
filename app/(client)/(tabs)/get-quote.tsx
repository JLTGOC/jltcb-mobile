import { useMutation, useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";

import Buttons from "@/src/components/client-section/get-quote/Buttons";
import CheckboxServices from "@/src/components/client-section/get-quote/CheckboxServices";
import Step_1 from "@/src/components/client-section/get-quote/Step_1";
import Step_2 from "@/src/components/client-section/get-quote/Step_2";
import Step_3 from "@/src/components/client-section/get-quote/Step_3";
import Success from "@/src/components/client-section/get-quote/Success";
import BannerHeader from "@/src/components/ui/BannerHeader";

import { getStepConfigs, initialQuoteForm } from "@/src/constants/client-const";
import { clientQuoteEnumsQueryOptions } from "@/src/query-options/client-quotations/clientQuotesQueryOptions";
import { postClientQuote } from "@/src/services/clientQuotation";
import { QuoteForm } from "@/src/types/client-quotation";

export default function CreateQuote() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isAutoFillChecked, setIsAutoFillChecked] = useState(false);
  const [formData, setFormData] = useState<QuoteForm>(initialQuoteForm);
  const stepConfigs = getStepConfigs(formData);

  const { data: quoteEnums = {} } = useQuery(clientQuoteEnumsQueryOptions());

  const handleAutoFillToggle = () => {
    const nextChecked = !isAutoFillChecked;
    setIsAutoFillChecked(nextChecked);

    if (!nextChecked) return;

    const autofillDetails = quoteEnums?.autofill_details;
    if (!autofillDetails) return;

    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        full_name: autofillDetails.full_name ?? prev.company?.full_name ?? "",
        company_address:
          autofillDetails.company?.address ?? prev.company?.company_address ?? "",
        contact_number:
          autofillDetails.company?.contact_number ??
          prev.company?.contact_number ??
          "",
        email: autofillDetails.company?.email ?? prev.company?.email ?? "",
      },
    }));
  };

  const quoteMutation = useMutation({
    mutationFn: async (formData: QuoteForm) => {
      return await postClientQuote(formData);
    },
    onSuccess: async () => {
      setFormData(formData);
      setCurrentPosition(3);
    },
    onError: (error: any) => {
      console.error("--- VALIDATION ERROR DETAILS ---");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error(
          "Server Message:",
          JSON.stringify(error.response.data, null, 2),
        );
      } else {
        console.error("Error Message:", error.message);
      }
    },
  });

  const handleSumbit = () => {
    quoteMutation.mutate(formData);
  };

  const handleAddAnotherQuotation = () => {
    setFormData(initialQuoteForm);
    setIsAutoFillChecked(false);
    setCurrentPosition(0);
    quoteMutation.reset();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
    >
      <FlatList
        data={[1]}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={() => (
          <>
            <BannerHeader title={"Get Quote"} variant="dark" />
            <View style={{ padding: 20, flex: 1 }}>
              {currentPosition === 0 && (
                <CheckboxServices
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

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
                  <>
                    {formData?.service?.transport_mode === "REGULATORY" && (
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          marginHorizontal: 10,
                        }}
                      >
                        <Checkbox.Android
                          color="#00960A"
                          status={isAutoFillChecked ? "checked" : "unchecked"}
                          onPress={handleAutoFillToggle}
                        />
                        <Text>AUTO FILL</Text>
                      </View>
                    )}

                    <Step_1
                      formData={formData}
                      setFormData={setFormData}
                      fields={stepConfigs[0].fields}
                      enums={quoteEnums}
                    />
                  </>
                )}
                {currentPosition === 1 && (
                  <Step_2 formData={formData} setFormData={setFormData} />
                )}
                {currentPosition === 2 && (
                  <Step_3 formData={formData} setFormData={setFormData} />
                )}
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {currentPosition === 3 && (
                    <Success
                      onAddAnotherQuotation={handleAddAnotherQuotation}
                      show={true}
                    />
                  )}
                </View>
              </View>
              {currentPosition < 3 && (
                <Buttons
                  currentPosition={currentPosition}
                  setCurrentPosition={setCurrentPosition}
                  formData={formData}
                  stepConfigs={stepConfigs}
                  handleSumbit={handleSumbit}
                  loading={quoteMutation.isPending}
                />
              )}
            </View>
          </>
        )}
      />
    </KeyboardAvoidingView>
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
