import Index from "@/src/components/header-nav-bar-section";
import { Stack } from "expo-router";

export default function ClientLayout() {
  return (
    <>
      <Index />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
