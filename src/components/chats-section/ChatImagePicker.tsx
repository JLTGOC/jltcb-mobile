import Ionicons from "@expo/vector-icons/Ionicons";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";

import { useSendImageMutation } from "@/hooks/useSendImageMutation";
import type { SendImageBody } from "@/types/chats";

export default function ChatImagePicker() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const sendImageMutation = useSendImageMutation(id);

	const onSelectImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				quality: 0.7,
			});

			if (result.canceled) return;

			const { uri, fileName, mimeType, width, height } = result.assets[0];

			const sendImageBody: SendImageBody = {
				client_id: Crypto.randomUUID(),
				type: "IMAGE",
				file: {
					uri,
					name: fileName ?? "",
					type: mimeType,
					width,
					height,
				},
			};

			sendImageMutation.mutate(sendImageBody);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Pressable
			onPress={onSelectImage}
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.7 : 1,
				},
			]}
		>
			<Ionicons name="image" color="gray" size={26} />
		</Pressable>
	);
}
