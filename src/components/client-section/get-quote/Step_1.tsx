import { useState, Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
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
  return (
    <View style={styles.container}>
      {fields.map((field, i) => (
        <View key={i} style={{ marginVertical: 5, gap: 10 }}>
          <Text allowFontScaling={false} style={{ fontSize: 11 }}>
            {field.label}
            <Text style={{ color: "red" }}>*</Text>
          </Text>
          <Surface style={{ elevation: 10, borderRadius: 10 }}>
            <TextInput
              value={formData[field.key] ?? ""}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              selectionColor="blue"
              mode="flat"
              style={{
                borderRadius: 10,
                height: 40,
                backgroundColor: "#fff",
              }}
              theme={{
                roundness: 10,
              }}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, [field.key]: text }));
              }}
            />
          </Surface>
        </View>
      ))}
      {error && (
        <>
          <Text style={styles.errorText}>Any fields cannot be left empty.</Text>
          <Text style={styles.errorText}>Fill the fields</Text>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 5,
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
  errorText: { color: "red", fontSize: 10, marginTop: 2, textAlign: "center" },
});
