import { apiPost } from "@/src/services/axiosInstance";
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Text } from "react-native-paper";

const pusher = Pusher.getInstance();

export default function Chatbox() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  const startChat = async () => {
    return apiPost("quotations/3/chat");
  };

  const sendChat = async () => {
    return apiPost("users/3/messages", { type: "TEXT", content: "HEllo" });
  };

  const onEvent = async (e: PusherEvent) => {
    if (e.eventName === "chat.chat-with-user") {
      const data = await JSON.parse(e.data);
      setIncomingMessages((i) => [...i, data.message]);
    }
  };

  useEffect(() => {
    const subscribe = async () => {
      const channel = await pusher.subscribe({
        channelName: "chat-channel",
        onEvent,
        onSubscriptionSucceeded: () => {
          console.log("subbed");
        },
        onSubscriptionError: () => {
          console.log("sub error");
        },
      });
    };

    subscribe();

    return () => {
      pusher.unsubscribe({ channelName: "chat-channel" });
      console.log("unsubbed");
    };
  }, []);

  return (
    <View>
      <Button onPress={startChat}>Start Chat</Button>
      <Button onPress={sendChat}>Send Message</Button>

      <FlatList
        style={{ borderWidth: 1 }}
        data={incomingMessages}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "orange" }}>
            <Text style={{ color: "black" }}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}
