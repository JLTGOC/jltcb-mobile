import { Stack } from "expo-router";

export default function ChatboxLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
}
