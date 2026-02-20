import { View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
export default function index() {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="construct-outline" size={100} color="black" />
      <Text variant="displayMedium" style={{ textAlign: "center" }}>
        This Feature is Under Construction
      </Text>
      <Text variant="displayMedium" style={{ textAlign: "center" }}>
        Thank You For Your Patience{" "}
      </Text>
    </View>
  );
}
