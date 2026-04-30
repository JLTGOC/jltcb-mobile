import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

import { THEMES } from "@/src/constants/themes";
import { useClientQuotationFormStore } from "@/src/stores/useClientQuotationFormStore";
import type { JobType } from "@/src/types/job-order";

const CHECKBOXES: { label: string; value: JobType }[] = [
  { label: "LOGISTICS SERVICES (shipments)", value: "LOGISTICS" },
  {
    label: "REGULATORY SERVICES (permits and licensing)",
    value: "REGULATORY",
  },
];

export default function ServicesCheckboxes() {
  const service = useClientQuotationFormStore((state) => state.service);
  const setService = useClientQuotationFormStore((state) => state.setService);

  return (
    <View style={styles.container}>
      <View>
        <Text>What service do you need?</Text>
        <Text style={styles.subtitle}>
          Select the service you need so we can provide the correct quotation.
        </Text>
      </View>

      <View>
        {CHECKBOXES.map(({ label, value: checkboxValue }) => (
          <Checkbox.Item
            labelStyle={styles.checkboxLabel}
            style={styles.checkbox}
            key={label}
            label={label}
            position="leading"
            color={THEMES.checkboxColor}
            status={service === checkboxValue ? "checked" : "unchecked"}
            mode="android"
            onPress={() =>
              service !== checkboxValue ? setService(checkboxValue) : null
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  subtitle: {
    fontSize: 13,
    color: "#666666",
  },
  checkbox: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  checkboxLabel: {
    textAlign: "left",
    fontSize: 13,
  },
});
