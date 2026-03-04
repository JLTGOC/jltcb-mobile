import { routes } from "@/src/constants/routes";
import { Redirect } from "expo-router";

export default function RootIndex() {
  return <Redirect href={routes.LANDING_PAGE} />;
}
