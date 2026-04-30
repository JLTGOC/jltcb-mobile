import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import ContainerSizeCard from "@/src/components/shipment/ContainerSizeCard";
import AutocompleteDropdown from "@/src/components/ui/AutocompleteDropdown";
import Button from "@/src/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/src/components/ui/Field";
import TextInput from "@/src/components/ui/TextInput";

import { container_sizes } from "@/src/constants/client-const";
import { THEMES } from "@/src/constants/themes";
import { clientQuoteEnumsQueryOptions } from "@/src/query-options/client-quotations/clientQuotesQueryOptions";
import {
	type LogisticsStep2FormData,
	logisticsStep2FormSchema,
} from "@/src/schemas/client-quotation-form/logistics-quotation-form-schema";
import { useClientQuotationFormStore } from "@/src/stores/useClientQuotationFormStore";
import { CARGO_TYPES } from "@/src/types/job-order";
import {
	LOGISTICS_SERVICE_LEVELS,
	LOGISTICS_TRANSPORT_MODES,
} from "@/src/types/quotations";

export default function LogisticsForm() {
	const router = useRouter();

	const { logisticsFormData, setLogisticsFormData } =
		useClientQuotationFormStore(
			useShallow((state) => ({
				logisticsFormData: state.logisticsFormData,
				setLogisticsFormData: state.setLogisticsFormData,
			})),
		);

	const { control, watch, handleSubmit } = useForm<LogisticsStep2FormData>({
		resolver: zodResolver(logisticsStep2FormSchema),
		defaultValues: {
			serviceType: logisticsFormData.serviceType,
			serviceOptions: logisticsFormData.serviceOptions,
			serviceTransportMode: logisticsFormData.serviceTransportMode,
			commodityCommodity: logisticsFormData.commodityCommodity,
			commodityCargoType: logisticsFormData.commodityCargoType,
			commodityContainerSize: logisticsFormData.commodityContainerSize,
			shipmentOrigin: logisticsFormData.shipmentOrigin,
			shipmentDestination: logisticsFormData.shipmentDestination,
		},
	});

	const onSubmit = handleSubmit((data) => {
		setLogisticsFormData(data);
		router.navigate("/get-quote/step-3");
	});

	const [serviceType, serviceTransportMode, commodityCargoType] = watch([
		"serviceType",
		"serviceTransportMode",
		"commodityCargoType",
	]);

	const { data, isPending } = useQuery({
		...clientQuoteEnumsQueryOptions({
			service: "LOGISTICS",
			service_type: serviceType,
		}),
		enabled: !!serviceType,
	});

	const serviceOptions = data?.data.service_options.filter(
		(option) => option !== "ALL IN",
	);

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name="serviceType"
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Field>
						<FieldLabel>SERVICE TYPE *</FieldLabel>
						<AutocompleteDropdown
							dataSet={LOGISTICS_SERVICE_LEVELS.map((level) => ({
								id: level,
								title: level,
							}))}
							initialValue={value}
							onSelectItem={(item) => onChange(item?.id)}
							onBlur={onBlur}
						/>
						{fieldState.invalid && <FieldError error={fieldState.error} />}
					</Field>
				)}
			/>

			{serviceType && (
				<>
					<Controller
						control={control}
						name="serviceTransportMode"
						render={({ field: { onChange, value }, fieldState }) => (
							<Field style={{ marginTop: -12, marginBottom: -8 }}>
								<View style={styles.checkboxRow}>
									{LOGISTICS_TRANSPORT_MODES.map((mode) => (
										<View style={styles.checkboxContainer} key={mode}>
											<Checkbox.Item
												labelStyle={styles.checkboxLabel}
												style={styles.checkbox}
												label={mode}
												status={value === mode ? "checked" : "unchecked"}
												onPress={() =>
													value === mode ? onChange(undefined) : onChange(mode)
												}
												color={THEMES.checkboxColor}
												mode="android"
												position="leading"
											/>
										</View>
									))}
								</View>
								{fieldState.invalid && <FieldError error={fieldState.error} />}
							</Field>
						)}
					/>

					{serviceTransportMode &&
						(isPending ? (
							<ActivityIndicator />
						) : (
							<Controller
								control={control}
								name="serviceOptions"
								render={({ field: { onChange, value }, fieldState }) => (
									<Field style={{ marginBottom: -12, marginTop: -8 }}>
										<View>
											<Checkbox.Item
												labelStyle={styles.checkboxLabel}
												style={styles.checkbox}
												label="ALL IN"
												status={
													value.includes("ALL IN") ? "checked" : "unchecked"
												}
												onPress={() =>
													value.includes("ALL IN")
														? onChange([])
														: onChange(["ALL IN"])
												}
												color={THEMES.checkboxColor}
												mode="android"
												position="leading"
											/>
											{serviceOptions?.map((option) => (
												<Checkbox.Item
													key={option}
													labelStyle={styles.checkboxLabel}
													style={styles.checkbox}
													label={option}
													status={
														value.includes(option) ? "checked" : "unchecked"
													}
													onPress={() =>
														value.includes("ALL IN")
															? onChange([option])
															: onChange(
																	value.includes(option)
																		? value.filter((o) => o !== option)
																		: [...value, option],
																)
													}
													color={THEMES.checkboxColor}
													mode="android"
													position="leading"
												/>
											))}
										</View>
										{fieldState.invalid && (
											<FieldError error={fieldState.error} />
										)}
									</Field>
								)}
							/>
						))}

					<Controller
						control={control}
						name="commodityCommodity"
						render={({ field: { onBlur, onChange, value }, fieldState }) => (
							<Field>
								<FieldLabel>COMMODITY *</FieldLabel>
								<TextInput
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
								{fieldState.invalid && <FieldError error={fieldState.error} />}
							</Field>
						)}
					/>

					<Controller
						control={control}
						name="commodityCargoType"
						render={({ field: { onChange, value }, fieldState }) => (
							<Field style={{ marginVertical: -8 }}>
								<View style={styles.checkboxRow}>
									{CARGO_TYPES.map((type) => (
										<View style={styles.checkboxContainer} key={type}>
											<Checkbox.Item
												labelStyle={styles.checkboxLabel}
												style={styles.checkbox}
												label={type}
												status={value === type ? "checked" : "unchecked"}
												onPress={() =>
													value === type ? onChange(undefined) : onChange(type)
												}
												color={THEMES.checkboxColor}
												mode="android"
												position="leading"
											/>
										</View>
									))}
								</View>
								{fieldState.invalid && <FieldError error={fieldState.error} />}
							</Field>
						)}
					/>

					{commodityCargoType === "CONTAINERIZED" && (
						<Controller
							control={control}
							name="commodityContainerSize"
							render={({ field: { onChange, value }, fieldState }) => (
								<Field>
									<View style={{ flexDirection: "row", gap: 12 }}>
										{container_sizes.map((size) => (
											<ContainerSizeCard
												key={size.size}
												size={size}
												onPress={() => onChange(size.size)}
												style={
													value === size.size && { backgroundColor: "#A2A2A2" }
												}
												cardCoverStyle={
													value === size.size && { backgroundColor: "#A2A2A2" }
												}
											/>
										))}
									</View>
									{fieldState.invalid && (
										<FieldError error={fieldState.error} />
									)}
								</Field>
							)}
						/>
					)}

					<Controller
						control={control}
						name="shipmentOrigin"
						render={({ field: { onChange, onBlur, value }, fieldState }) => (
							<Field>
								<FieldLabel>ORIGIN *</FieldLabel>
								<TextInput
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
								{fieldState.invalid && <FieldError error={fieldState.error} />}
							</Field>
						)}
					/>

					<Controller
						control={control}
						name="shipmentDestination"
						render={({ field: { onChange, onBlur, value }, fieldState }) => (
							<Field>
								<FieldLabel>DESTINATION *</FieldLabel>
								<TextInput
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
								{fieldState.invalid && <FieldError error={fieldState.error} />}
							</Field>
						)}
					/>
				</>
			)}

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
	buttonContent: {
		flexDirection: "row-reverse",
	},
	checkboxRow: {
		flexDirection: "row",
	},
	checkboxContainer: {
		flex: 1,
	},
	checkbox: {
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
	checkboxLabel: {
		textAlign: "left",
		fontSize: 13,
	},
});
