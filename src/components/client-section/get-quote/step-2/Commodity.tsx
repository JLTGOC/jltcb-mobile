import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Card, Checkbox } from "react-native-paper";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import {
  QuoteForm,
  commodities,
  cargo_type,
  container_size,
} from "../../../../types/client";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};
export default function Commodity({ formData, setFormData }: Props) {
  const [selectCargoType, setSelectCargoType] = useState<string | null>("");

  console.log("step_2", formData)

  return (
    <View>
      {/* Dropdown */}
      <Text>Commodity</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        direction="up"
        initialValue={formData.commodity?.commodity}
        onSelectItem={(item) => {
          setFormData((prev) => ({
            ...prev,
            commodity: { ...prev.commodity, commodity: item?.title ?? "" },
          }));
        }}
        dataSet={commodities.map((type) => ({ id: type, title: type }))}
        inputContainerStyle={styles.inputContainer}
        textInputProps={{
          style: styles.textInput,
          placeholderTextColor: "#888",
        }}
        suggestionsListContainerStyle={styles.suggestedContainer}
        suggestionsListTextStyle={styles.suggestedText}
      />

      {/* CheckBox */}
      {formData.commodity?.commodity === commodities[0] && (
        <>
          <FlatList
            data={cargo_type}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: 20,
                }}
              >
                <Checkbox.Android
                  status={
                    formData.commodity?.cargo_type === item
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setSelectCargoType(item);
                    setFormData((prev) => ({
                      ...prev,
                      commodity: { ...prev.commodity, cargo_type: item },
                    }));
                  }}
                />
                <Text>{item}</Text>
              </View>
            )}
          />
        </>
      )}

      {/* Container Size */}
      {formData.commodity?.commodity !== "" &&
        formData.commodity?.cargo_type === "CONTAINERIZED" && (
          <FlatList
            data={container_size}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-evenly",
            }}
            renderItem={({ item }) => {
              const isSelected =
                formData.commodity?.container_size === item.size;

              return (
                <Card
                  style={[
                    styles.cardContainer,
                    {
                      borderColor: isSelected ? "#2196F3" : "transparent",
                      elevation: isSelected ? 8 : 2,
                    },
                  ]}
                  onPress={() =>
                    setFormData((prev) => ({
                      ...prev,
                      commodity: {
                        ...prev.commodity,
                        container_size: item.size,
                      },
                    }))
                  }
                >
                  <Card.Cover
                    source={item.image}
                    style={[
                      styles.cardCover,
                      {
                        tintColor: isSelected ? "#161F3C" : undefined,
                      },
                    ]}
                  />
                  <Card.Content style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: isSelected ? "#161F3C" : "black",
                        fontWeight: isSelected ? "bold" : "normal",
                      }}
                    >
                      {item.size}
                    </Text>
                  </Card.Content>
                </Card>
              );
            }}
          />
        )}
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
  suggestedContainer: {
    backgroundColor: "#ffffff",
    elevation: 5,
    shadowColor: "#ffffff",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  suggestedText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "300",
  },
  cardContainer: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderWidth: 2,
    overflow: "visible",
  },
  cardCover: {
    height: 70,
    width: 70,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
});
