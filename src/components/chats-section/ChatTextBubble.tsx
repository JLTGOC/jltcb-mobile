import { useAuth } from "@/src/hooks/useAuth";
import { TextMessage } from "@/src/types/chats";
import { type StyleProp, StyleSheet, type TextStyle } from "react-native";
import { Card, Text } from "react-native-paper";
import type { ThemeProp } from "react-native-paper/lib/typescript/types";

type Props = {
  message: TextMessage;
};

export default function ChatTextBubble({ message }: Props) {
  const { userData } = useAuth();

  const isUserMessage = userData?.id === message.sender.id;
  const textStyle: StyleProp<TextStyle> = {
    color: isUserMessage ? "white" : "",
  };

  const senderMessageTheme: ThemeProp = {
    colors: { surfaceVariant: "#0000F5" },
  };

  const receiverMessageTheme: ThemeProp = {
    colors: { surfaceVariant: "#FFF" },
  };

  return (
    <Card
      mode="contained"
      style={styles.bubble}
      theme={isUserMessage ? senderMessageTheme : receiverMessageTheme}
    >
      <Card.Content>
        <Text style={textStyle}>{message.content}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 15,
  },
});
