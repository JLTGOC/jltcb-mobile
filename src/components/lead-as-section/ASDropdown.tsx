import type { UpdateAsArgs } from "@/src/types/quotations";
import { useRef } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

interface ASDropdownProps {
  quotationId: number;
  personInChargeName: string;
  asUsers: { id: string; title: string }[] | undefined;
  loading: boolean;
  handleChangeAs: (data: UpdateAsArgs) => Promise<void>;
}

export default function ASDropdown({
  quotationId,
  personInChargeName,
  asUsers,
  loading,
  handleChangeAs,
}: ASDropdownProps) {
  const initialPerson = asUsers?.find(
    (user) => user.title === personInChargeName.split(" ")[0],
  );

  const selectedValueRef = useRef<string | undefined>(initialPerson?.id);

  return (
    <AutocompleteDropdown
      key={`dropdown-${quotationId}-${initialPerson?.id || "none"}`}
      loading={loading}
      onSelectItem={(item) => {
        if (item) {
          const lastSelectedId = selectedValueRef.current ?? initialPerson?.id;

          if (lastSelectedId === item.id) {
            return;
          }

          selectedValueRef.current = String(item.id);

          handleChangeAs({
            quotationId,
            asId: Number(item.id),
          });
        }
      }}
      initialValue={initialPerson}
      showClear={false}
      containerStyle={{ flex: 1, minWidth: 0 }}
      inputContainerStyle={{
        backgroundColor: "white",
      }}
      textInputProps={{
        style: {
          color: "black",
          paddingLeft: 4,
        },
      }}
      suggestionsListContainerStyle={{
        backgroundColor: "white",
      }}
      suggestionsListTextStyle={{ color: "black" }}
      dataSet={asUsers ?? null}
    />
  );
}
