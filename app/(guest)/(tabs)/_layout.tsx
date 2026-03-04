import GuestHeader from "@/src/components/header-nav-bar-section/GuestHeader";
import GuestTabs from "@/src/components/tabs-ui/GuestTabs";
import { routes } from "@/src/constants/routes";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { StyleSheet } from "react-native";

export default function GuestLayout() {
  return (
    <Tabs>
      <GuestHeader />
      <TabSlot />
      <GuestTabs />
      <TabList style={styles.tabList}>
        <TabTrigger name="home" href={routes.GUEST_HOME} />
        <TabTrigger name="about-us" href={routes.ABOUT_US} />
        <TabTrigger name="contact-us" href={routes.CONTACT_US} />
        <TabTrigger name="services" href={routes.SERVICES} />
        <TabTrigger name="ports-catered" href={routes.PORTS_CATERED} />
        <TabTrigger name="get-quote" href={routes.GET_QUOTE} />
        <TabTrigger name="get-appointment" href={routes.GET_APPOINTMENT} />
        <TabTrigger name="ahtn-checker" href={routes.AHTN_CHECKER} />
        <TabTrigger name="login" href={routes.LOG_IN} />
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    display: "none",
  },
});
