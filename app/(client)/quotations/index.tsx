import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import StepIndicator from "react-native-step-indicator";

import Success from "@/src/components/client-section/get-quote/Success";
import Buttons from "../../../src/components/client-section/get-quote/Buttons";
import Step_1 from "../../../src/components/client-section/get-quote/Step_1";
import Step_2 from "../../../src/components/client-section/get-quote/Step_2";
import Step_3 from "../../../src/components/client-section/get-quote/Step_3";
import Header from "../../../src/components/client-section/Header";

import {
  fetchClientQuote,
  postClientQuote,
  updateClientQuote,
} from "@/src/services/clientQuotation";

import { FieldConfig, QuoteForm } from "../../../src/types/client-type";

import { initialQuoteForm } from "../../../src/constants/client-const";

import { routes } from "@/src/constants/routes";

export default function CreateUpdateQuote() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [formData, setFormData] = useState<QuoteForm>(initialQuoteForm);

  const normalizeQuoteForm = (quote: QuoteForm): QuoteForm => {
    const documentsSource = Array.isArray(quote.documents)
      ? quote.documents
      : Array.isArray(quote.quotation_file)
        ? quote.quotation_file
        : [];

    const normalizedDocuments = documentsSource
      .filter(
        (document): document is NonNullable<typeof document> =>
          !!document &&
          typeof document.file_name === "string" &&
          document.file_name.trim().length > 0 &&
          typeof document.file_url === "string" &&
          document.file_url.trim().length > 0,
      )
      .map((document, index) => ({
        ...document,
        id: typeof document.id === "number" ? document.id : Date.now() + index,
        mimeType:
          "mimeType" in document && typeof document.mimeType === "string"
            ? document.mimeType
            : "application/octet-stream",
      }));

    return {
      ...initialQuoteForm,
      ...quote,
      documents: normalizedDocuments,
      removed_documents: Array.isArray(quote.removed_documents)
        ? quote.removed_documents
        : [],
    };
  };

  const { id, mode } = useLocalSearchParams<{
    id: string;
    title: string;
    mode: string;
  }>();

  const quotationId = Number(id);
  const hasValidQuotationId = Number.isFinite(quotationId) && quotationId > 0;

  // Data Fetching for updating
  const { data, refetch } = useQuery<QuoteForm>({
    queryKey: ["client-quote", quotationId],
    queryFn: () => fetchClientQuote(quotationId),
    enabled: hasValidQuotationId,
  });

  useEffect(() => {
    if (data && mode === "EDIT") {
      setFormData(normalizeQuoteForm(data));
    }
  }, [data, mode]);

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

  const quoteMutation = useMutation({
    mutationFn: async (formData: QuoteForm) => {
      if (hasValidQuotationId) {
        return await updateClientQuote(quotationId, formData);
      } else {
        return await postClientQuote(formData);
      }
    },
    onSuccess: async () => {
      if (hasValidQuotationId) {
        const { data: updatedData } = await refetch();

        if (updatedData) {
          setFormData(normalizeQuoteForm(updatedData));
        }
      }

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
            <Header
              title={mode === "EDIT" ? "Update Quote" : "Get Quote"}
              route={
                mode === "EDIT"
                  ? routes.CLIENT_REQ_QUOTE_RECORDS
                  : routes.CLIENT_DB
              }
            />
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
                    formData={formData}
                    setFormData={setFormData}
                    fields={stepConfigs[0].fields}
                  />
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
                  {currentPosition === 3 && <Success />}
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
