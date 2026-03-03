import { Field, OJTFormData, PositionsSample } from "@/src/types/careers";
import * as Linking from "expo-linking";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  List,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import FileUploader from "../../../src/components/career-section/SubForm_FileUploader";

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

  const hasEmptyTextFields = textFields.some((field) => {
    const value = formData[field.key];
    return !value || value.trim() === "";
  });

  const hasAllRequiredUploads =
    Array.isArray(formData.cv_cover) &&
    formData.cv_cover.length >= 2 &&
    formData.cv_cover.slice(0, 2).every((fileUri) => fileUri.trim() !== "");

  const isSubmitDisabled =
    !checked || hasEmptyTextFields || !hasAllRequiredUploads;

  return (
    <View style={{ marginTop: -35 }}>
      {/* Position */}
      {/* ITS IS POSSIBLE TO MAKE IT INTO FLATLIST */}
      <Text variant="titleSmall" allowFontScaling={false}>
        Position
      </Text>
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
          <Text
            variant="titleSmall"
            style={{ textTransform: "uppercase" }}
            allowFontScaling={false}
          >
            {field.label}
            <Text
              style={{ fontSize: 10, marginLeft: 10 }}
              allowFontScaling={false}
            >
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
              allowFontScaling={false}
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
        <Text allowFontScaling={false}>
          Yes, I agree with the{" "}
          <Text
            onPress={() => openLink("https://jltcb.com/privacy-policy/")}
            style={styles.styledText}
            allowFontScaling={false}
          >
            privacy policy
          </Text>{" "}
          and{" "}
          <Text
            onPress={() => openLink("https://jltcb.com/terms-and-conditions/")}
            style={styles.styledText}
            allowFontScaling={false}
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
          disabled={isSubmitDisabled}
          buttonColor={isSubmitDisabled ? "#C5C9D6" : "#161F3C"}
          onPress={() => (
            setFormData({
              position: "",
              full_name: "",
              email: "",
              contact_number: "",
              cv_cover: [],
            }),
            setChecked(false)
          )}
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
