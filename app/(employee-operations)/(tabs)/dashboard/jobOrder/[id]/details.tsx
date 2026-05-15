import { View } from "react-native";
import { Text } from "react-native-paper";

import BannerHeader from "@/components/ui/BannerHeader";

export default function Details() {
  return (
    <View style={{ flex: 1 }}>
      <BannerHeader variant="light" title="List of Pending Job Orders" />
      <Text>Khatenjkn</Text>
    </View>
  );
}
