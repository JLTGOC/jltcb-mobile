import { routes } from "@/src/constants/routes";
import { Href, usePathname, useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Tab = { title: string; route: Href };

const TABS: Tab[] = [
  { title: "Latest", route: routes.HOME },
  { title: "Careers", route: routes.CAREERS },
] as const;

export default function NewsTabButtons() {
  const router = useRouter();
  const pathname = usePathname();

  const isTabActive = (route: Href) =>
    (pathname.includes("articles") || pathname.includes("reels")) &&
    route === routes.HOME
      ? true
      : pathname === route;

  const screenWidth = Dimensions.get("screen").width;

  const isActive = (href: Href) => pathname === href;

  return (
    <View style={styles.buttonContainer}>
      {TABS.map((t) => (
        <TouchableOpacity
          key={t.title}
          style={styles.button}
          onPress={() => router.navigate(t.route)}
        >
          <Text
            style={[
              styles.buttonText,
              { fontSize: screenWidth * 0.025 },
              isTabActive(t.route) && styles.activeText,
            ]}
            allowFontScaling={false}
          >
            {t.title}
          </Text>
          {isTabActive(t.route) && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    borderBottomWidth: 3,
    borderColor: "#9D9D9D",
    marginBottom: 10,
  },
  button: {
    minWidth: 120,
    alignItems: "center",
    paddingVertical: 5,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 10,
    color: "#555",
    textTransform: "uppercase",
  },
  activeText: {
    color: "#000",
    fontWeight: "600",
  },
  underline: {
    height: 3,
    width: "100%",
    backgroundColor: "#EE9034",
    position: "absolute",
    bottom: -3,
  },
});
