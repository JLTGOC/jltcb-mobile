import AutocompleteDropdown from "@/src/components/ui/AutocompleteDropdown";
import BannerHeader from "@/src/components/ui/BannerHeader";
import FieldLegend from "@/src/components/ui/FieldLegend";
import FloatingLabelDatePicker from "@/src/components/ui/FloatingLabelDatePicker";
import FloatingLabelInput from "@/src/components/ui/FloatingLabelTextInput";
import { useJobOrderEnums } from "@/src/hooks/useJobOrderEnums";
import {
  type Step3Fields,
  step3Schema,
} from "@/src/schemas/makeJobOrderFormSchema";
import { useStore } from "@/src/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, HelperText } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";
import { TEXT_COLOR, TEXT_INPUT_STYLES } from ".";

export default function Step3Form() {
  const [jobOrderFormData, setJobOrderFormData] = useStore(
    useShallow((state) => [state.jobOrderFormData, state.setJobOrderFormData]),
  );

  const { quotationId, quotationReference } = useLocalSearchParams<{
    quotationId: string;
    quotationReference: string;
  }>();
  const { data, isPending } = useJobOrderEnums(quotationReference);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Fields>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      delivery_date: jobOrderFormData.delivery_date ?? "",
      completion_date: jobOrderFormData.completion_date ?? "",
      target_special_remarks: jobOrderFormData.target_special_remarks ?? "",

      terms_of_payment: jobOrderFormData.terms_of_payment ?? "",
      billing_date: jobOrderFormData.billing_date ?? "",
      shall_be_billed: jobOrderFormData.shall_be_billed ?? undefined,
    },
  });

  const onSubmit = handleSubmit((data) => {
    setJobOrderFormData(data);
    console.log("All Job Order Data: ", { ...jobOrderFormData, ...data });
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
          <FieldLegend>COMMITMENT INFORMATION</FieldLegend>
          <View>
            <Controller
              control={control}
              name="delivery_date"
              render={({ field: { onChange, value } }) => (
                <FloatingLabelDatePicker
                  label="TARGET DELIVERY"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            {errors.delivery_date && (
              <HelperText type="error">
                {errors.delivery_date.message}
              </HelperText>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="completion_date"
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label="TARGET COMPLETION PERIOD"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
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
              <HelperText type="error">
                {errors.billing_date.message}
              </HelperText>
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
