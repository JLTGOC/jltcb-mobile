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
<<<<<<< HEAD
    <Pressable onPress={onPress} style={({ pressed }) => [{ width: "100%" },
    {
      opacity: pressed ? 0.7 : 1, 
    }
  ]}>
=======
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { width: "100%" },
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      <Text style={{ fontSize: 22, color: "#6D6D6D", textAlign: textAlign }}>
        {" "}
        {label}{" "}
      </Text>
    </Pressable>
  );
}
