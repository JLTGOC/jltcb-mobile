<<<<<<< HEAD
import Index from "@/src/components/header-nav-bar-section";
import { Stack } from "expo-router";

=======
import { Stack } from "expo-router";

import Index from "@/components/header-nav-bar-section";

>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
export default function FinanceLayout() {
  return (
    <>
      <Index />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
