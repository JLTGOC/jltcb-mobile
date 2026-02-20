import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import { ContactFormData, Field } from "../../../src/types/get-quote";
import SubForm_ImageInput from "./SubForm_ImageInput";
import SubForm_CheckBox from "./SubForm_CheckBox";

export default function Form() {
  const fields: Field[] = [
    { label: "Full Name", key: "full_name" },
    { label: "Email", key: "email" },
    { label: "Contact Number", key: "contact_number" },
  ];
  const [formData, setFormData] = useState<ContactFormData>({
    message: "",
    imageUri: "",
  });

  return (
    <View style={styles.container}>
      {/* Personal Data */}
      {fields.map((field, i) => (
        <View key={i} style={{ marginVertical: 5 }}>
          <Text variant="titleSmall" allowFontScaling={false}>
            {field.label}
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
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, [field.key]: text }))
              }
            />
          </Surface>
        </View>
      ))}
      {/* Image */}
      <Text variant="titleSmall" allowFontScaling={false}>
        Upload File
        <Text variant="labelSmall" allowFontScaling={false}>
          (Commercial Invoice, Packing List, Airway Bill / Bill of Lading)
        </Text>
      </Text>

      {/* Image Input Area */}
      <SubForm_ImageInput setFormData={setFormData} formData={formData} />

      {/* Message area */}
      <Text variant="titleSmall" allowFontScaling={false}>
        Message
      </Text>
      <Surface style={{ elevation: 10, borderRadius: 10 }}>
        <TextInput
          value={formData.message ?? ""}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, message: text }))
          }
          multiline={true}
          underlineColor="transparent" // removes underline
          activeUnderlineColor="transparent" // removes underline when focused
          mode="flat"
          style={{
            borderRadius: 10, // optional extra rounding
            height: 100,
            backgroundColor: "#fff",
          }}
          theme={{
            roundness: 10,
          }}
        />
      </Surface>

      {/* Check Box and Submit Button */}
      <SubForm_CheckBox setFormData={setFormData} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: -30,
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
});
