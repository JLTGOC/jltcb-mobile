import {
  TextInput as BaseTextInput,
  StyleSheet,
  type TextInputProps,
} from "react-native";

interface Props extends TextInputProps {
  invalid?: boolean;
}

export default function TextInput({ invalid, style, ...props }: Props) {
  return (
    <BaseTextInput
      style={[styles.input, invalid && styles.invalid, style]}
      placeholderTextColor="black"
      autoCapitalize="none"
      cursorColor="black"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    color: "black",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "white",

    boxShadow: "0 4px 4px #BEBEBE",
  },
  invalid: {
    borderColor: "#EF4444",
  },
});
