import { TARIFF_SCHEDULES } from "@/src/constants/ahtn-checker";
import { useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";

export default function AHTNChecker() {
	const [selectedTariffSchedules, setSelectedTariffSchedules] = useState<
		string[]
	>([]);

	const allValues = TARIFF_SCHEDULES.map((c) => c.value);
	const isAllSelected = selectedTariffSchedules.length === allValues.length;
	const isIndeterminate =
		selectedTariffSchedules.length > 0 &&
		selectedTariffSchedules.length < allValues.length;

	function handleSelectAll() {
		setSelectedTariffSchedules(isAllSelected ? [] : allValues);
	}

	function handleCheckboxValueChange(value: string) {
		setSelectedTariffSchedules((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{ gap: 10 }}>
				<TextInput
					style={styles.input}
					placeholderTextColor="#888"
					textAlign="center"
					placeholder="ENTER AHTN 2022 CODE or KEYWORD(S):"
				/>

				<Text style={styles.title} allowFontScaling={false}>
					SELECT TARIFF SCHEDULE(S):
				</Text>

				<View style={styles.checkboxList}>
					<Pressable onPress={handleSelectAll} style={styles.checkboxWrapper}>
						<Checkbox.Android
							color="#161F3C"
							status={
								isAllSelected
									? "checked"
									: isIndeterminate
										? "indeterminate"
										: "unchecked"
							}
						/>
						<Text style={styles.checkboxLabel}>Select All: </Text>
					</Pressable>
					{TARIFF_SCHEDULES.map((t) => (
						<Pressable
							style={styles.checkboxWrapper}
							onPress={() => handleCheckboxValueChange(t.value)}
							key={t.value}
						>
							<Checkbox.Android
								color="#161F3C"
								status={
									selectedTariffSchedules.includes(t.value)
										? "checked"
										: "unchecked"
								}
							/>
							<Text style={styles.checkboxLabel}>{t.label}</Text>
						</Pressable>
					))}
				</View>
			</View>

			<Button
				mode="contained"
				labelStyle={{
					fontSize: 16,
				}}
				style={styles.button}
			>
				SEARCH
			</Button>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { paddingInline: 40, paddingBlock: 20, gap: 20 },
	title: {
		fontWeight: "bold",
		textAlign: "center",
		marginBlockStart: 10,
	},
	button: {
		backgroundColor: "#161F3C", // button color
		borderRadius: 10, // round corners
		paddingBlock: 4,
	},
	checkboxList: {
		gap: 6,
	},
	checkboxWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingRight: 44,
	},
	checkbox: {
		paddingInlineStart: 0,
		gap: 10,
	},
	checkboxLabel: {
		textTransform: "uppercase",
		fontWeight: "500",
	},
	label: {
		fontSize: 12,
	},
	input: {
		height: 50,
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingHorizontal: 15,
		fontSize: 15,
		color: '#000',

		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,

		// Elevation for Android
		elevation: 5,
	},
});
