import { Image, ImageBackground } from "expo-image";
import {
	StyleSheet,
	TouchableOpacity,
	type TouchableOpacityProps,
	View,
} from "react-native";
import { Text } from "react-native-paper";
import type { DashbordFolderItem } from "@/src/types/dashboard";

const FOLDER_BACKGROUNDS = {
	dark: require("../../assets/folders/dark.png"),
	light: require("../../assets/folders/light.png"),
} as const;

type FolderButtonProps = {
	folder: DashbordFolderItem;
	variant: "light" | "dark";
};

export default function FolderButton({
	folder,
	variant,
	...props
}: FolderButtonProps & TouchableOpacityProps) {
	return (
		<TouchableOpacity {...props} style={styles.folderBtn}>
			<ImageBackground
				source={FOLDER_BACKGROUNDS[variant]}
				style={styles.imageBackground}
				contentFit="contain"
			>
				<View style={styles.folderContent}>
					<Image
						source={{ uri: folder.icon }}
						style={[
							folder.iconStyles ?? { aspectRatio: 2823 / 2013, height: 30 },
							{
								alignSelf: "center",
							},
						]}
					/>
					<View style={styles.folderTextWrapper}>
						<Text style={styles.folderText} variant="labelMedium">
							{folder.title}
						</Text>
						<Text style={styles.folderText} variant="labelMedium">
							{folder.count}
						</Text>
					</View>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	folderBtn: {
		width: "33.3%",
		alignItems: "center",
	},
	imageBackground: {
		width: "100%",
		aspectRatio: 111 / 82,
		paddingTop: "17%",
		paddingBottom: "11%",
		paddingHorizontal: "12%",
		gap: 4,
	},
	folderText: {
		textTransform: "uppercase",
	},
	folderContent: {
		flex: 1,
		justifyContent: "space-between",
	},
	folderTextWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
