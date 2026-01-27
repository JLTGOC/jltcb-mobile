import type { PortData } from "@/src/types/ports";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

type PortAccordionProps = {
	port: PortData;
	expanded: boolean;
	toggleExpand: (port: string) => void;
};

export default function PortAccordion({
	port,
	expanded,
	toggleExpand,
}: PortAccordionProps) {
	return (
		<Card onPress={() => toggleExpand(port.port)}>
			<Card.Content style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 10,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
						}}
					>
						<Ionicons name="boat" size={18} />
						<Text allowFontScaling={false}>{port.port}</Text>
					</View>
					<Button
						compact
						contentStyle={{
							paddingHorizontal: 0,
							paddingVertical: 0,
						}}
					>
						{expanded ? (
							<Ionicons name="arrow-up-circle" size={22} color="#EE9034" />
						) : (
							<Ionicons name="arrow-down-circle" size={22} color="#EE9034" />
						)}
					</Button>
				</View>
				{expanded && (
					<View
						style={{
							paddingBlock: 8,
						}}
					>
						<FlatList
							data={port.subPorts}
							renderItem={({ item }) => (
								<Text key={item} allowFontScaling={false}>
									• {item}
								</Text>
							)}
							ListEmptyComponent={
								<Text allowFontScaling={false}>No Sub-Ports!</Text>
							}
						/>
					</View>
				)}
			</Card.Content>
		</Card>
	);
}
