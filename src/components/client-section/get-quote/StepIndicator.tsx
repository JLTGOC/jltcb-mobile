import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import BaseStepIndicator from "react-native-step-indicator";
import type {
	StepIndicatorProps,
	StepIndicatorStyles,
} from "react-native-step-indicator/lib/typescript/src/types";

const COLORS = {
	dark: "#161F3C",
	light: "#C9C9C9",
};

const STEP_INDICATOR_STYLES: StepIndicatorStyles = {
	stepStrokeWidth: 3,
	currentStepStrokeWidth: 3,
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 25,
	stepIndicatorCurrentColor: COLORS.light,
	stepIndicatorFinishedColor: COLORS.dark,
	stepIndicatorUnFinishedColor: COLORS.light,
	stepStrokeUnFinishedColor: COLORS.dark,
	stepStrokeCurrentColor: COLORS.dark,
	stepStrokeFinishedColor: COLORS.dark,
	separatorFinishedColor: COLORS.dark,
	separatorUnFinishedColor: COLORS.light,
};

interface Props extends StepIndicatorProps {
	containerStyle?: StyleProp<ViewStyle>;
}

export default function StepIndicator({
	currentPosition = 0,
	containerStyle,
	...props
}: Props) {
	const isFirstPosition = currentPosition === 0;
	const firstPositionStyles: StepIndicatorStyles = {
		stepIndicatorCurrentColor: "white",
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<BaseStepIndicator
				customStyles={{
					...STEP_INDICATOR_STYLES,
					...(isFirstPosition ? firstPositionStyles : {}),
				}}
				currentPosition={currentPosition}
				stepCount={3}
				renderStepIndicator={({ stepStatus }) => {
					if (stepStatus === "finished") {
						return <MaterialIcons name="check" size={18} color="white" />;
					}
				}}
				{...props}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: -70,
	},
});
