import { Href, usePathname, useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TABS: { title: string; href: Href }[] = [
  { title: "Latest", href: "/home" },
  { title: "Careers", href: "/home/careers" },
];

export default function NewsTabButtons() {
  const pathname = usePathname();
  const router = useRouter();

  const screenWidth = Dimensions.get("screen").width;

  const isActive = (href: Href) => pathname === href;

  return (
    <View style={styles.buttonContainer}>
      {TABS.map((t) => (
        <TouchableOpacity
          key={t.title}
          style={styles.button}
          onPress={() => {
            router.navigate(t.href);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { fontSize: screenWidth * 0.025 },
              isActive(t.href) && styles.activeText,
            ]}
            allowFontScaling={false}
          >
            {t.title}
          </Text>
          {isActive(t.href) && <View style={styles.underline} />}
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
    flex: 0.33,
    alignItems: "center",
    paddingVertical: 5,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 10,
    color: "#555",
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
