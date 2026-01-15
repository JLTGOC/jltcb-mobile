import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Text,
  TextInput,
  List,
  Button,
  Surface,
  Checkbox,
} from "react-native-paper";
import { Field, OJTFormData, PositionsSample } from "@/src/types/careers";
import FileUploader from "./SubForm_FileUploader";
import * as Linking from "expo-linking";

const openLink = (url: string) => {
  Linking.openURL(url);
};

export default function Form() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const [checked, setChecked] = useState<boolean>(false);

  const textFields: Field[] = [
    {
      label: "Full Name",
      subLabel: "(last name, fisrtname)",
      key: "full_name",
    },
    { label: "Email", subLabel: "", key: "email" },
    { label: "Contact Number", subLabel: "", key: "contact_number" },
  ];

  const [formData, setFormData] = useState<OJTFormData>({
    position: "",
    cv_cover: [],
  });

  return (
    <View style={{ marginTop: -35 }}>
      {/* Position */}
      {/* ITS IS POSSIBLE TO MAKE IT INTO FLATLIST */}
      <Text variant="titleSmall">Position</Text>
      <List.Section>
        <List.Accordion
          title={formData.position ?? ""}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          style={styles.accordion}
          titleStyle={styles.accordionTitle}
          left={() => null}
        >
          {PositionsSample.map((sample) => (
            <List.Item
              key={sample}
              title={sample}
              onPress={() => {
                setFormData((prev) => ({
                  ...prev,
                  position: sample,
                }));
                setExpanded(false);
              }}
              style={styles.accordionItem}
              titleStyle={styles.accordionItemTitle}
            />
          ))}
        </List.Accordion>
      </List.Section>

      {/* OJT Data */}
      {textFields.map((field, i) => (
        <View key={i} style={{ marginVertical: 2 }}>
          <Text variant="titleSmall" style={{ textTransform: "uppercase" }}>
            {field.label}
            <Text style={{ fontSize: 10, marginLeft: 10 }}>
              {field.subLabel}
            </Text>
          </Text>

          <Surface
            style={{ elevation: 10, borderRadius: 10, marginVertical: 2 }}
          >
            <TextInput
              value={formData[field.key] ?? ""}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              selectionColor="blue"
              mode="flat"
              style={{
                borderRadius: 10, // optional extra rounding
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

      {/* FILE UPLOADER */}
      <FileUploader setFormData={setFormData} formData={formData} />

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
          <Text
            onPress={() => openLink("https://jltcb.com/privacy-policy/")}
            style={styles.styledText}
          >
            privacy policy
          </Text>{" "}
          and{" "}
          <Text
            onPress={() => openLink("https://jltcb.com/terms-and-conditions/")}
            style={styles.styledText}
          >
            terms and conditions.
          </Text>
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
          onPress={() => (
            setFormData({
              position: "",
              full_name: "",
              email: "",
              contact_number: "",
              cv_cover: []
            }), setChecked(false))
          }
        >
          SUBMIT
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  accordionTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
  },
  accordionItem: {
    backgroundColor: "#f9f9f9",
  },
  accordionItemTitle: {
    fontSize: 14,
    paddingVertical: 8,
  },
  styledText: {
    textDecorationLine: "underline",
    color: "#EE9034",
  },
});
