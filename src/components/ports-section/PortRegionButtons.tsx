import type { Dispatch, SetStateAction } from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { REGIONS } from "@/src/constants/ports-catered";
import type { Region } from "@/src/types/ports";

type PortRegionButtonsProps = {
	selectedRegion: Region;
	setSelectedRegion: Dispatch<SetStateAction<Region>>;
};

export default function PortRegionButtons({
	selectedRegion,
	setSelectedRegion,
}: PortRegionButtonsProps) {
	return (
		<FlatList
			data={REGIONS}
			horizontal
			scrollEnabled={false}
			ItemSeparatorComponent={() => <View style={{ marginRight: 10 }} />}
			renderItem={({ item: region }) => {
				const isActive = selectedRegion === region;
				return (
					<Button
						mode="outlined"
						style={{
							borderColor: isActive ? "#EE9034" : "#888888ff",
							backgroundColor: isActive ? "#EE9034" : "#ffffff",
							borderRadius: 5,
						}}
						labelStyle={{
							color: isActive ? "#ffffff" : "#888888ff",
						}}
						onPress={() => setSelectedRegion(region)}
					>
						<Text allowFontScaling={false} style={{ fontSize: 12 }}>
							{region}
						</Text>
					</Button>
				);
			}}
		/>
	);
}
