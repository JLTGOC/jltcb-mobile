// eslint-disable-next-line import/no-named-as-default
import DateTimePicker, {
  type DateTimePickerProps,
} from "@expo/ui/datetimepicker";
import { format } from "date-fns";
import { useState } from "react";
import {
  Platform,
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";

interface Props extends Omit<DateTimePickerProps, "value" | "onValueChange"> {
  label: string;
  value?: string | Date;
  onValueChange: (date: Date) => void;
  containerStyle?: StyleProp<ViewStyle>;
  formatFunction?: (date: Date) => string;
}

export default function FloatingLabelDatePicker({
  label,
  value,
  onValueChange,
  containerStyle,
  formatFunction = (date) => format(date, "MMMM d, yyyy"),
  ...props
}: Props) {
  const [show, setShow] = useState(false);

  const dateValue = typeof value === "string" ? new Date(value) : value;
  const isValidDate =
    dateValue instanceof Date && !Number.isNaN(dateValue.getTime());

  const displayValue = isValidDate ? formatFunction(dateValue) : "";

  const hasValue = displayValue.length > 0;

  return (
    <View style={[styles.inputWrapper, containerStyle]}>
      <Pressable onPress={() => setShow(true)} style={styles.pressable}>
        <Text style={[styles.label, hasValue && styles.labelActive]}>
          {label}
        </Text>
        <View style={styles.divider} />
        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, !hasValue && styles.placeholderText]}>
            {displayValue}
          </Text>
        </View>
      </Pressable>
      {show && (
        <DateTimePicker
          {...props}
          value={isValidDate ? dateValue : new Date()}
          presentation="dialog"
          onValueChange={(_e, selectedDate) => {
            setShow(false);
            if (selectedDate) {
              onValueChange(selectedDate);
            }
          }}
          onDismiss={() => {
            setShow(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.04,
    // shadowRadius: 3,
    // elevation: 1,
  },
  pressable: {
    width: "100%",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: "#666666",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  labelActive: {
    color: "#909090",
  },
  inputContainer: {
    padding: 12,
    minHeight: 24,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 13,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  placeholderText: {
    color: "#A0A0A0",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
});
