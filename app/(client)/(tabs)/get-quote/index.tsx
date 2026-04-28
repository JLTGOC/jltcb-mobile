import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import ServicesCheckboxes from "@/src/components/client-section/get-quote/ServicesCheckboxes";
import StepIndicator from "@/src/components/client-section/get-quote/StepIndicator";
import BannerHeader from "@/src/components/ui/BannerHeader";

import { THEMES } from "@/src/constants/themes";

export default function Step1Form() {
  return (
    <KeyboardAwareScrollView
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      style={{ backgroundColor: THEMES.pageBackgroundColor }}
    >
      <BannerHeader title="Get Quote" variant="dark" />

      <View style={styles.container}>
        <ServicesCheckboxes />

        <StepIndicator />

        {/* {service === "LOGISTICS" ? (
          <ClientLogisticsQuotationStep1Form />
        ) : (
          <ClientRegulatoryQuotationStep1Form />
        )} */}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "#666666",
  },
});
