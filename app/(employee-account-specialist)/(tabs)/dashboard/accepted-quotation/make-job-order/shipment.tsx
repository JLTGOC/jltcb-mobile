import { useLocalSearchParams } from "expo-router";
import {
	ScrollView,
	type StyleProp,
	StyleSheet,
	type TextStyle,
	View,
} from "react-native";
import type { IAutocompleteDropdownProps } from "react-native-autocomplete-dropdown";
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
				<FloatingLabelInput label="EMAIL BODY" multiline numberOfLines={4} />
				<FieldLegend>SERVICE INFORMATION</FieldLegend>
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
					numberOfLines={1}
				/>
				<FloatingLabelInput label="SHIPPER" editable={false} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: 24,
		gap: 12,
	},
});
