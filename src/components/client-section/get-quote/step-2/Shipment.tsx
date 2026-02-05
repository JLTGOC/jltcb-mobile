import { Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

import { QuoteForm } from "@/src/types/client";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};
export default function Shipment({ formData, setFormData }: Props) {
  return (
    <>
      <View style={{ gap: 10 }}>
        <Text allowFontScaling={false} style={{ fontSize: 11 }}>
          ORIGIN
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="blue"
          mode="flat"
          style={styles.textInputContainer}
          theme={{
            roundness: 10,
          }}
          onChangeText={(text) => {
            setFormData((prev) => ({
              ...prev,
              shipment: { ...prev.shipment, origin: text },
            }));
          }}
        />
        <Text allowFontScaling={false} style={{ fontSize: 11 }}>
          DESTINATION
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="blue"
          mode="flat"
          style={styles.textInputContainer}
          theme={{
            roundness: 10,
          }}
          onChangeText={(text) => {
            setFormData((prev) => ({
              ...prev,
              shipment: { ...prev.shipment, destination: text },
            }));
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    borderRadius: 10,
    height: 40,
    backgroundColor: "#fff",
  },
});
