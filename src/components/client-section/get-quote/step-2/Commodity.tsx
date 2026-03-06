import { Dispatch, SetStateAction } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Checkbox, Text, TextInput } from "react-native-paper";

import {
  QuoteForm,
} from "../../../../types/client-type";

import {
  cargo_type,
  container_size,
} from "../../../../constants/client-const";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};
export default function Commodity({ formData, setFormData }: Props) {

  return (
    <View>
      {/* Dropdown */}
      <Text>Commodity</Text>
      <TextInput
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        selectionColor="blue"
        mode="flat"
        style={styles.textInputContainer}
        theme={{
          roundness: 10,
        }}
        value={formData.commodity?.commodity ?? ""}
        onChangeText={(text) => {
          setFormData((prev) => ({
            ...prev,
            commodity: { ...prev.commodity, commodity: text },
          }));
        }}
      />

      {/* CheckBox */}
      {formData.commodity?.commodity !== "" && (
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
  textInputContainer: {
    borderRadius: 10,
    height: 40,
    backgroundColor: "#fff",
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
