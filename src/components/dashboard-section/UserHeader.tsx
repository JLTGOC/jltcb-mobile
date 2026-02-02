import { Image, ImageBackground } from "expo-image";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { useAuth } from "@/src/hooks/useAuth";

const BANNERS = {
	dark: require("../../../src/assets/banners/small.png"),
	light: require("../../../src/assets/banners/light-small.svg"),
} as const;

type UserHeaderProps = {
	variant?: "light" | "dark";
};

export default function UserHeader({ variant = "dark" }: UserHeaderProps) {
	const { userData } = useAuth();

	const { width } = Dimensions.get("window");
	return (
		<ImageBackground
			source={BANNERS[variant]}
			contentFit="cover"
			contentPosition="bottom"
			style={{
				padding: 10,
				width,
			}}
		>
			<View style={{ flexDirection: "row", padding: 5, gap: 20 }}>
				<Image
					source={require("../../../src/assets/images/profile.png")}
					style={{ borderRadius: 50, width: 90, height: 90 }}
				/>
				<Text
					style={{
						color: variant === "dark" ? "white" : "#1D274E",
						fontWeight: 700,
						paddingTop: 20,
					}}
					variant="titleLarge"
				>
					{userData ? userData.full_name : "Loading..."}
				</Text>
			</View>
		</ImageBackground>
	);
}
