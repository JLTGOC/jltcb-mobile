import { routes } from "@/src/constants/routes";
import { useAuth } from "@/src/hooks/useAuth";
import { Redirect } from "expo-router";

export default function IndexRoute() {
  const { userData, role, isLoading } = useAuth();

  if (isLoading) return null;

  if (!userData) {
    return <Redirect href={routes.LANDING_PAGE} />;
  }

  if (role === "Client") {
    return <Redirect href={routes.CLIENT_DB} />;
  }

  if (role === "Account Specialist") {
    return <Redirect href={routes.AS_DB} />;
  }

  if (role === "Marketing") {
    return <Redirect href={routes.MARKETING_DB} />;
  }

  return <Redirect href={routes.UNAUTHORIZED} />;
}
