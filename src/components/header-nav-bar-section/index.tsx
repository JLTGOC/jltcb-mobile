import { userNavigation } from "@/src/constants/user-navigation";
import { useAuth } from "@/src/hooks/useAuth";
import GuestNavBar from "./GuestNavBar";

export default function Index() {
	const { role } = useAuth();

	if (!role) return <GuestNavBar />;

	const navigation = userNavigation.find((nav) => nav.role === role);

	const HeaderComponent = navigation?.headerComponent;
	const menus = navigation?.headerMenus;

	if (!menus || !HeaderComponent) return null;

	return <HeaderComponent menus={menus} />;
}
