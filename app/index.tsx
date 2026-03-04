import { routes } from "@/src/constants/routes";
import { useAuth } from "@/src/hooks/useAuth";
import { Redirect } from "expo-router";

export default function RootIndex() {
  const { role } = useAuth();

  switch (role) {
    case "Client": {
      return <Redirect href={routes.CLIENT_DB} />;
    }
    case "Account Specialist": {
      return <Redirect href={routes.AS_DB} />;
    }
  }

  return <Redirect href={routes.LANDING_PAGE} />;
}
