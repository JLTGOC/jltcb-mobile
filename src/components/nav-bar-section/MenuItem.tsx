import { Pressable } from "react-native";
import { Text } from "react-native-paper";

export default function MenuItem({
  onPress,
  label,
  textAlign,
}: {
  label: string;
  onPress: () => void;
  textAlign: "left" | "center" | "right" | "justify";
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ width: "100%" },
    {
      opacity: pressed ? 0.7 : 1, 
    }
  ]}>
      <Text style={{ fontSize: 22, color: "#6D6D6D", textAlign: textAlign }}>
        {" "}
        {label}{" "}
      </Text>
    </Pressable>
  );
}
