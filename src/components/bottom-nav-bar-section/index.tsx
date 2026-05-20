import { userNavigation } from "@/constants/user-navigation";
import { useAuth } from "@/hooks/useAuth";
import GuestNavBar from "./GuestNavBar";

export default function Index() {
  const { role } = useAuth();

  const navigation = userNavigation.find((nav) => nav.role === role);

  const TabsComponent = navigation?.tabsComponent || GuestNavBar;

  return <TabsComponent />;
}
