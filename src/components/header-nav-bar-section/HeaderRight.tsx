import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
<<<<<<< HEAD
import HeaderMenu, { type HeaderMenuProps } from "./HeaderMenu";

interface HeaderRightProps {
	menuProps: HeaderMenuProps;
}

export default function HeaderRight({ menuProps }: HeaderRightProps) {
	return (
		<View style={styles.iconsContainer}>
			<Pressable>
				<Ionicons name="notifications" size={30} color={menuProps.iconColor} />
			</Pressable>
			<HeaderMenu {...menuProps} />
		</View>
	);
}

const styles = StyleSheet.create({
	iconsContainer: {
		flexDirection: "row",
		gap: 14,
	},
=======

import HeaderMenu, { type HeaderMenuProps } from "./HeaderMenu";

interface HeaderRightProps {
  menuProps: HeaderMenuProps;
}

export default function HeaderRight({ menuProps }: HeaderRightProps) {
  return (
    <View style={styles.iconsContainer}>
      <Pressable>
        <Ionicons name="notifications" size={30} color={menuProps.iconColor} />
      </Pressable>
      <HeaderMenu {...menuProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    gap: 14,
  },
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
});
