import { Dispatch, SetStateAction, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Checkbox, Text } from "react-native-paper";

import {
  QuoteForm,
} from "../../../../types/client-type";


import {
  options,
  serviceType,
  transpoMode,
} from "../../../../constants/client-const";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};

export default function Service({ formData, setFormData }: Props) {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  return (
    <View>
      {/* DropDown */}

      <Text allowFontScaling={false} style={{ fontSize: 11 }}>
        Service Type
        <Text style={{ color: "red" }}>*</Text>
      </Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        direction="down"
        initialValue={{ id: formData.service?.type || "" }}
        onSelectItem={(item) => {
          setFormData((prev) => ({
            ...prev,
            service: {
              ...prev.service,
              type: item?.title ?? "",
            },
          }));
        }}
        dataSet={serviceType.map((type) => ({ id: type, title: type }))}
        inputContainerStyle={styles.inputContainer}
        textInputProps={{
          style: styles.textInput,
          placeholderTextColor: "#888",
        }}
        suggestionsListContainerStyle={styles.suggestionContainer}
        suggestionsListTextStyle={styles.suggestionText}
      />

      {/* Checkbox */}

      <View style={{ paddingHorizontal: 20 }}>
        {formData.service?.type === "IMPORT" && (
          <FlatList
            data={transpoMode}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Checkbox.Android
                  key={item}
                  status={
                    formData.service?.transport_mode === item
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setSelectedMode(item);

                    setFormData((prev) => ({
                      ...prev,
                      service: { ...prev.service, transport_mode: item },
                    }));
                  }}
                />
                <Text>{item}</Text>
              </View>
            )}
          />
        )}

        {formData.service?.type === "EXPORT" && <Text>UNDER CONSTRUCTION</Text>}
        {formData.service?.type === "BUSINESS SOLUTION" && (
          <Text>UNDER CONSTRUCTION</Text>
        )}

        {selectedMode === "SEA" && (
          <>
            {/* SELECT ALL SECTION */}
            <View style={styles.optionRow}>
              <Checkbox.Android
                status={
                  formData.service?.options?.includes("ALL IN")
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  setFormData((prev) => {
                    const isCurrentlyAllIn =
                      prev.service?.options?.includes("ALL IN");
                    return {
                      ...prev,
                      service: {
                        ...prev.service,
                        // If it was ALL IN, clear everything.
                        // If it wasn't, set array to ONLY ["ALL IN"] to disable others.
                        options: isCurrentlyAllIn ? [] : ["ALL IN"],
                      },
                    };
                  });
                }}
              />
              <Text style={{ fontWeight: "bold" }}>ALL IN</Text>
            </View>

            <FlatList
              data={options}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const isAllIn = formData.service?.options?.includes("ALL IN");
                const isChecked = formData.service?.options?.includes(item);

                return (
                  <View style={[styles.optionRow, isAllIn && { opacity: 0.5 }]}>
                    <Checkbox.Android
                      // If ALL IN is selected, these appear unchecked and cannot be pressed
                      status={isChecked && !isAllIn ? "checked" : "unchecked"}
                      disabled={isAllIn}
                      onPress={() => {
                        setFormData((prev) => {
                          const currentOptions = prev.service?.options || [];
                          const updatedOptions = currentOptions.includes(item)
                            ? currentOptions.filter((opt) => opt !== item)
                            : [...currentOptions, item];

                          return {
                            ...prev,
                            service: {
                              ...prev.service,
                              options: updatedOptions,
                            },
                          };
                        });
                      }}
                    />
                    <Text
                      style={{ fontSize: 13, color: isAllIn ? "#aaa" : "#000" }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
          </>
        )}
        {selectedMode === "AIR" && <Text>UNDER CONSTRUCTION</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ffffff",
  },
  textInput: {
    color: "#000000",
    paddingLeft: 18,
    fontWeight: "400",
  },
  suggestionContainer: {
    backgroundColor: "#ffffff",
    elevation: 5,
    shadowColor: "#ffffff",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  suggestionText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "300",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    paddingHorizontal: 10,
  },
});
