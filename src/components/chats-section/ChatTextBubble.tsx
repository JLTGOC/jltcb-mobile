import { useAuth } from "@/src/hooks/useAuth";
import { TextMessage } from "@/src/types/chats";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Card, Text } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

type Props = {
  message: TextMessage;
};

export default function ChatTextBubble({ message }: Props) {
  const { userData } = useAuth();

  const isUserMessage = userData?.id === message.sender.id;
  const textStyle: StyleProp<TextStyle> = {
    color: isUserMessage ? "white" : "",
  };

  const userMessageTheme: ThemeProp = {
    colors: { elevation: { level1: "#0000F5" } },
  };

  return (
    <Card
      style={styles.bubble}
      theme={isUserMessage ? userMessageTheme : undefined}
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
