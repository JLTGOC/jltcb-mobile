import { Stack } from "expo-router";
import { View } from "react-native";

import BannerHeader from "@/src/components/ui/BannerHeader";

export default function GetQuoteLayout() {
  return (
    <View style={{ flex: 1 }}>
      <BannerHeader title="Get Quote" variant="dark" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </View>
  );
}
