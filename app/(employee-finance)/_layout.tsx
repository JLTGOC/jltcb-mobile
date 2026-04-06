import Index from "@/src/components/header-nav-bar-section";
import { Stack } from "expo-router";

export default function FinanceLayout() {
  return (
    <>
      <Index />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
