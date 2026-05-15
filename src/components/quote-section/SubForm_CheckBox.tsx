import * as Linking from "expo-linking";
import { type Dispatch, type SetStateAction, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Checkbox, Text } from "react-native-paper";

import type { ContactFormData } from "@/types/get-quote";

const openLink = (url: string) => {
	Linking.openURL(url);
};

type Props = {
	setFormData: Dispatch<SetStateAction<ContactFormData>>;
};

export default function SubForm_CheckBox({ setFormData }: Props) {
	const [checked, setChecked] = useState(false);
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Checkbox.Android
					status={checked ? "checked" : "unchecked"}
					onPress={() => {
						setChecked(!checked);
					}}
					uncheckedColor="#000000ff"
					color="#161F3C"
				/>
				<Text allowFontScaling={false}>
					Yes, I agree with the{" "}
					<Text
						allowFontScaling={false}
						onPress={() => openLink("https://jltcb.com/privacy-policy/")}
						style={styles.styledText}
					>
						privacy policy
					</Text>{" "}
					and{" "}
					<Text
						allowFontScaling={false}
						onPress={() => openLink("https://jltcb.com/terms-and-conditions/")}
						style={styles.styledText}
					>
						terms and conditions.
					</Text>
				</Text>
			</View>
			<View style={{ alignItems: "center" }}>
				<Button
					mode="contained"
					style={{
						borderRadius: 10,
						marginBottom: 30,
						width: 150,
					}}
					disabled={!checked}
					buttonColor={!checked ? "#161F3C" : "#323f68ff"}
					onPress={() =>
						setFormData({
							full_name: "",
							email: "",
							contact_number: "",
							message: "",
							imageUri: "",
						})
					}
				>
					SUBMIT
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
	},
	styledText: {
		textDecorationLine: "underline",
		color: "#EE9034",
	},
});
