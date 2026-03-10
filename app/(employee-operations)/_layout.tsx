import Index from "@/src/components/header-nav-bar-section";
import { Stack } from "expo-router";

export default function OperationsLayout() {
  return (
    <>
      <Index />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
