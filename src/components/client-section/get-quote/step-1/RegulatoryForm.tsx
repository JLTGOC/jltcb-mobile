import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import AutocompleteDropdown from "@/src/components/ui/AutocompleteDropdown";
import Button from "@/src/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/src/components/ui/Field";
import TextInput from "@/src/components/ui/TextInput";

import { THEMES } from "@/src/constants/themes";
import { clientQuoteEnumsQueryOptions } from "@/src/query-options/client-quotations/clientQuotesQueryOptions";
import {
  type RegulatoryStep1FormData,
  regulatoryStep1FormSchema,
} from "@/src/schemas/client-quotation-form/regulatory-quotation-form-schema";
import { useClientQuotationFormStore } from "@/src/stores/useClientQuotationFormStore";

export default function RegulatoryForm() {
  const router = useRouter();
  const [dropdownKey, setDropdownKey] = useState(0);

  const {
    autofill,
    toggleAutofill,
    savedStep1FormData,
    setSavedStep1FormData,
    sharedFormData,
    setSharedFormData,
    setLogisticsFormData,
    regulatoryFormData,
    setRegulatoryFormData,
  } = useClientQuotationFormStore(
    useShallow((state) => ({
      autofill: state.autofill,
      toggleAutofill: state.toggleAutofill,
      savedStep1FormData: state.savedStep1FormData,
      setSavedStep1FormData: state.setSavedStep1FormData,
      sharedFormData: state.sharedFormData,
      setSharedFormData: state.setSharedFormData,
      setLogisticsFormData: state.setLogisticsFormData,
      regulatoryFormData: state.regulatoryFormData,
      setRegulatoryFormData: state.setRegulatoryFormData,
    })),
  );

  const { data, isPending } = useQuery(
    clientQuoteEnumsQueryOptions({
      service: "REGULATORY",
      service_type: "BUSINESS SOLUTION",
    }),
  );

  const { control, handleSubmit, reset, getValues } =
    useForm<RegulatoryStep1FormData>({
      resolver: zodResolver(regulatoryStep1FormSchema),
      defaultValues: {
        fullName: regulatoryFormData.fullName,
        companyName: sharedFormData.companyName,
        companyAddress: sharedFormData.companyAddress,
        companyPosition: regulatoryFormData.companyPosition,
        companyContactNumber: sharedFormData.companyContactNumber,
        companyEmail: sharedFormData.companyEmail,
        companyBusinessType: regulatoryFormData.companyBusinessType,
        companyContactPerson: regulatoryFormData.companyContactPerson,
        companyContactPersonContactNumber:
          regulatoryFormData.companyContactPersonContactNumber,
      },
    });

  // Autofill form data when navigating back to the form
  useEffect(() => {
    reset({
      ...regulatoryFormData,
      ...sharedFormData,
    });
  }, [regulatoryFormData, sharedFormData, reset]);

  // Save form data to store when navigating away from the form
  useEffect(() => {
    return () => {
      const {
        companyName,
        companyAddress,
        companyContactNumber,
        companyEmail,
        ...regulatory
      } = getValues();
      setSharedFormData({
        companyName,
        companyAddress,
        companyContactNumber,
        companyEmail,
      });
      setRegulatoryFormData(regulatory);
      setLogisticsFormData({
        companyContactPerson: regulatory.companyContactPerson,
      });
    };
  }, [
    setRegulatoryFormData,
    setSharedFormData,
    getValues,
    setLogisticsFormData,
  ]);

  const handleToggleAutofill = () => {
    if (!autofill) {
      setSavedStep1FormData(getValues());
      if (data) {
        const { full_name, company } = data.data.autofill_details;
        reset({
          fullName: full_name,
          companyName: company.name,
          companyAddress: company.address,
          companyPosition: company.position,
          companyContactNumber: company.contact_number,
          companyEmail: company.email,
          companyBusinessType: company.business_type,
        });
      }
    } else {
      if (savedStep1FormData) reset(savedStep1FormData);
    }
    toggleAutofill();
    setDropdownKey((prev) => prev + 1); // force remount
  };

  const onSubmit = handleSubmit(
    ({
      companyName,
      companyAddress,
      companyContactNumber,
      companyEmail,
      ...regulatory
    }) => {
      setSharedFormData({
        companyName,
        companyAddress,
        companyContactNumber,
        companyEmail,
      });
      setRegulatoryFormData(regulatory);
      router.navigate("/get-quote/step-2");
    },
  );

  return (
    <View style={styles.container}>
      <Checkbox.Item
        disabled={isPending}
        labelStyle={styles.checkboxLabel}
        style={styles.checkbox}
        position="leading"
        color={THEMES.checkboxColor}
        mode="android"
        label="AUTO-FILL WITH MY DETAILS (Use your saved information)"
        status={autofill ? "checked" : "unchecked"}
        onPress={handleToggleAutofill}
      />

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>FULL NAME *</FieldLabel>
            <TextInput onChangeText={onChange} onBlur={onBlur} value={value} />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyName"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>COMPANY NAME *</FieldLabel>
            <TextInput onChangeText={onChange} onBlur={onBlur} value={value} />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyAddress"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>COMPANY ADDRESS *</FieldLabel>
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              style={styles.multiline}
              numberOfLines={2}
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyPosition"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>POSITION *</FieldLabel>
            <TextInput onChangeText={onChange} onBlur={onBlur} value={value} />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyContactNumber"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>CONTACT NUMBER *</FieldLabel>
            <TextInput
              onChangeText={(text) => {
                // Remove non-numeric characters
                let numericText = text.replace(/[^0-9]/g, "");

                // Ensure it starts with "09"
                if (!numericText.startsWith("09")) {
                  numericText = `09${numericText.replace(/^0+/, "").replace(/^9+/, "")}`;
                }

                onChange(numericText);
              }}
              onBlur={onBlur}
              value={value}
              keyboardType="phone-pad"
              maxLength={11}
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyEmail"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>EMAIL *</FieldLabel>
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="email-address"
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyBusinessType"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>BUSINESS TYPE *</FieldLabel>
            <AutocompleteDropdown
              key={dropdownKey}
              dataSet={
                data?.data.business_types.map((type) => ({
                  id: type,
                  title: type,
                })) ?? []
              }
              onBlur={onBlur}
              onSelectItem={(item) => onChange(item?.id ?? "")}
              initialValue={value}
              loading={isPending}
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyContactPerson"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>CONTACT PERSON</FieldLabel>
            <TextInput onChangeText={onChange} onBlur={onBlur} value={value} />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="companyContactPersonContactNumber"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>CONTACT PERSON CONTACT NUMBER</FieldLabel>
            <TextInput
              onChangeText={(text) => {
                // Remove non-numeric characters
                const numericText = text.replace(/[^0-9]/g, "");

                onChange(numericText);
              }}
              onBlur={onBlur}
              value={value}
              keyboardType="phone-pad"
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Button
        contentStyle={styles.buttonContent}
        icon="arrow-right"
        onPress={onSubmit}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  multiline: {
    minHeight: 60,
  },
  checkbox: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: -12,
  },
  checkboxLabel: {
    textAlign: "left",
    fontSize: 12,
  },
  buttonContent: {
    flexDirection: "row-reverse",
  },
});
