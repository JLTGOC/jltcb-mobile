import { ImageBackground } from "expo-image";
import {
	StyleSheet,
	TouchableOpacity,
	type TouchableOpacityProps,
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
				<folder.icon color="black" size={30} />
				<Text style={styles.folderText} variant="labelMedium">
					{folder.title}
				</Text>
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
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
	},
	folderText: {
		textTransform: "uppercase",
	},
});
