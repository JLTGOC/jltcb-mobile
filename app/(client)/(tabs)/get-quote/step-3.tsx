import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import StepScrollView from "@/components/client-section/get-quote/StepScrollView";
import DocumentList from "@/components/quote-section/DocumentList";
import DocumentUploadButton from "@/components/quote-section/DocumentUploadButton";
import Button from "@/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import TextInput from "@/components/ui/TextInput";

import { useCreateQuotationMutation } from "@/hooks/mutations/quotations/useCreateQuotationMutation";
import { logisticsQuotationFormSchema } from "@/schemas/client-quotation-form/logistics-quotation-form-schema";
import { regulatoryQuotationFormSchema } from "@/schemas/client-quotation-form/regulatory-quotation-form-schema";
import {
  type Step3FormData,
  step3FormSchema,
} from "@/schemas/client-quotation-form/shared-form-schema";
import { useClientQuotationFormStore } from "@/stores/useClientQuotationFormStore";
import {
  transformToLogisticsQuotePayload,
  transformToRegulatoryQuotePayload,
} from "@/utils/quotationForm";

export default function Step3() {
  const router = useRouter();

  const { service, sharedFormData, logisticsFormData, regulatoryformData } =
    useClientQuotationFormStore(
      useShallow((state) => ({
        service: state.service,
        sharedFormData: state.sharedFormData,
        logisticsFormData: state.logisticsFormData,
        regulatoryformData: state.regulatoryFormData,
      })),
    );

  const defaultValues: Step3FormData =
    service === "LOGISTICS"
      ? {
          documents: logisticsFormData.documents ?? [],
          remarks: logisticsFormData.remarks ?? "",
        }
      : {
          documents: regulatoryformData.documents ?? [],
          remarks: regulatoryformData.remarks ?? "",
        };

  const { control, handleSubmit } = useForm<Step3FormData>({
    resolver: zodResolver(step3FormSchema),
    defaultValues: defaultValues,
  });

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
          "application/vnd.ms-excel", // .xls
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        ],
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled) {
        return result.assets;
      }
    } catch (e) {
      console.error("Error picking document:", e);
    }
  };

  const getPayload = (data: Step3FormData) => {
    if (service === "LOGISTICS") {
      const mergedData = { ...sharedFormData, ...logisticsFormData, ...data };
      const validatedData = logisticsQuotationFormSchema.safeParse(mergedData);
      if (!validatedData.success) return;
      return transformToLogisticsQuotePayload(validatedData.data);
    } else {
      const mergedData = { ...sharedFormData, ...regulatoryformData, ...data };
      const validatedData = regulatoryQuotationFormSchema.safeParse(mergedData);
      if (!validatedData.success) return;
      return transformToRegulatoryQuotePayload(validatedData.data);
    }
  };

  const { mutate: createQuotation, isPending } = useCreateQuotationMutation();
  const reset = useClientQuotationFormStore((state) => state.reset);

  const onSubmit = handleSubmit(async (data) => {
    const payload = getPayload(data);
    if (!payload) return;

    createQuotation(payload, {
      onSuccess: () => {
        reset();
        router.navigate("/get-quote/success");
      },
      onError: (err) => {
        if (isAxiosError(err)) {
          console.error("Error creating quotation:", err);
        }
      },
    });
  });

  return (
    <StepScrollView>
      <Controller
        control={control}
        name="documents"
        render={({ field: { value, onChange }, fieldState }) => (
          <Field>
            <FieldLabel>
              UPLOAD DOCUMENTS (bill of ladding/airway bill)
            </FieldLabel>
            <DocumentUploadButton
              onPress={async () => {
                const documents = await handlePickDocument();
                if (documents) {
                  onChange([...value, ...documents]);
                }
              }}
            />
            <DocumentList
              documents={value}
              onDelete={({ uri }) =>
                onChange(value.filter((document) => document.uri !== uri))
              }
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="remarks"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <Field>
            <FieldLabel>REMARKS</FieldLabel>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={2}
              style={{ minHeight: 60 }}
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Button loading={isPending} onPress={onSubmit}>
        SUBMIT
      </Button>
    </StepScrollView>
  );
}
