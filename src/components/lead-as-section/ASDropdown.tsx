import { useRef } from "react";
<<<<<<< HEAD
import type { UpdateAsArgs } from "@/src/types/quotations";
import AutocompleteDropdown from "../ui/AutocompleteDropdown";

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
			containerStyle={{ flex: 1 }}
			dataSet={asUsers ?? null}
		/>
	);
=======

import AutocompleteDropdown, {
  type AutocompleteDropdownProps,
} from "@/components/ui/AutocompleteDropdown";
import type { ReassignASRequestBody } from "@/types/quotations";

interface ASDropdownProps extends AutocompleteDropdownProps {
  quotationId: number;
  personInChargeName: string;
  handleChangeAs: (data: ReassignASRequestBody) => Promise<void>;
}

export default function ASDropdown({
  quotationId,
  personInChargeName,
  dataSet,
  containerStyle,
  handleChangeAs,
  ...props
}: ASDropdownProps) {
  const initialPerson = dataSet?.find(
    (user) => user.title === personInChargeName?.split(" ")[0],
  );
  const selectedValueRef = useRef<string | undefined>(initialPerson?.id);

  return (
    <AutocompleteDropdown
      key={`dropdown-${quotationId}-${initialPerson?.id || "none"}`}
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
      containerStyle={[{ flex: 1 }, containerStyle]}
      dataSet={dataSet}
      {...props}
    />
  );
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
}
