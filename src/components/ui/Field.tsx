import type { FieldError as TFieldError } from "react-hook-form";
import {
	type StyleProp,
	StyleSheet,
	Text,
	type TextProps,
	type TextStyle,
	View,
	type ViewProps,
} from "react-native";
import { HelperText } from "react-native-paper";

function Field({ style, ...props }: ViewProps) {
	return <View style={[styles.field, style]} {...props} />;
}

function FieldLabel({ style, ...props }: TextProps) {
	return <Text style={[styles.label, style]} {...props} />;
}

function FieldError({
	style,
	error,
}: {
	style?: StyleProp<TextStyle>;
	error?: TFieldError;
}) {
	return (
		<HelperText type="error" style={[styles.error, style]}>
			{error?.message}
		</HelperText>
	);
}

const styles = StyleSheet.create({
	field: {
		gap: 6,
	},
	label: {},
	error: {},
});

export { Field, FieldError, FieldLabel };
