import type { StyleProp, TextStyle, ViewStyle } from "react-native";
<<<<<<< HEAD
import { Pressable, StyleSheet, Text, View } from "react-native";
=======
import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

type ToggleOption = {
  label: string;
  value: string;
};

type SwitchToggleProps = {
  options: ToggleOption[];
  value: string;
  onValueChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  activeOptionStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
};

export default function SwitchToggle({
  options,
  value,
  onValueChange,
  containerStyle,
  optionStyle,
  activeOptionStyle,
  labelStyle,
  activeLabelStyle,
}: SwitchToggleProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onValueChange(option.value)}
            style={({ pressed }) => [
              styles.option,
              optionStyle,
              isActive && styles.activeOption,
              isActive && activeOptionStyle,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text
              style={[
                styles.label,
                labelStyle,
                isActive && styles.activeLabel,
                isActive && activeLabelStyle,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: "#E6E6E6",
    borderRadius: 999,
    padding: 2,
  },
  option: {
    minWidth: 64,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  activeOption: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#B5BCC8",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#5C6068",
  },
  activeLabel: {
    color: "#355070",
    fontWeight: "600",
  },
});
