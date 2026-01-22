import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

const SCREEN_WIDTH = Dimensions.get("window").width;
export default function CoreValuesTemplate() {
	const [activeIndex, setActiveIndex] = useState(0);

	const data = [
		{
			image: require("../../../src/assets/about_us/mission.png"),
			title: "Mission",
			description:
				"To deliver world-class, compliant and value-driven customs brokerage and logistics solutions that empower businesses, elevate professionals, and advance a secure, transparent and globally competitive trade industry.",
		},
		{
			image: require("../../../src/assets/about_us/vision.png"),
			title: "Vision",
			description:
				"To be the world’s leading customs brokerage firm, trusted for client satisfaction, operational excellence, and integrity, while fostering a culture of growth, innovation, and partnership that advances both the profession and global trade.",
		},
		{
			image: require("../../../src/assets/about_us/coreValues.png"),
			title: "Core Values",
			description:
				"• Deliver Excellence Always\n• Lead with Integrity\n• Innovate with Purpose\n• Empower our People\n• Commit to Compliance\n• Put our Clients First\n• Serve Beyond Business",
		},
	];

	const handleScroll = (event: any) => {
		const scrollX = event.nativeEvent.contentOffset.x;
		const index = Math.round(scrollX / SCREEN_WIDTH);
		setActiveIndex(index);
	};

	return (
		<View>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={0}
				contentContainerStyle={{ columnGap: 30, paddingHorizontal: 18 }}
			>
				{data.map((item, i) => (
					<Card style={styles.card} mode="contained" key={i}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Image source={item.image} style={{ width: 100, height: 100 }} />
							<View style={{ flex: 1 }}>
								<Text
									style={{ fontSize: 22, fontWeight: "bold", color: "#161F3C" }}
									allowFontScaling={false}
								>
									{item.title}
								</Text>
								<Text
									style={{
										fontSize: 12,
										textAlign: "justify",
										color: "#161F3C",
										lineHeight: 14,
									}}
									allowFontScaling={false}
								>
									{item.description}
								</Text>
							</View>
						</View>
					</Card>
				))}
			</ScrollView>

			{/* Indicator Lines */}
			<View style={styles.indicatorContainer}>
				{data.map((_, index) => (
					<View
						key={index}
						style={[
							styles.indicatorLine,
							{
								backgroundColor:
									index === activeIndex ? "#aa5c0eff" : "#EE9034",
							},
						]}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		justifyContent: "space-between",
	},
	card: {
		width: 300,
		padding: 10,
	},
	indicatorContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
	},
	indicatorLine: {
		width: 30,
		height: 3,
		marginHorizontal: 5,
		borderRadius: 2,
	},
});
