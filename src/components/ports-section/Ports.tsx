import { ImageBackground } from "expo-image";
import { useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import PortAccordion from "@/src/components/ports-section/PortAccordion";
import PortRegionButtons from "@/src/components/ports-section/PortRegionButtons";
import ports, { REGIONS } from "@/src/constants/ports-catered";
import type { Region } from "@/src/types/ports";

type ExpandedPorts = Record<Region, string | null>;

const initialExpandedPorts = REGIONS.reduce((acc, region) => {
	const regionData = ports.find((r) => r.region === region);
	acc[region] = regionData?.ports[0]?.port ?? null;
	return acc;
}, {} as ExpandedPorts);

export default function Ports() {
	const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);
	const [expandedPorts, setExpandedPorts] =
		useState<ExpandedPorts>(initialExpandedPorts);

	const togglePort = (port: string) =>
		setExpandedPorts((prev) => ({
			...prev,
			[selectedRegion]: prev[selectedRegion] === port ? null : port,
		}));

	const regionPorts = ports.find(
		(port) => port.region === selectedRegion,
	)?.ports;

	const screenWidth = Dimensions.get("window").width;

	const mapImage = require("../../../src/assets/ports_catered/map.png");
	const { width, height } = Image.resolveAssetSource(mapImage);
	const scaledHeight = (screenWidth * height) / width;

	return (
		<FlatList
			contentContainerStyle={styles.container}
			data={regionPorts}
			keyExtractor={(item) => item.port}
			ListHeaderComponent={
				<>
					<ImageBackground
						source={require("../../../src/assets/banners/small.png")}
						style={{
							aspectRatio: 3,
							paddingVertical: 30,
							paddingHorizontal: 40,
						}}
						contentFit="cover"
					>
						<Text
							style={{
								color: "#EE9034",
								fontSize: 20,
								fontWeight: "500",
							}}
							allowFontScaling={false}
						>
							PORTS CATERED
						</Text>
					</ImageBackground>

					<Image
						source={mapImage}
						resizeMode="contain"
						style={{
							width: screenWidth,
							height: scaledHeight,
							marginTop: -30,
						}}
					/>

					<View style={styles.contentSpacer}>
						<PortRegionButtons
							selectedRegion={selectedRegion}
							setSelectedRegion={setSelectedRegion}
						/>
					</View>
				</>
			}
			renderItem={({ item }) => (
				<View style={styles.contentSpacer}>
					<PortAccordion
						port={item}
						toggleExpand={() => togglePort(item.port)}
						isExpanded={expandedPorts[selectedRegion] === item.port}
						title={item.port}
					/>
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 12,
		gap: 12,
	},
	contentSpacer: {
		paddingHorizontal: 10,
	},
});
