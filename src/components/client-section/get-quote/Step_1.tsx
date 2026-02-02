import { useState, Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import { QuoteForm, Field } from "../../../types/client";

type Props = {
  error: boolean,
  setError: Dispatch<SetStateAction<boolean>>
}

export default function Form({error, setError}: Props) {
  const fields: Field[] = [
    { label: "CONSIGNEE", key: "consignee" },
    { label: "COMPANY ADDRESS", key: "company_address" },
    { label: "CONTACT PERSON", key: "contact_person" },
    { label: "CONTACT NUMBER", key: "contact_number" },
    { label: "EMAIL", key: "email" },
  ];
  const [formData, setFormData] = useState<QuoteForm>({});

  return (
    <View style={styles.container}>
      {fields.map((field, i) => (
        <View key={i} style={{ marginVertical: 5, gap: 10 }}>
          <Text allowFontScaling={false} style={{ fontSize: 11 }}>
            {field.label}*
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
                if (text.trim() === "") {
                  setError(true);
                } else {
                  setError(false);
                }
              }}
            />
            {error && (
              <Text style={styles.errorText}>This field cannot be empty</Text>
            )}
          </Surface>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
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
  errorText: { color: "red", fontSize: 8, marginTop: 2 },
});
