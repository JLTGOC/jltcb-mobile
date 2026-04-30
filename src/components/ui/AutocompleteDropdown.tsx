import { useRef } from "react";
import {
  AutocompleteDropdown as BaseAutocompleteDropdown,
  type IAutocompleteDropdownProps,
  type IAutocompleteDropdownRef,
} from "react-native-autocomplete-dropdown";

export interface AutocompleteDropdownProps extends IAutocompleteDropdownProps {
  disabled?: boolean;
}

export default function AutocompleteDropdown({
  inputContainerStyle,
  textInputProps,
  suggestionsListTextStyle,
  suggestionsListContainerStyle,
  disabled,
  ...props
}: AutocompleteDropdownProps) {
  const dropdownController = useRef<IAutocompleteDropdownRef>(null);

  return (
    <BaseAutocompleteDropdown
      controller={(controller) => {
        dropdownController.current = controller;
      }}
      onOpenSuggestionsList={() => {
        if (disabled) dropdownController.current?.close();
      }}
      textInputProps={{
        style: {
          color: "black",
        },
        ...textInputProps,
      }}
      inputContainerStyle={[
        {
          backgroundColor: "white",
          borderColor: "#E5E5E5",
          borderWidth: 1,
        },
        disabled && { backgroundColor: "#e9ecef" },
        inputContainerStyle,
      ]}
      suggestionsListTextStyle={{ color: "black", ...suggestionsListTextStyle }}
      suggestionsListContainerStyle={{
        backgroundColor: "white",
        ...suggestionsListContainerStyle,
      }}
      {...props}
    />
  );
}
