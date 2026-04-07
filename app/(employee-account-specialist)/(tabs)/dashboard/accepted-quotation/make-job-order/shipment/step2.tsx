import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { Button, HelperText } from "react-native-paper";
import BannerHeader from "@/src/components/ui/BannerHeader";
import FieldLegend from "@/src/components/ui/FieldLegend";
import FloatingLabelInput from "@/src/components/ui/FloatingLabelTextInput";
import { useJobOrderEnums } from "@/src/hooks/useJobOrderEnums";
import {
	type Step2Fields,
	step2Schema,
} from "@/src/schemas/makeJobOrderFormSchema";

export default function Step2Form() {
	const router = useRouter();
	const { quotationId, quotationReference } = useLocalSearchParams<{
		quotationId: string;
		quotationReference: string;
	}>();
	const { data, isPending } = useJobOrderEnums(quotationReference);

	const containerSize = data?.autofill_details?.container_size;
	const volumeDimension = `${data?.autofill_details?.cargo_type} ${containerSize ? ` - ${containerSize}` : ""}`;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Step2Fields>({
		resolver: zodResolver(step2Schema),
		defaultValues: {
			hs_code: "",
			rod: "",
			permits: "",
			if_coordinated: "",
			shipment_special_remarks: "",
		},
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		router.push(
			"/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/make-job-order/shipment/step3",
		);
	});

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={120}
		>
			<ScrollView>
				<BannerHeader title="Shipment" variant="light" />

				<View style={styles.content}>
					<FieldLegend>SHIPMENT INFORMATION</FieldLegend>

					<FloatingLabelInput
						label="COMMODITY"
						editable={false}
						value={data?.autofill_details?.commodity ?? ""}
						style={styles.bold}
					/>
					<FloatingLabelInput
						label="VOLUME / DIMENSION"
						editable={false}
						value={volumeDimension}
						style={styles.bold}
					/>

					<View>
						<Controller
							control={control}
							name="hs_code"
							render={({ field: { onChange, onBlur, value } }) => (
								<FloatingLabelInput
									label="HS CODE/CLASSIFICATION"
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
								/>
							)}
						/>
						{errors.hs_code && (
							<HelperText type="error">{errors.hs_code.message}</HelperText>
						)}
					</View>

					<View>
						<Controller
							control={control}
							name="rod"
							render={({ field: { onChange, onBlur, value } }) => (
								<FloatingLabelInput
									label="ROD"
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
								/>
							)}
						/>
						{errors.rod && (
							<HelperText type="error">{errors.rod.message}</HelperText>
						)}
					</View>

					<View>
						<Controller
							control={control}
							name="if_coordinated"
							render={({ field: { onChange, onBlur, value } }) => (
								<FloatingLabelInput
									label="IF COORDINATED: "
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
									multiline
									numberOfLines={2}
									style={{ minHeight: 55 }}
								/>
							)}
						/>
						{errors.if_coordinated && (
							<HelperText type="error">
								{errors.if_coordinated.message}
							</HelperText>
						)}
					</View>

					<View>
						<Controller
							control={control}
							name="shipment_special_remarks"
							render={({ field: { onChange, onBlur, value } }) => (
								<FloatingLabelInput
									label="SPECIAL REMARKS"
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
									multiline
									numberOfLines={2}
									style={{ minHeight: 55 }}
								/>
							)}
						/>
						{errors.shipment_special_remarks && (
							<HelperText type="error">
								{errors.shipment_special_remarks.message}
							</HelperText>
						)}
					</View>

					<Button
						theme={{ colors: { primary: "#1C213B" } }}
						mode="contained"
						style={styles.button}
						onPress={onSubmit}
					>
						NEXT
					</Button>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: 24,
		paddingBottom: 20,
		gap: 12,
	},
	bold: {
		fontWeight: "bold",
	},
	button: {
		borderRadius: 6,
		paddingVertical: 4,
	},
});
