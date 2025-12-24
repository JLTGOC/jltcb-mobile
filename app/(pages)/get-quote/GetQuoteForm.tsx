import { Text, StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import ImageInputBox from "./ImageInputBox";

// interfaces
type FieldKey = "fullName" | "email" | "contactNumber";

type Field = {
  label: string;
  key: FieldKey;
};

type ContactFormData = {
  [K in FieldKey]?: string;
} & {
  message?: string;
  imageUri?: string;
}
export default function GetQouteForm() {
  const fields: Field[] = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Contact Number", key: "contactNumber" },
  ];
  const [formData, setFormData] = useState<ContactFormData>({});

  return (
    <View style={styles.container}>

      {/* Personal Data */}
      {fields.map((field, i) => (
        <View key={i}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={[styles.inputbox, { height: 40 }]}
            value={formData[field.key] ?? ""}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, [field.key]: text }))
            }
          />
        </View>
      ))}
      {formData.imageUri}

      {/* Image */}
      <Text style={styles.label}>
        Upload File
        <Text style={{ fontWeight: "400", fontSize: 10 }}>
          (Commercial Invoice, Packing List, Airway Bill / Bill of Lading)
        </Text>
      </Text>
      <ImageInputBox setFormData={setFormData}/>

      {/* Message area */}
      <Text style={styles.label}>Message</Text>
      <TextInput
        value={formData.message ?? ""}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, message: text }))
        }
        multiline={true}
        numberOfLines={5}
        style={[
          styles.inputbox,
          {
            height: 100,
            paddingVertical: 10
          },
        ]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputbox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,

    // Android shadow
    elevation: 4,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Margin to lift it from other elements
    marginVertical: 5,
  },
  container: {
    marginTop: -30,
    marginHorizontal: 25,
  },
  texArea: {
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    height: 120,
  },
  label: { marginTop: 5, fontWeight: "400", fontSize: 14 },
});
