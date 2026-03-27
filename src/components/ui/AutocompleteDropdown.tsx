import type { IAutocompleteDropdownProps } from "react-native-autocomplete-dropdown";
import { AutocompleteDropdown as BaseAutocompleteDropdown } from "react-native-autocomplete-dropdown";

export default function AutocompleteDropdown({
	...props
}: IAutocompleteDropdownProps) {
	return (
		<BaseAutocompleteDropdown
			textInputProps={{
				style: {
					color: "black",
				},
			}}
			inputContainerStyle={{
				backgroundColor: "white",
			}}
			suggestionsListTextStyle={{ color: "black" }}
			suggestionsListContainerStyle={{
				backgroundColor: "white",
			}}
			{...props}
		/>
	);
}
