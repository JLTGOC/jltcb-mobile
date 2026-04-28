import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { type StyleProp, StyleSheet, type TextStyle, View } from "react-native";
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
  type Step1Fields,
  step1Schema,
} from "@/src/schemas/job-order/logistics-service-form-schema";
import { useJobOrderFormStore } from "@/src/stores/useJobOrderFormStore";

export const TEXT_COLOR = "#666666";
export const TEXT_INPUT_STYLES: StyleProp<TextStyle> = {
  fontSize: 12,
  color: TEXT_COLOR,
};

export default function Step1Form() {
  const router = useRouter();

  const { quotationReference, logisticsFormData, setLogisticsFormData } =
    useJobOrderFormStore(
      useShallow((state) => ({
        quotationReference: state.quotationReference,
        logisticsFormData: state.logisticsFormData,
        setLogisticsFormData: state.setLogisticsFormData,
      })),
    );

  const { data, isPending } = useJobOrderEnums(quotationReference ?? "");

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<Step1Fields>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      subject: logisticsFormData.subject ?? "",
      email_body: logisticsFormData.email_body ?? "",
      client_type: logisticsFormData.client_type,
      accredited: logisticsFormData.accredited,
      remarks: logisticsFormData.remarks ?? "",
      service_level: logisticsFormData.service_level,
      bl_no: logisticsFormData.bl_no ?? "",
      eta: logisticsFormData.eta,
      etd: logisticsFormData.etd,
    },
  });

  const etaValue = watch("eta");
  const etdValue = watch("etd");

  const onSubmit = handleSubmit((data) => {
    setLogisticsFormData(data);
    router.push(
      "/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/shipment/step2",
    );
  });

  return (
    <KeyboardAwareScrollView>
      <BannerHeader title="Logistics Services" variant="light" />

      <View style={styles.content}>
        {/* Subject */}
        <View>
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="SUBJECT"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.subject && (
            <HelperText type="error">{errors.subject.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="email_body"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="MESSAGE"
                multiline
                numberOfLines={3}
                style={{ minHeight: 75 }}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.email_body && (
            <HelperText type="error">{errors.email_body.message}</HelperText>
          )}
        </View>

        <FieldLegend>CLIENT INFORMATION</FieldLegend>
        <FloatingLabelInput
          label="CONSIGNEE"
          editable={false}
          value={data?.autofill_details?.company_name.toUpperCase()}
        />
        <View>
          <Controller
            control={control}
            name="client_type"
            render={({ field: { onChange, value } }) => (
              <AutocompleteDropdown
                textInputProps={{
                  placeholder: "CLIENT TYPE",
                  style: TEXT_INPUT_STYLES,
                }}
                suggestionsListTextStyle={{ color: TEXT_COLOR }}
                dataSet={data?.client_types ?? null}
                loading={isPending}
                onSelectItem={(item) => onChange(item?.id)}
                initialValue={value}
              />
            )}
          />
          {errors.client_type && (
            <HelperText type="error">{errors.client_type.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="accredited"
            render={({ field: { onChange, value } }) => (
              <AutocompleteDropdown
                textInputProps={{
                  placeholder: "ACCREDITED",
                  style: TEXT_INPUT_STYLES,
                }}
                suggestionsListTextStyle={{ color: TEXT_COLOR }}
                dataSet={data?.accredited ?? null}
                loading={isPending}
                onSelectItem={(item) => onChange(item?.id)}
                initialValue={value}
              />
            )}
          />
          {errors.accredited && (
            <HelperText type="error">{errors.accredited.message}</HelperText>
          )}
        </View>
        <FloatingLabelInput
          label="SHIPPER"
          editable={false}
          value={data?.autofill_details?.full_name.toUpperCase()}
        />

        <View>
          <Controller
            control={control}
            name="remarks"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="REMARKS ON HANDLING CLIENT"
                multiline
                numberOfLines={3}
                style={{ minHeight: 75 }}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.remarks && (
            <HelperText type="error">{errors.remarks.message}</HelperText>
          )}
        </View>

        <FieldLegend>SERVICE INFORMATION</FieldLegend>

        <View>
          <Controller
            control={control}
            name="service_level"
            render={({ field: { onChange, value } }) => (
              <AutocompleteDropdown
                textInputProps={{
                  placeholder: "SERVICE LEVEL",
                  style: TEXT_INPUT_STYLES,
                }}
                suggestionsListTextStyle={{ color: TEXT_COLOR }}
                dataSet={data?.service_levels ?? null}
                loading={isPending}
                onSelectItem={(item) => onChange(item?.id)}
                initialValue={value}
              />
            )}
          />
          {errors.service_level && (
            <HelperText type="error">{errors.service_level.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="bl_no"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="BL NO"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.bl_no && (
            <HelperText type="error">{errors.bl_no.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="eta"
            render={({ field: { onChange, value } }) => (
              <FloatingLabelDatePicker
                label="ESTIMATED TIME OF ARRIVAL"
                value={value}
                onValueChange={(date) => {
                  onChange(date);
                  if (etdValue) trigger(["eta", "etd"]);
                }}
                formatFunction={(date) => format(date, "P")}
                maximumDate={etdValue ? new Date(etdValue) : undefined}
              />
            )}
          />
          {errors.eta && (
            <HelperText type="error">{errors.eta.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="etd"
            render={({ field: { onChange, value } }) => (
              <FloatingLabelDatePicker
                label="ESTIMATED TIME OF DEPARTURE"
                value={value}
                onValueChange={(date) => {
                  onChange(date);
                  if (etaValue) trigger(["eta", "etd"]);
                }}
                formatFunction={(date) => format(date, "P")}
                minimumDate={etaValue ? new Date(etaValue) : undefined}
              />
            )}
          />
          {errors.etd && (
            <HelperText type="error">{errors.etd.message}</HelperText>
          )}
        </View>

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
