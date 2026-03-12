import { zodResolver } from "@hookform/resolvers/zod";
import * as Crypto from "expo-crypto";
import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native-paper";
import { useSendMessageMutation } from "@/src/hooks/useSendMessageMutation";
import {
	type MessageForm,
	messageFormSchema,
} from "@/src/schemas/messageSchema";
import ChatFilePicker from "./ChatFilePicker";
import ChatImagePicker from "./ChatImagePicker";
import ChatSendButton from "./ChatSendButton";

interface Props extends TextInputProps {}

export default function ChatMessageInput({ style, ...props }: Props) {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { control, handleSubmit, reset } = useForm<MessageForm>({
		resolver: zodResolver(messageFormSchema),
		defaultValues: {
			content: "",
		},
	});

	const sendMessageMutation = useSendMessageMutation(id);

	const onSendMessage = handleSubmit(({ content }) => {
		const client_id = Crypto.randomUUID();

		sendMessageMutation.mutate({ content, type: "TEXT", client_id });
		reset();
	});

	return (
		<View style={styles.messageInputContainer}>
			<View style={styles.uploadSection}>
				<ChatFilePicker />
				<ChatImagePicker />
			</View>

			<View style={styles.dividerContainer}>
				<View style={styles.divider} />
			</View>

			<Controller
				name="content"
				control={control}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							placeholder="Type something"
							placeholderTextColor="#9F9C9C"
							style={[styles.messageInput, style]}
							multiline
							numberOfLines={6}
							onBlur={onBlur}
							value={value}
							onChangeText={onChange}
							{...props}
						/>
						<ChatSendButton onPress={onSendMessage} disabled={!value} />
					</>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	messageInputContainer: {
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		margin: 10,
		borderRadius: 20,
		padding: 12,
	},
	uploadSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	dividerContainer: {
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	divider: {
		flex: 1,
		width: 2,
		backgroundColor: "gray",
	},
	messageInput: {
		flex: 1,
		color: "black",
	},
});
