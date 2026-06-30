import { Dispatch, SetStateAction, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Checkbox, Text } from "react-native-paper";

import { QuoteForm } from "@/src/types/client-quotation";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};

export default function CheckboxServices({ formData, setFormData }: Props) {
  const Services = ["LOGISTICS", "REGULATORY"];

  useEffect(() => {
    if (!formData.service?.transport_mode) {
      setFormData((prev) => ({
        ...prev,
        services: "LOGISTICS",
      }));
    }
  }, [formData.service?.transport_mode, setFormData]);

  return (
    <View style={{ gap: 10, marginBottom: 20 }}>
      <Text style={[styles.fontStyle, { fontWeight: 700 }]}>
        What service do you need?
      </Text>
      <Text style={[styles.fontStyle, { fontWeight: 500 }]} numberOfLines={2}>
        Select the service you need so we can provide the correct quotation?
      </Text>
      <View>
        <FlatList
          data={Services}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Checkbox.Android
                key={item}
                color="#00960A"
                status={
                  formData.services === item
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  setFormData((prev) => ({
                    ...prev,
                    services: item ,
                  }));
                }}
              />
              <Text>{item} SERVICES</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontStyle: {
    textAlign: "left",
    fontSize: 18,
  },
});
