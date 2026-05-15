import {
	StyleSheet,
	TextInput,
	type TextInputProps,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";

interface FormTextInputProps extends TextInputProps {
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
}

export default function FormTextInput({
	containerStyle,
	inputStyle,
	style,
	...props
}: FormTextInputProps) {
	return (
		<View style={[styles.container, containerStyle]}>
			<TextInput
				style={[styles.input, inputStyle, style]}
				placeholderTextColor="#666666"
				{...props}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderColor: "#D9D9D9",
		borderRadius: 6,
		borderWidth: 1,
		padding: 12,
	},
	input: {
		color: "black",
		fontSize: 12,
		padding: 0,
	},
});
