import { useSendFileMutation } from "@/src/hooks/useSendFileMutation";
import { useSendMessageMutation } from "@/src/hooks/useSendMessageMutation";
import { MessageForm, messageFormSchema } from "@/src/schemas/messageSchema";
import { SendFileBody } from "@/src/types/chats";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Crypto from "expo-crypto";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native-paper";
import ChatImagePicker from "./ChatImagePicker";

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
    <View style={styles.messageInputContainer}>
      <View style={styles.uploadSection}>
        <Pressable
          onPress={onSelectFile}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Ionicons
            name="attach"
            style={styles.fileIcon}
            color="gray"
            size={30}
          />
        </Pressable>
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
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: !value ? 0.3 : (pressed ? 0.7 : 1),
                },
              ]}
              disabled={!value}
              onPress={onSendMessage}
            >
              <MaterialCommunityIcons
                name="send-variant-outline"
                size={32}
                color="#0000f5"
              />
            </Pressable>
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
  fileIcon: {
    transform: [{ rotate: "20deg" }],
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
