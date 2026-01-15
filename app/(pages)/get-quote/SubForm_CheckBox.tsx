import { useState, Dispatch,SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Checkbox } from "react-native-paper";
import { ContactFormData } from "@/src/types/get-quote";
import * as Linking from "expo-linking";

const openLink = (url: string) => {
  Linking.openURL(url);
};

type Props = {
  setFormData:  Dispatch<SetStateAction<ContactFormData>>
}

export default function SubForm_CheckBox({setFormData} : Props) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox.Android
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
          uncheckedColor="#000000ff"
          color="#161F3C"
        />
        <Text>
          Yes, I agree with the{" "}
          <Text onPress={() => openLink("https://jltcb.com/privacy-policy/")} style={styles.styledText}>privacy policy</Text> and{" "}
          <Text onPress={() => openLink("https://jltcb.com/terms-and-conditions/")} style={styles.styledText}>terms and conditions.</Text>
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          mode="contained"
          style={{
            borderRadius: 10,
            marginBottom: 30,
            width: 150,
          }}
          disabled={!checked}
          buttonColor={!checked ? "#161F3C" : "#323f68ff"}
          onPress={() => setFormData(
            {
              full_name: "",
              email: "",
              contact_number: "",
              message: "",
              imageUri: ""
            }
          )}
        >
          SUBMIT
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  styledText: {
    textDecorationLine: "underline",
    color: "#EE9034",
  },
});
