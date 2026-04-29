import { THEMES } from "@/src/constants/themes";
import { StyleSheet } from "react-native";
import { Button as BaseButton, ButtonProps } from "react-native-paper";

interface Props extends ButtonProps {}

export default function Button({ style, labelStyle, ...props }: Props) {
  return (
    <BaseButton
      mode="contained"
      style={[styles.button, style]}
      labelStyle={[styles.buttonLabel, labelStyle]}
      theme={{ colors: { onSurfaceDisabled: "#c2c2c2" } }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEMES.darkAccentColor,
    borderRadius: 6,
    boxShadow: "0 4px 4px #BEBEBE",
  },
  buttonLabel: {
    paddingVertical: 4,
    fontSize: 16,
    textTransform: "uppercase",
  },
});
