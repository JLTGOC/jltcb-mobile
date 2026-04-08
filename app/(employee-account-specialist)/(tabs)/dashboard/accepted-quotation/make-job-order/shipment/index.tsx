import AutocompleteDropdown from "@/src/components/ui/AutocompleteDropdown";
import BannerHeader from "@/src/components/ui/BannerHeader";
import FieldLegend from "@/src/components/ui/FieldLegend";
import FloatingLabelDatePicker from "@/src/components/ui/FloatingLabelDatePicker";
import FloatingLabelInput from "@/src/components/ui/FloatingLabelTextInput";
import { useJobOrderEnums } from "@/src/hooks/useJobOrderEnums";
import {
  type Step1Fields,
  step1Schema,
} from "@/src/schemas/makeJobOrderFormSchema";
import { useStore } from "@/src/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
} from "react-native";
import { Button, HelperText } from "react-native-paper";

export const TEXT_COLOR = "#666666";
export const TEXT_INPUT_STYLES: StyleProp<TextStyle> = {
  fontSize: 12,
  color: TEXT_COLOR,
};

export default function Step1Form() {
  const router = useRouter();
  const setJobOrderFormData = useStore((state) => state.setJobOrderFormData);

  const quotationReference = useStore((state) => state.quotationReference);
  const { data, isPending } = useJobOrderEnums(quotationReference);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<Step1Fields>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      subject: "",
      email_body: "",
      client_type: undefined,
      accredited: undefined,
      remarks: "",
      service_level: undefined,
      bl_no: "",
      eta: "",
      etd: "",
    },
  });

  const etaValue = watch("eta");
  const etdValue = watch("etd");

  const onSubmit = handleSubmit((data) => {
    setJobOrderFormData(data);
    router.push(
      "/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/make-job-order/shipment/step2",
    );
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={120}
    >
      <ScrollView>
        <BannerHeader title="Shipment" variant="light" />

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
              <HelperText type="error">
                {errors.service_level.message}
              </HelperText>
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
                  onValueChange={(dateString) => {
                    onChange(dateString);
                    if (etdValue) trigger(["eta", "etd"]);
                  }}
                  formatString="P"
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
                  onValueChange={(dateString) => {
                    onChange(dateString);
                    if (etaValue) trigger(["eta", "etd"]);
                  }}
                  formatString="P"
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
            onPress={onSubmit}
          >
            NEXT
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingVertical: 4,
  },
});
