import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type Props = {
  iconName: string;
  iconSize: number;
  iconColor: string;
};

export default function ButtonIcon({ iconName, iconSize, iconColor }: Props) {
  return (
    <View style={{ width: 100, alignItems: "center" }}>
      <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
    </View>
  );
}
