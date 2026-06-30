<<<<<<< HEAD
import { Dispatch, SetStateAction, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Checkbox, Text } from "react-native-paper";

import { QuoteForm } from "@/src/types/client-quotation";
=======
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

import type { QuoteForm } from "@/types/client-quotation";
import { JOB_TYPES } from "@/types/job-order";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};

export default function CheckboxServices({ formData, setFormData }: Props) {
<<<<<<< HEAD
  const Services = ["LOGISTICS", "REGULATORY"];
=======
  const services = JOB_TYPES;
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

  useEffect(() => {
    if (!formData.service?.transport_mode) {
      setFormData((prev) => ({
        ...prev,
<<<<<<< HEAD
        services: "LOGISTICS",
=======
        service: { ...prev.service, transport_mode: "LOGISTICS" },
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
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
<<<<<<< HEAD
          data={Services}
=======
          data={services}
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Checkbox.Android
                key={item}
                color="#00960A"
                status={
<<<<<<< HEAD
                  formData.services === item
=======
                  formData.service?.transport_mode === item
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  setFormData((prev) => ({
                    ...prev,
<<<<<<< HEAD
                    services: item ,
=======
                    service: { ...prev.service, transport_mode: item },
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
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
