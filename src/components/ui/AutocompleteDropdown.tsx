<<<<<<< HEAD
import type { IAutocompleteDropdownProps } from "react-native-autocomplete-dropdown";
import { AutocompleteDropdown as BaseAutocompleteDropdown } from "react-native-autocomplete-dropdown";

export default function AutocompleteDropdown({
  ...props
}: IAutocompleteDropdownProps) {
  return (
    <BaseAutocompleteDropdown
=======
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
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      textInputProps={{
        style: {
          color: "black",
        },
<<<<<<< HEAD
      }}
      inputContainerStyle={{
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
      }}
      suggestionsListTextStyle={{ color: "black" }}
      suggestionsListContainerStyle={{
        backgroundColor: "white",
=======
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
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      }}
      {...props}
    />
  );
}
