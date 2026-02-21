import { Link } from "expo-router";
import { View } from "react-native";

export default function ClientIndex() {
  return (
    <View>
      <Link href="/(client)/dashboard">Dashboard</Link>
    </View>
  );
}
