import { useLocalSearchParams } from "expo-router";
import {
	ScrollView,
	type StyleProp,
	StyleSheet,
	type TextStyle,
	View,
} from "react-native";
import { Button } from "react-native-paper";
import AutocompleteDropdown from "@/src/components/ui/AutocompleteDropdown";
import BannerHeader from "@/src/components/ui/BannerHeader";
import FieldLegend from "@/src/components/ui/FieldLegend";
import FloatingLabelInput from "@/src/components/ui/FloatingLabelTextInput";

const TEXT_COLOR = "#666666";
const TEXT_INPUT_STYLES: StyleProp<TextStyle> = {
	fontSize: 12,
	color: TEXT_COLOR,
};

export default function Shipment() {
	const { quotationId } = useLocalSearchParams<{ quotationId: string }>();

	return (
		<ScrollView>
			<BannerHeader title="Shipment" variant="light" />

			<View style={styles.content}>
				<FloatingLabelInput label="SUBJECT" />
				<FloatingLabelInput
					label="EMAIL BODY"
					multiline
					numberOfLines={4}
					style={{ minHeight: 65 }}
				/>

				<FieldLegend>CLIENT INFORMATION</FieldLegend>
				<FloatingLabelInput label="CONSIGNEE" editable={false} />
				<AutocompleteDropdown
					textInputProps={{
						placeholder: "CLIENT TYPE",
						style: TEXT_INPUT_STYLES,
					}}
					suggestionsListTextStyle={{ color: TEXT_COLOR }}
					dataSet={null}
				/>
				<AutocompleteDropdown
					textInputProps={{
						placeholder: "ACCREDITED",
						style: TEXT_INPUT_STYLES,
					}}
					suggestionsListTextStyle={{ color: TEXT_COLOR }}
					dataSet={null}
				/>
				<FloatingLabelInput label="SHIPPER" editable={false} />
				<FloatingLabelInput
					label="CLIENT TONE / ATTITUDE"
					multiline
					numberOfLines={2}
				/>
				<FloatingLabelInput
					label="REMARKS ON HANDLING CLIENT"
					multiline
					numberOfLines={2}
				/>

				<FieldLegend>SERVICE INFORMATION</FieldLegend>
				<AutocompleteDropdown
					textInputProps={{
						placeholder: "SERVICE LEVEL",
						style: TEXT_INPUT_STYLES,
					}}
					suggestionsListTextStyle={{ color: TEXT_COLOR }}
					dataSet={null}
				/>
				<FloatingLabelInput label="BL NO" />

				<FieldLegend>IF COORDINATED:</FieldLegend>
				<FloatingLabelInput label="ESTIMATED TIME OF ARRIVAL" />
				<FloatingLabelInput label="ESTIMATED TIME OF DEPARTURE" />

				<Button
					theme={{ colors: { primary: "#1C213B" } }}
					mode="contained"
					style={styles.button}
				>
					NEXT
				</Button>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: 24,
		paddingBottom: 20,
		gap: 12,
	},
	button: {
		borderRadius: 6,
		paddingVertical: 4,
	},
});
