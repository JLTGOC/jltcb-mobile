import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import AutocompleteDropdown from "@/components/ui/AutocompleteDropdown";
import Button from "@/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import TextInput from "@/components/ui/TextInput";

import { THEMES } from "@/constants/themes";
import { quotationFormQueries } from "@/queries/quotations/form";
import {
  type RegulatoryStep2FormData,
  regulatoryStep2FormSchema,
} from "@/schemas/client-quotation-form/regulatory-quotation-form-schema";
import { useClientQuotationFormStore } from "@/stores/useClientQuotationFormStore";
import { CLIENT_TYPES } from "@/types/jobOrderEnums";

export default function RegulatoryForm() {
  const router = useRouter();

  const { regulatoryFormData, setRegulatoryFormData } =
    useClientQuotationFormStore(
      useShallow((state) => ({
        regulatoryFormData: state.regulatoryFormData,
        setRegulatoryFormData: state.setRegulatoryFormData,
      })),
    );

  const [othersText, setOthersText] = useState("");
  const [isOthersChecked, setIsOthersChecked] = useState(false);

  const { control, handleSubmit } = useForm<RegulatoryStep2FormData>({
    resolver: zodResolver(regulatoryStep2FormSchema),
    defaultValues: {
      type_of_regulatory_assistance:
        regulatoryFormData.type_of_regulatory_assistance,
      service_level: regulatoryFormData.service_level,
      message: regulatoryFormData.message,
    },
  });

  const onSubmit = handleSubmit((data) => {
    setRegulatoryFormData(data);
    router.navigate("/get-quote/step-3");
  });

  const { data, isPending } = useQuery(
    quotationFormQueries.enums({
      service: "REGULATORY",
      service_type: "BUSINESS SOLUTION",
    }),
  );

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="type_of_regulatory_assistance"
        render={({ field: { value, onChange }, fieldState }) => {
          const handleOthersToggle = () => {
            if (isOthersChecked) {
              setIsOthersChecked(false);
              onChange(
                value.filter((item: string) => item !== othersText.trim()),
              );
            } else {
              setIsOthersChecked(true);
              if (othersText.trim()) {
                onChange([...value, othersText.trim()]);
              }
            }
          };

          const handleOthersTextChange = (text: string) => {
            const prevTrimmed = othersText.trim();
            setOthersText(text);

            if (isOthersChecked) {
              const updated = value.filter(
                (item: string) => item !== prevTrimmed,
              );
              if (text.trim()) {
                onChange([...updated, text.trim()]);
              } else {
                onChange(updated);
              }
            }
          };

          return (
            <Field>
              <FieldLabel>TYPE OF REGULATORY ASSISTANCE *</FieldLabel>
              <View>
                {isPending ? (
                  <ActivityIndicator />
                ) : (
                  data?.data.regulatory_assistance_types.map((option) => (
                    <Checkbox.Item
                      key={option}
                      style={styles.checkbox}
                      labelStyle={styles.checkboxLabel}
                      label={option}
                      status={value.includes(option) ? "checked" : "unchecked"}
                      onPress={() => {
                        if (value.includes(option)) {
                          onChange(
                            value.filter((item: string) => item !== option),
                          );
                        } else {
                          onChange([...value, option]);
                        }
                      }}
                      color={THEMES.checkboxColor}
                      mode="android"
                      position="leading"
                    />
                  ))
                )}

                <View style={styles.othersRow}>
                  <Checkbox.Item
                    style={[styles.checkbox, styles.othersCheckbox]}
                    labelStyle={styles.checkboxLabel}
                    label="OTHERS."
                    status={isOthersChecked ? "checked" : "unchecked"}
                    onPress={handleOthersToggle}
                    color={THEMES.checkboxColor}
                    mode="android"
                    position="leading"
                  />

                  <RNTextInput
                    style={[
                      styles.othersInput,
                      isOthersChecked && styles.othersInputActive,
                    ]}
                    placeholder="Please specify..."
                    value={othersText}
                    onChangeText={handleOthersTextChange}
                    editable={isOthersChecked}
                  />
                </View>
              </View>
              {fieldState.invalid && <FieldError error={fieldState.error} />}
            </Field>
          );
        }}
      />

      <Controller
        control={control}
        name="service_level"
        render={({ field: { onChange, value, onBlur }, fieldState }) => (
          <Field>
            <FieldLabel>APPLICATION TYPE</FieldLabel>
            <AutocompleteDropdown
              dataSet={
                CLIENT_TYPES.map((type) => ({ id: type, title: type })) || []
              }
              textInputProps={{
                placeholder: "SELECT SERVICE LEVEL",
              }}
              onBlur={onBlur}
              onSelectItem={(item) => onChange(item?.id ?? "")}
              initialValue={value}
            />
            {fieldState.invalid && <FieldError error={fieldState.error} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="message"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Field>
            <FieldLabel>MESSAGE</FieldLabel>
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              numberOfLines={3}
              style={{
                minHeight: 75,
              }}
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
  checkbox: {
    paddingVertical: 2,
    paddingHorizontal: 0,
  },
  checkboxLabel: {
    textAlign: "left",
    fontSize: 13,
    lineHeight: 18,
  },
  othersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  othersCheckbox: {
    flex: 0,
  },
  othersInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 13,
    paddingVertical: 2,
    paddingHorizontal: 4,
    color: "#888",
  },
  othersInputActive: {
    borderBottomColor: "black",
    color: "black",
  },
  buttonContent: {
    flexDirection: "row-reverse",
  },
});
