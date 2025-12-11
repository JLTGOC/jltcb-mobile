import { Text, StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import ImageInputBox from "./ImageInputBox";

export default function Form() {
  const personalData: string[] = ["Full Name", "Email", "Contact Number"];
  const [text, setText] = useState<string>("");

  return (
    <View style={styles.container}>
      {/* Personal Data */}
      {personalData.map((label, i) => (
        <View key={i}>
          <Text style={{ marginTop: 5, fontWeight: "400", fontSize: 14 }}>
            {label}
          </Text>
          <TextInput style={[styles.inputbox, { height: 40 }]} />
        </View>
      ))}

      {/* Image */}
      <Text style={{ marginVertical: 5, fontWeight: "400", fontSize: 14 }}>
        Upload File{" "}
        <Text style={{ fontWeight: "400", fontSize: 10 }}>
          (Commercial Invoice, Packing List, Airway Bill / Bill of Lading)
        </Text>
      </Text>
      <ImageInputBox />

      {/* Message area */}
      <Text style={{ marginTop: 5, fontWeight: "400", fontSize: 14 }}>
        Message
      </Text>
      <TextInput
        value={text}
        onChangeText={(newTextInput) => setText(newTextInput)}
        placeholder="Type your message..."
        multiline={true} // Makes it a textarea
        numberOfLines={5} // Optional: initial height
        style={[
          styles.inputbox,
          {
            height: 100,
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
});
