import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, type TextStyle, View } from "react-native";
import { Text, type TextProps } from "react-native-paper";

import { BANNERS } from "@/constants/banners";
import { THEMES } from "@/constants/themes";

interface BannerHeaderProps {
	back?: boolean;
	onBack?: () => void;
	title: string;
	variant: "light" | "dark";
	titleProps?: Omit<TextProps<never>, "children">;
}

export default function BannerHeader({
	back = true,
	onBack,
	title,
	variant,
	titleProps,
	children,
}: BannerHeaderProps & PropsWithChildren) {
	const router = useRouter();

	const textColorStyle: TextStyle = {
		color:
			variant === "dark" ? THEMES.lightAccentColor : THEMES.darkAccentColor,
	};

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			router.back();
		}
	};

	return (
		<ImageBackground
			source={BANNERS[variant]}
			contentPosition="bottom"
			style={[styles.container]}
		>
			<View style={styles.content}>
				{back && (
					<Pressable
						style={({ pressed }) => [
							{
								opacity: pressed ? 0.7 : 1,
							},
						]}
						onPress={handleBack}
					>
						<Ionicons name="arrow-back" size={24} style={textColorStyle} />
					</Pressable>
				)}
				{children}
				<Text
					variant="titleLarge"
					style={[styles.title, textColorStyle]}
					{...titleProps}
				>
					{title}
				</Text>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		minHeight: 120,
		backgroundColor: THEMES.pageBackgroundColor,
	},
	content: {
		flexDirection: "row",
		padding: 5,
		gap: 10,
	},
	title: {
		flex: 1,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
});
