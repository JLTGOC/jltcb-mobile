import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputProps } from "react-native-paper";

type Props = {
  onSend: (event: GestureResponderEvent) => void;
  sendDisabled?: boolean;
};

export default function ChatMessageInput({
  sendDisabled,
  onSend,
  style,
  ...props
}: TextInputProps & Props) {
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
      <TextInput
        placeholder="Type something"
        placeholderTextColor="#9F9C9C"
        style={[styles.messageInput, style]}
        multiline
        numberOfLines={6}
        {...props}
      />
      <TouchableOpacity
        style={{ opacity: sendDisabled ? 0.3 : undefined }}
        disabled={sendDisabled}
        onPress={onSend}
      >
        <MaterialCommunityIcons
          name="send-variant-outline"
          size={32}
          color="#0000f5"
        />
      </TouchableOpacity>
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
