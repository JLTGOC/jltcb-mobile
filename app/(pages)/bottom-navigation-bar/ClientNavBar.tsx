import { routes } from "@/src/constants/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { ComponentProps } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const NavIcons: {
  iconName: IconName;
  route: (typeof routes)[keyof typeof routes];
}[] = [
  { iconName: "view-dashboard", route: routes.CLIENT_DB },
  { iconName: "book-open-outline", route: routes.HOME },
  { iconName: "book-plus-outline", route: routes.QUEOTE_REQUEST },
  { iconName: "message", route: routes.CHATBOX },
];

export default function ClientNavBar() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const path = `/${segments.join("/")}`;
  const router = useRouter();

  return (
    <View
      style={[
        styles.navContainer,
        { height: 40 + insets.bottom, paddingBottom: insets.bottom },
      ]}
    >
      {NavIcons.map((icon, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => router.push(icon.route)}>
            <MaterialCommunityIcons
              name={icon.iconName}
              size={28}
              color={path === NavIcons[index].route ? "#EE9034" : "#000000"}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffffff",
  },
});
