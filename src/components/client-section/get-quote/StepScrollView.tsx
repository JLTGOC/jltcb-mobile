import { usePathname } from "expo-router";
import { StyleSheet } from "react-native";
import type { KeyboardAwareScrollViewProps } from "react-native-keyboard-controller";

import KeyboardAwareScrollView from "@/components/ui/KeyboardAwareScrollView";
import ServicesCheckboxes from "./ServicesCheckboxes";
import StepIndicator from "./StepIndicator";

const POSITION_MAP: Record<string, number> = {
  "/get-quote": 0,
  "/get-quote/step-2": 1,
  "/get-quote/step-3": 2,
  "/get-quote/success": 3,
};

export default function StepScrollView({
  children,
  ...props
}: KeyboardAwareScrollViewProps) {
  const pathname = usePathname();
  const currentPosition = POSITION_MAP[pathname] ?? 0;

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
      {...props}
    >
      {currentPosition === 0 && <ServicesCheckboxes />}
      <StepIndicator
        containerStyle={styles.stepIndicator}
        currentPosition={currentPosition}
      />
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  stepIndicator: {
    marginBottom: 6,
  },
});
