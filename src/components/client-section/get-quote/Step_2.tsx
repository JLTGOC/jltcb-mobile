<<<<<<< HEAD
import { Dispatch, SetStateAction } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Checkbox, Text, TextInput } from "react-native-paper";

import Service from "@/src/components/client-section/get-quote/step-2/Service";
import { QuoteEnums, QuoteForm } from "../../../types/client-quotation";
=======
import type { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native";

import Service from "@/components/client-section/get-quote/step-2/Service";
import type { QuoteForm } from "@/types/client-quotation";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
import Commodity from "./step-2/Commodity";
import Shipment from "./step-2/Shipment";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
  enums: QuoteEnums;
};

export default function Step_2({ formData, setFormData, enums }: Props) {
  const serviceLevel = ["NEW", "RENEWAL"];
  // enums?.regulatory_assistance_types
  const regulatoryAssistanceTypes = Array.from(
    new Set([...(enums?.regulatory_assistance_types ?? [])]),
  );
  const regulatoryTypesSet = new Set(regulatoryAssistanceTypes);

  const selectedRegulatoryTypes = formData.service?.options ?? [];
  const othersTextValue = selectedRegulatoryTypes.find(
    (option) => !regulatoryTypesSet.has(option),
  );

  const toggleRegulatoryType = (item: string) => {
    setFormData((prev) => {
      const currentOptions = prev.service?.options ?? [];
      const isSelected = currentOptions.includes(item);

      const nextOptions = isSelected
        ? currentOptions.filter(
            (option) =>
              option !== item 
            // && !(item === "OTHERS." && !regulatoryTypesSet.has(option)),
          )
        : [...currentOptions, item];

      return {
        ...prev,
        service: {
          ...prev.service,
          options: nextOptions,
        },
      };
    });
  };

  const handleOthersTextChange = (text: string) => {
    const cleanedText = text.trim();

    setFormData((prev) => {
      const currentOptions = prev.service?.options ?? [];
      const currentWithoutCustom = currentOptions.filter((option) =>
        regulatoryTypesSet.has(option),
      );
      const hasOthersChecked = currentWithoutCustom.includes("OTHERS.");

      const nextOptions =
        hasOthersChecked && cleanedText
          ? [...currentWithoutCustom, cleanedText]
          : currentWithoutCustom;

      return {
        ...prev,
        service: {
          ...prev.service,
          options: nextOptions,
        },
      };
    });
  };

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      automaticallyAdjustKeyboardInsets={true}
<<<<<<< HEAD
      ListHeaderComponent={
        formData?.services === "REGULATORY" ? (
          <View style={{ gap: 2 }}>
            <Text>
              TYPE OF REGULATORY ASSISTANCE{" "}
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            {regulatoryAssistanceTypes.map((item) => (
              <View key={item} style={{ marginHorizontal: 10 }}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Checkbox.Android
                    status={
                      selectedRegulatoryTypes.includes(item)
                        ? "checked"
                        : "unchecked"
                    }
                    color="#00960A"
                    onPress={() => toggleRegulatoryType(item)}
                  />
                  <Text>{item}</Text>

                  {/* {item === "OTHERS." &&
                    selectedRegulatoryTypes.includes(item) && (
                      <View style={{ flex: 1, marginLeft: 8 }}>
                        <TextInput
                          mode="flat"
                          value={othersTextValue ?? ""}
                          onChangeText={handleOthersTextChange}
                          placeholder="Please specify"
                          underlineColor="#9CA3AF"
                          activeUnderlineColor="#161F3C"
                          style={{ backgroundColor: "transparent", height: 40 }}
                        />
                      </View>
                    )} */}
                </View>
              </View>
            ))}

            <Text allowFontScaling={false} style={styles.customLabel}>
              APPLICATION TYPE <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={(serviceLevel ?? []).map((type) => ({
                label: type,
                value: type,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="SELECT SERVICE LEVEL"
              value={formData.service_level}
              onChange={(item: { label: string; value: string }) => {
                setFormData((prev) => ({
                  ...prev,
                  service_level: item.value,
                }));
              }}
            />

            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10 }}>MESSAGE</Text>
              <TextInput
                mode="flat"
                value={formData.message || ""}
                onChangeText={(text) => {
                  setFormData((prev) => ({ ...prev, message: text }));
                }}
                multiline={true}
                numberOfLines={4}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                selectionColor="blue"
                style={{
                  borderRadius: 10,
                  height: 80,
                  backgroundColor: "#fff",
                }}
                theme={{ roundness: 10 }}
              />
            </View>
          </View>
        ) : (
          <>
            <Service formData={formData} setFormData={setFormData} />
            {formData.service?.type !== "BUSINESS SOLUTION" ? (
              <>
                <Commodity formData={formData} setFormData={setFormData} />
                <Shipment formData={formData} setFormData={setFormData} />
              </>
            ) : (
              ""
            )}
          </>
        )
      }
    />
=======
    >
      <Service formData={formData} setFormData={setFormData} />
      {formData.service?.type !== "BUSINESS SOLUTION" ? (
        <>
          <Commodity formData={formData} setFormData={setFormData} />
          <Shipment formData={formData} setFormData={setFormData} />
        </>
      ) : (
        ""
      )}
    </ScrollView>
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  );
}

const styles = StyleSheet.create({
  customLabel: { fontSize: 12, marginBottom: 4, color: "#666" },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
