import { StyleSheet } from "react-native";
import {
	KeyboardAwareScrollView as BaseKeyboardAwareScrollView,
	type KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { THEMES } from "@/constants/themes";

export default function KeyboardAwareScrollView({
	style,
	...props
}: KeyboardAwareScrollViewProps) {
	const { bottom } = useSafeAreaInsets();

	return (
		<BaseKeyboardAwareScrollView
			bounces={false}
			overScrollMode="never"
			bottomOffset={bottom}
			showsVerticalScrollIndicator={false}
			style={[styles.container, style]}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: THEMES.pageBackgroundColor,
	},
});
