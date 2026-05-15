import { Redirect } from "expo-router";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export default function IndexRoute() {
	const { userData, role, isLoading } = useAuth();

	if (isLoading) return null;

	if (!userData) {
		return <Redirect href={routes.LANDING_PAGE} />;
	}

	if (role === "Client") {
		return <Redirect href={routes.CLIENT_DB} />;
	}

	if (role === "Account Specialist" || role === "Lead Account Specialist") {
		return <Redirect href={routes.AS_DB} />;
	}

	if (role === "Marketing") {
		return <Redirect href={routes.MARKETING_DB} />;
	}

	if (role === "Operations") {
		return <Redirect href={routes.OPERATIONS_DB} />;
	}

	if (role === "Finance") {
		return <Redirect href={routes.FINANCE_DB} />;
	}

	return <Redirect href={routes.LANDING_PAGE} />;
}
