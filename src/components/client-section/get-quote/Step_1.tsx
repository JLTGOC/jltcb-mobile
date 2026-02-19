import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Surface, Text, TextInput, HelperText } from "react-native-paper";
import { QuoteForm, Field } from "../../../types/client";
import { z } from "zod";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
  fields: Field[];
};

const companySchema = z.object({
  name: z.string().min(1, "Company name is required").max(100, "Name is too long"),
  address: z.string().min(1, "Address is required"),
  contact_person: z.string().min(1, "Contact person name is required"),
  contact_number: z
    .string()
    .length(11, "Number must be exactly 11 digits")
    .regex(/^\d+$/, "Must contain only numbers"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export default function Step_1({ setFormData, formData, fields }: Props) {

  const validationResult = useMemo(() => {
    return companySchema.safeParse(formData.company);
  }, [formData.company]);

  const getFieldError = (key: string) => {
    if (validationResult.success) return null;
    const issue = validationResult.error.issues.find((i) => i.path[0] === key);
    return issue ? issue.message : null;
  };

  const handleInputChange = useCallback((key: string, text: string) => {
    let cleanedText = text;
    if (key === "contact_number") {
      cleanedText = text.replace(/[^0-9]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: cleanedText },
    }));
  }, [setFormData]);

  console.log("step_1",formData)

  return (
    <ScrollView 
      style={styles.container} 
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.contentContainer}
    >
      {fields.map((field) => {
        const value = formData.company?.[field.key as keyof typeof formData.company] ?? "";
        

        const errorMsg = getFieldError(field.key);
        
        const hasError = !!errorMsg && value.length > 0;

        return (
          <View key={field.key} style={styles.fieldWrapper}>
            <Text allowFontScaling={false} style={styles.customLabel}>
              {field.label} <Text style={{ color: "red" }}>*</Text>
            </Text>

            <Surface style={styles.inputSurface}>
              <TextInput
                value={formData.company?.[field.key as keyof typeof formData.company] ?? ""}
                error={hasError}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                selectionColor="blue"
                numberOfLines={3}
                mode="flat"
                maxLength={field.key === "contact_number" ? 11 : undefined}
                style={styles.input}
                keyboardType={
                  field.key === "contact_number" ? "numeric" : 
                  field.key === "email" ? "email-address" : "default"
                }
                onChangeText={(text) => handleInputChange(field.key, text)}
              />
            </Surface>

            <HelperText type="error" visible={hasError}>
              {errorMsg}
            </HelperText>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,  },
  contentContainer: { padding: 16 },
  fieldWrapper: { marginBottom: 8 },
  customLabel: { fontSize: 12, marginBottom: 4, color: '#666' },
  inputSurface: { elevation: 2, borderRadius: 10, backgroundColor: "#fff" },
  input: { borderRadius: 10, height: 45, backgroundColor: "transparent" },
});