import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { addDays, compareAsc, format, formatDistance } from "date-fns";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, HelperText } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import AutocompleteDropdown from "@/components/ui/AutocompleteDropdown";
import BannerHeader from "@/components/ui/BannerHeader";
import FieldLegend from "@/components/ui/FieldLegend";
import FloatingLabelDatePicker from "@/components/ui/FloatingLabelDatePicker";
import FloatingLabelInput from "@/components/ui/FloatingLabelTextInput";
import KeyboardAwareScrollView from "@/components/ui/KeyboardAwareScrollView";

import { jobOrderFormQueries } from "@/queries/job-orders/form";
import {
  createStep3Schema,
  type Step3Fields,
} from "@/schemas/job-order/logistics-service-form-schema";
import { useJobOrderFormStore } from "@/stores/useJobOrderFormStore";
import { formatTargetDeliveryDate } from "@/utils/jobOrderForm";
import { TEXT_COLOR, TEXT_INPUT_STYLES } from ".";

export default function Step3Form() {
  const router = useRouter();
  const { quotationReference, logisticsFormData, setLogisticsFormData } =
    useJobOrderFormStore(
      useShallow((state) => ({
        quotationReference: state.quotationReference,
        logisticsFormData: state.logisticsFormData,
        setLogisticsFormData: state.setLogisticsFormData,
      })),
    );

  const eta = logisticsFormData.eta;
  const minimumDeliveryDate = eta ? addDays(new Date(eta), 1) : undefined;

  const { data, isPending } = useQuery(
    jobOrderFormQueries.enums(quotationReference ?? undefined),
  );

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Step3Fields>({
    resolver: zodResolver(createStep3Schema(eta)),
    defaultValues: {
      delivery_date: logisticsFormData.delivery_date,
      completion_date: logisticsFormData.completion_date,
      target_special_remarks: logisticsFormData.target_special_remarks ?? "",

      terms_of_payment: logisticsFormData.terms_of_payment ?? "",
      billing_date: logisticsFormData.billing_date,
      shall_be_billed: logisticsFormData.shall_be_billed ?? undefined,
      attached_docs: logisticsFormData.attached_docs ?? [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    setLogisticsFormData(data);
    router.push("/job-orders/shipment/new/summary");
  });

  return (
    <KeyboardAwareScrollView stickyHeaderIndices={[0]}>
      <BannerHeader title="Logistics Services" variant="light" />

      <View style={styles.content}>
        <FieldLegend>COMMITMENT INFORMATION</FieldLegend>
        <View>
          <Controller
            control={control}
            name="delivery_date"
            render={({ field: { onChange, value } }) => (
              <FloatingLabelDatePicker
                label="TARGET DELIVERY"
                value={value}
                onValueChange={(date) => {
                  onChange(date);
                  trigger("delivery_date");
                }}
                formatFunction={(date) => {
                  if (!eta) return format(date, "P");

                  if (compareAsc(date, new Date(eta)) !== 1) {
                    return formatDistance(date, new Date(eta), {
                      addSuffix: true,
                    });
                  }
                  return formatTargetDeliveryDate(date, new Date(eta));
                }}
                minimumDate={minimumDeliveryDate}
              />
            )}
          />
          {errors.delivery_date && (
            <HelperText type="error">{errors.delivery_date.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="completion_date"
            render={({ field: { onChange, value } }) => (
              <FloatingLabelDatePicker
                label="TARGET COMPLETION PERIOD"
                value={value}
                onValueChange={onChange}
              />
            )}
          />
          {errors.completion_date && (
            <HelperText type="error">
              {errors.completion_date.message}
            </HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="target_special_remarks"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="SPECIAL REMARKS"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline
                numberOfLines={2}
                style={{ minHeight: 55 }}
              />
            )}
          />
          {errors.target_special_remarks && (
            <HelperText type="error">
              {errors.target_special_remarks.message}
            </HelperText>
          )}
        </View>

        <FieldLegend>BILLING INFORMATION</FieldLegend>
        <View>
          <Controller
            control={control}
            name="terms_of_payment"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="TERMS OF PAYMENT"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.terms_of_payment && (
            <HelperText type="error">
              {errors.terms_of_payment.message}
            </HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="billing_date"
            render={({ field: { onChange, value } }) => (
              <FloatingLabelDatePicker
                label="WHEN TO BILL"
                value={value}
                onValueChange={onChange}
              />
            )}
          />
          {errors.billing_date && (
            <HelperText type="error">{errors.billing_date.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="shall_be_billed"
            render={({ field: { onChange, value } }) => (
              <AutocompleteDropdown
                textInputProps={{
                  placeholder: "SHALL BE BILLED",
                  style: TEXT_INPUT_STYLES,
                }}
                suggestionsListTextStyle={{ color: TEXT_COLOR }}
                dataSet={data?.shall_be_billed ?? null}
                loading={isPending}
                onSelectItem={(item) => onChange(item?.id)}
                initialValue={value}
              />
            )}
          />
          {errors.shall_be_billed && (
            <HelperText type="error">
              {errors.shall_be_billed.message}
            </HelperText>
          )}
        </View>

        <Controller
          control={control}
          name="attached_docs"
          render={({ field: { onChange, value } }) => {
            const handlePickDocument = async () => {
              try {
                const result = await DocumentPicker.getDocumentAsync({
                  type: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "image/png",
                    "image/jpeg",
                  ],
                  copyToCacheDirectory: true,
                  multiple: true,
                });

                if (!result.canceled) {
                  const currentDocs = value ?? [];
                  onChange([...currentDocs, ...result.assets]);
                }
              } catch (err) {
                console.error("Error picking document:", err);
              }
            };

            const displayValue =
              value && value.length > 0
                ? value.map((v) => v.name).join("\n")
                : "";

            return (
              <Pressable onPress={handlePickDocument}>
                <View pointerEvents="none">
                  <FloatingLabelInput
                    label="AVAILABLE DOCS ATTACHED"
                    value={displayValue}
                    multiline
                    numberOfLines={
                      displayValue
                        ? Math.max(3, displayValue.split("\n").length)
                        : 3
                    }
                    style={{ minHeight: 75 }}
                    editable={false}
                  />
                </View>
              </Pressable>
            );
          }}
        />

        <Button
          theme={{ colors: { primary: "#1C213B" } }}
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={onSubmit}
        >
          NEXT
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  button: {
    borderRadius: 6,
  },
  buttonLabel: {
    paddingVertical: 4,
  },
});
