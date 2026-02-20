import { TouchableOpacity } from "react-native";
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
    <TouchableOpacity onPress={onPress} style={{width: "100%"}}>
      <Text style={{ fontSize: 22, color: "#6D6D6D", textAlign:textAlign}}> {label} </Text>
    </TouchableOpacity>
  );
}
