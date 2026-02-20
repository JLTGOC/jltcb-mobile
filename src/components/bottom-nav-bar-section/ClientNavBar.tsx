import { routes } from "@/src/constants/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useSegments, Href} from "expo-router";
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
  { iconName: "book-plus-outline", route: routes.CLIENT_CREATE_QUOTE },
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
        { height: 40 + insets.bottom, paddingBottom: 10 + insets.bottom },
      ]}
    >
      {NavIcons.map((icon, index) => (
        <TouchableOpacity key={index} onPress={() => router.push(icon.route as Href)}>
          <View style={{width:100, alignItems:"center"}}>
            <MaterialCommunityIcons
              name={icon.iconName}
              size={28}
              color={path === NavIcons[index].route ? "#EE9034" : "#000000"}
            />
          </View>
        </TouchableOpacity>
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
