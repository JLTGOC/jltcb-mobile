import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Surface, Text, TextInput, HelperText } from "react-native-paper";
import { QuoteForm, Field } from "../../../types/client";

type Props = {
  error: boolean;
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
  fields: Field[];
};

export default function Step_1({
  error,
  setFormData,
  formData,
  fields,
}: Props) {
  const getError = (key: string, value: string) => {
    if (value.length === 0) return false;

    if (key === "email") {
      return value.length > 0 && !value.includes("@");
    }
    if (key === "contact_number") {
      const isWrongLength = value.length !== 11;

      const hasInvalidChars = /[^0-9]/.test(value);

      return isWrongLength || hasInvalidChars;
    }
    return false;
  };

  return (
      <ScrollView style={styles.container}
        automaticallyAdjustKeyboardInsets={true}
      >
        {fields.map((field, i) => {
          const value = formData.company?.[field.key] ?? "";
          const isEmailError = getError(field.key, value);

          return (
            <View key={i} style={{ marginVertical: 5, gap: 5 }}>
              <Text allowFontScaling={false} style={{ fontSize: 11 }}>
                {field.label}
                <Text style={{ color: "red" }}>*</Text>
              </Text>

              <Surface style={{ elevation: 10, borderRadius: 10 }}>
                <TextInput
                  value={value}
                  error={isEmailError}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  selectionColor="blue"
                  mode="flat"
                  maxLength={field.key === "contact_number" ? 11 : undefined}
                  style={{
                    borderRadius: 10,
                    height: 40,
                    backgroundColor: "#fff",
                  }}
                  keyboardType={
                    field.key === "contact_number"
                      ? "numeric"
                      : field.key === "email"
                        ? "email-address"
                        : "default"
                  }
                  onChangeText={(text) => {
                    let cleanedText = text;

                    if (field.key === "contact_number") {
                      cleanedText = text.replace(/[^0-9]/g, "");
                    }

                    setFormData((prev) => ({
                      ...prev,
                      company: { ...prev.company, [field.key]: cleanedText },
                    }));
                  }}
                />
              </Surface>

              {/* HelperText specific to the email field */}
              {field.key === "email" && (
                <HelperText type="error" visible={isEmailError}>
                  Email address is invalid (missing @)
                </HelperText>
              )}
              {field.key === "contact_number" &&
                value.length > 0 &&
                value.length < 11 && (
                  <HelperText type="error" visible={true}>
                    Contact number must be at least 11 digits
                  </HelperText>
                )}
            </View>
          );
        })}

        {error && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.errorText}>Fields cannot be left empty.</Text>
          </View>
        )}
      </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    gap: 5,
    padding:10
  },
  texArea: {
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    height: 120,
  },
  label: {
    marginTop: 5,
    fontWeight: "400",
    fontSize: 14,
  },
  inputError: {
    borderColor: "red",
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  errorText: { color: "red", fontSize: 10, marginTop: 2, textAlign: "center" },
});
