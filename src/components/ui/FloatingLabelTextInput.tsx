import {
  Platform,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";

interface Props extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function FloatingLabelInput({
  label,
  value,
  multiline = false,
  style,
  containerStyle,
  labelStyle,
  ...props
}: Props) {
  return (
    <View style={[styles.inputWrapper, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.divider} />
      <TextInput
        value={value}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        style={[styles.input, multiline && styles.inputMultiline, style]}
        selectionColor="#A0A0A0"
        {...props}
      />
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
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: "#666666",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  input: {
    fontSize: 13,
    color: "#666666",
    padding: 12,
    margin: 0,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    minHeight: 24,
  },
  inputMultiline: {
    minHeight: 100,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
});
