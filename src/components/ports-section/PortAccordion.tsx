import { Ionicons } from "@expo/vector-icons";
import type { ReactElement } from "react";
import {
	FlatList,
	type GestureResponderEvent,
	Pressable,
	StyleSheet,
	View,
} from "react-native";
import { Card, Text } from "react-native-paper";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { PortData } from "@/src/types/ports";

type PortAccordionProps = {
	icon?: ReactElement;
	title: string;
	port: PortData;
	isExpanded: boolean;
	toggleExpand: (event: GestureResponderEvent) => void;
};

export default function PortAccordion({
	title,
	port,
	isExpanded,
	toggleExpand,
}: PortAccordionProps) {
	const contentHeight = useSharedValue(0);

	const progress = useDerivedValue(() => {
		return withTiming(isExpanded ? 1 : 0, { duration: 300 });
	});

	const heightStyle = useAnimatedStyle(() => {
		return {
			height: progress.value * contentHeight.value,
			opacity: progress.value === 0 ? 0 : 1,
		};
	});

	const arrowStyle = useAnimatedStyle(() => {
		const rotate = interpolate(
			progress.value,
			[0, 1],
			[0, 180],
			Extrapolation.CLAMP,
		);
		return {
			transform: [{ rotate: `${rotate}deg` }],
		};
	});

	return (
		<Card style={{ overflow: "hidden" }}>
			<Card.Content style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
				<Pressable
					onPress={toggleExpand}
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 10,
						paddingVertical: 6,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 5,
						}}
					>
						<Ionicons name="boat" size={18} />
						<Text allowFontScaling={false}>{title}</Text>
					</View>

					<Animated.View style={arrowStyle}>
						<Ionicons name="arrow-down-circle" size={22} color="#EE9034" />
					</Animated.View>
				</Pressable>
				<Animated.View style={[styles.contentContainer, heightStyle]}>
					<View
						style={[
							{
								paddingBlock: 8,
							},
							styles.contentInner,
						]}
						onLayout={(e) => {
							contentHeight.value = e.nativeEvent.layout.height;
						}}
					>
						<FlatList
							data={port.subPorts}
							renderItem={({ item }) => (
								<View style={styles.subport}>
									<Ionicons name="ellipse" size={6} />
									<Text key={item} allowFontScaling={false}>
										{item}
									</Text>
								</View>
							)}
							ListEmptyComponent={
								<Text allowFontScaling={false}>No Sub-Ports!</Text>
							}
						/>
					</View>
				</Animated.View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		overflow: "hidden",
	},
	contentInner: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
	},
	subport: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
});
