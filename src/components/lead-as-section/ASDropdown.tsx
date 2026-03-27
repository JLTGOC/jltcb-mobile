import { useRef } from "react";
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
}
