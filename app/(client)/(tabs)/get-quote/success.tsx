import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import StepScrollView from "@/src/components/client-section/get-quote/StepScrollView";
import Success from "@/src/components/client-section/get-quote/Success";

import { useClientQuotationFormStore } from "@/src/stores/useClientQuotationFormStore";

export default function SuccessStep() {
	const store = useClientQuotationFormStore();
	console.log({ store });
	const router = useRouter();
	const handleAddAnotherQuotation = () => {
		router.dismissTo({
			pathname: "/get-quote",
			params: { resetFields: "true" },
		});
	};

	return (
		<StepScrollView>
			<View style={styles.container}>
				<Success show onAddAnotherQuotation={handleAddAnotherQuotation} />
			</View>
		</StepScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: 60,
		paddingHorizontal: 34,
	},
});
