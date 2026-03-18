import Ionicons from "@expo/vector-icons/Ionicons";
import * as Crypto from "expo-crypto";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSendFileMutation } from "@/src/hooks/useSendFileMutation";
import type { SendFileBody } from "@/src/types/chats";

export default function ChatFilePicker() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const sendFileMutation = useSendFileMutation(id);

	const onSelectFile = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ["application/*", "text/*", "audio/*"],
				copyToCacheDirectory: true,
			});

			if (result.canceled) return;

			const { uri, name, mimeType } = result.assets[0];

			const sendFileBody: SendFileBody = {
				client_id: Crypto.randomUUID(),
				type: "FILE",
				file: {
					uri,
					name,
					type: mimeType,
				},
			};

			sendFileMutation.mutate(sendFileBody);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<TouchableOpacity onPress={onSelectFile}>
			<Ionicons name="attach" style={styles.fileIcon} color="gray" size={30} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	fileIcon: {
		transform: [{ rotate: "20deg" }],
	},
});
