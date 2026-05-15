import type { StateCreator } from "zustand";

import type {
	ExtendedRegulatoryQuotationFormData,
	RegulatoryStep1FormData,
} from "@/schemas/client-quotation-form/regulatory-quotation-form-schema";
import type { ClientQuotationFormStore } from "@/types/store";

const initialState: RegulatoryQuotationFormState = {
	autofill: false,
	savedStep1FormData: {},
	regulatoryFormData: {
		fullName: "",
		companyPosition: "",
		companyBusinessType: "",
		companyContactPerson: "",
		companyContactPersonContactNumber: "",
		type_of_regulatory_assistance: [],
		service_level: undefined,
		message: "",
		documents: [],
		remarks: "",
	},
};

interface RegulatoryQuotationFormState {
	autofill: boolean;
	savedStep1FormData: Partial<RegulatoryStep1FormData>;
	regulatoryFormData: Partial<ExtendedRegulatoryQuotationFormData>;
}

interface RegulatoryQuotationFormActions {
	toggleAutofill: () => void;
	setSavedStep1FormData: (data: Partial<RegulatoryStep1FormData>) => void;
	setRegulatoryFormData: (
		data: Partial<ExtendedRegulatoryQuotationFormData>,
	) => void;
}

export type RegulatoryQuotationFormSlice = RegulatoryQuotationFormState &
	RegulatoryQuotationFormActions;

export const createRegulatoryQuotationFormSlice: StateCreator<
	ClientQuotationFormStore,
	[],
	[],
	RegulatoryQuotationFormSlice
> = (set) => ({
	...initialState,
	toggleAutofill: () =>
		set((state) => ({
			autofill: !state.autofill,
		})),
	setSavedStep1FormData: (data) =>
		set(() => ({
			savedStep1FormData: data,
		})),
	setRegulatoryFormData: (data) =>
		set((state) => ({
			regulatoryFormData: {
				...state.regulatoryFormData,
				...data,
			},
		})),
});
