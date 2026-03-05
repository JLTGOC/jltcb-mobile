import { useSendMessageMutation } from "@/src/hooks/useSendMessageMutation";
import { MessageForm, messageFormSchema } from "@/src/schemas/messageSchema";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Crypto from "expo-crypto";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { TextInputProps } from "react-native-paper";

type Props = {
  chatId: string;
};

export default function ChatMessageInput({
  chatId,
  style,
  ...props
}: TextInputProps & Props) {
  const { control, handleSubmit, reset } = useForm<MessageForm>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const sendMessageMutation = useSendMessageMutation(chatId);

  const onSendMessage = handleSubmit(({ content }) => {
    const client_id = Crypto.randomUUID();

    sendMessageMutation.mutate({ content, type: "TEXT", client_id });
    reset();
  });

  return (
    <View style={styles.messageInputContainer}>
      <TouchableOpacity>
        <Ionicons
          name="attach"
          style={styles.fileIcon}
          color="gray"
          size={30}
        />
      </TouchableOpacity>
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
            <TouchableOpacity
              style={{ opacity: !value ? 0.3 : undefined }}
              disabled={!value}
              onPress={onSendMessage}
            >
              <MaterialCommunityIcons
                name="send-variant-outline"
                size={32}
                color="#0000f5"
              />
            </TouchableOpacity>
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
