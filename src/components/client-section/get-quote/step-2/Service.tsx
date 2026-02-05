import { useState, Dispatch, SetStateAction } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Text, Checkbox } from "react-native-paper";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import {
  QuoteForm,
  serviceType,
  transpoMode,
  options,
} from "../../../../types/client";

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
                  status={formData.service?.transport_mode === item ? "checked" : "unchecked"}
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
                paddingBottom: 5,
              }}
            >
              <Checkbox.Android
                status={
                  (formData?.service?.options?.length ?? 0) === options.length
                    ? "checked"
                    : (formData?.service?.options?.length ?? 0) > 0
                      ? "indeterminate"
                      : "unchecked"
                }
                onPress={() => {
                  const allSelected =
                    (formData?.service?.options?.length ?? 0) ===
                    options.length;
                  setFormData((prev) => ({
                    ...prev,
                    service: {
                      ...prev.service,

                      options: allSelected ? [] : [...options],
                    },
                  }));
                }}
              />
              <Text style={{ fontWeight: "bold" }}>ALL IN</Text>
            </View>
            <FlatList
              data={options}
              scrollEnabled={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
              }}
              renderItem={({ item }) => {
                const isChecked = formData.service?.options?.includes(item);

                return (
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginVertical: 2,
                    }}
                  >
                    <Checkbox.Android
                      status={isChecked ? "checked" : "unchecked"}
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
                    <Text style={{ fontSize: 13 }}>{item}</Text>
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
});
