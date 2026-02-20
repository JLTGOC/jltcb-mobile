import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

import { QuoteForm } from "@/src/types/client-type";

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
          numberOfLines={3}
          selectionColor="blue"
          mode="flat"
          style={styles.textInputContainer}
          theme={{
            roundness: 10,
          }}
          value={formData.shipment?.origin || ""}
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
          value={formData.shipment?.destination || ""}
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
