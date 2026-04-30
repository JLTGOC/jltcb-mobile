import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import Button from "@/src/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/src/components/ui/Field";
import TextInput from "@/src/components/ui/TextInput";

import {
	type LogisticsStep1FormData,
	logisticsStep1FormSchema,
} from "@/src/schemas/client-quotation-form/logistics-quotation-form-schema";
import { useClientQuotationFormStore } from "@/src/stores/useClientQuotationFormStore";

export default function LogisticsForm() {
	const { resetFields } = useLocalSearchParams<{ resetFields: string }>();
	const shouldReset = resetFields === "true";
	const router = useRouter();

	const {
		sharedFormData,
		setSharedFormData,
		logisticsFormData,
		setLogisticsFormData,
		setRegulatoryFormData,
	} = useClientQuotationFormStore(
		useShallow((state) => ({
			sharedFormData: state.sharedFormData,
			setSharedFormData: state.setSharedFormData,
			logisticsFormData: state.logisticsFormData,
			setLogisticsFormData: state.setLogisticsFormData,
			setRegulatoryFormData: state.setRegulatoryFormData,
		})),
	);

	const { control, handleSubmit, reset, getValues } =
		useForm<LogisticsStep1FormData>({
			resolver: zodResolver(logisticsStep1FormSchema),
			defaultValues: {
				companyName: sharedFormData.companyName,
				companyAddress: sharedFormData.companyAddress,
				companyContactPerson: logisticsFormData.companyContactPerson,
				companyContactNumber: sharedFormData.companyContactNumber,
				companyEmail: sharedFormData.companyEmail,
			},
		});

	useEffect(() => {
		if (shouldReset) {
			reset({
				companyName: "",
				companyAddress: "",
				companyContactPerson: "",
				companyContactNumber: "",
				companyEmail: "",
			});
			useClientQuotationFormStore.getState().reset();
			router.setParams({ resetFields: undefined });
			return;
		}

		const { sharedFormData, logisticsFormData } =
			useClientQuotationFormStore.getState();
		reset({ ...logisticsFormData, ...sharedFormData });
	}, [shouldReset, reset, router]);

	// Save form data to store when navigating away from the form
	useEffect(() => {
		return () => {
			const { companyContactPerson, ...shared } = getValues();
			setSharedFormData(shared);
			setLogisticsFormData({ companyContactPerson });
			setRegulatoryFormData({ companyContactPerson });
		};
	}, [
		setLogisticsFormData,
		setSharedFormData,
		getValues,
		setRegulatoryFormData,
	]);

	const onSubmit = handleSubmit(({ companyContactPerson, ...shared }) => {
		setSharedFormData(shared);
		setLogisticsFormData({ companyContactPerson });
		router.navigate("/get-quote/step-2");
	});

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name="companyName"
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Field>
						<FieldLabel>CONSIGNEE *</FieldLabel>
						<TextInput value={value} onBlur={onBlur} onChangeText={onChange} />
						{fieldState.invalid && <FieldError error={fieldState.error} />}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="companyAddress"
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Field>
						<FieldLabel>COMPANY ADDRESS *</FieldLabel>
						<TextInput
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
							multiline
							style={styles.multiline}
							numberOfLines={2}
						/>
						{fieldState.invalid && <FieldError error={fieldState.error} />}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="companyContactPerson"
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Field>
						<FieldLabel>CONTACT PERSON *</FieldLabel>
						<TextInput value={value} onBlur={onBlur} onChangeText={onChange} />
						{fieldState.invalid && <FieldError error={fieldState.error} />}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="companyContactNumber"
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Field>
						<FieldLabel>CONTACT NUMBER *</FieldLabel>
						<TextInput
							value={value}
							onBlur={onBlur}
							onChangeText={(text) => {
								// Remove non-numeric characters
								let numericText = text.replace(/[^0-9]/g, "");

								// Ensure it starts with "09"
								if (!numericText.startsWith("09")) {
									numericText = `09${numericText.replace(/^0+/, "").replace(/^9+/, "")}`;
								}

								onChange(numericText);
							}}
							keyboardType="phone-pad"
							maxLength={11}
						/>
						{fieldState.invalid && <FieldError error={fieldState.error} />}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="companyEmail"
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Field>
						<FieldLabel>EMAIL *</FieldLabel>
						<TextInput
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
							keyboardType="email-address"
						/>
						{fieldState.invalid && <FieldError error={fieldState.error} />}
					</Field>
				)}
			/>

			<Button
				contentStyle={styles.buttonContent}
				icon="arrow-right"
				onPress={onSubmit}
			>
				Next
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	multiline: {
		minHeight: 60,
	},
	buttonContent: {
		flexDirection: "row-reverse",
	},
});
