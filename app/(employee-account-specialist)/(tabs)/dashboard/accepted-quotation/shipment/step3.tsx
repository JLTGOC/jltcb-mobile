import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, compareAsc, formatDistance } from "date-fns";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import AutocompleteDropdown from "@/src/components/ui/AutocompleteDropdown";
import BannerHeader from "@/src/components/ui/BannerHeader";
import FieldLegend from "@/src/components/ui/FieldLegend";
import FloatingLabelDatePicker from "@/src/components/ui/FloatingLabelDatePicker";
import FloatingLabelInput from "@/src/components/ui/FloatingLabelTextInput";
import KeyboardAwareScrollView from "@/src/components/ui/KeyboardAwareScrollView";

import { useJobOrderEnums } from "@/src/hooks/useJobOrderEnums";
import {
  createStep3Schema,
  type Step3Fields,
} from "@/src/schemas/job-order/logistics-service-form-schema";
import { useJobOrderFormStore } from "@/src/stores/useJobOrderFormStore";
import { formatTargetDeliveryDate } from "@/src/utils/jobOrderForm";
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

  const { data, isPending } = useJobOrderEnums(quotationReference ?? "");

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
    },
  });

  const onSubmit = handleSubmit((data) => {
    setLogisticsFormData(data);
    router.push(
      "/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/shipment/summary",
    );
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
                  if (compareAsc(date, new Date(eta!)) !== 1) {
                    return formatDistance(date, new Date(eta!), {
                      addSuffix: true,
                    });
                  }
                  return formatTargetDeliveryDate(date, new Date(eta!));
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

        <FloatingLabelInput
          label="AVAILABLE DOCS ATTACHED"
          multiline
          numberOfLines={3}
          style={{ minHeight: 75 }}
          editable={false}
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
