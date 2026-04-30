import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, type PressableProps, StyleSheet } from "react-native";

export default function DocumentUploadButton({
	style,
	...props
}: PressableProps) {
	return (
		<Pressable
			style={(state) => [
				styles.upload,
				typeof style === "function" ? style(state) : style,
			]}
			{...props}
		>
			<MaterialCommunityIcons name="file-upload" size={36} color="#C4C4C4" />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	upload: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 20,
		boxShadow: "0 4px 4px #BEBEBE",
		borderRadius: 6,
		backgroundColor: "white",
	},
});
