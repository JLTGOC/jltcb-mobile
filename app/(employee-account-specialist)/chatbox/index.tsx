import { apiPost } from "@/src/services/axiosInstance";
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import { View } from "react-native";
import { Button } from "react-native-paper";

const pusher = Pusher.getInstance();

export default function index() {
  const sendChat = async () => {
    return apiPost("users/1/messages", { type: "TEXT", content: "from as" });
  };

  const connect = async () => {
    try {
      await pusher.subscribe({
        channelName: "chat-channel",
        onEvent: (e: PusherEvent) => {
          console.log({ e });
        },
        onSubscriptionSucceeded: () => {
          console.log("subbed");
        },
        onSubscriptionError: () => {
          console.log("sub error");
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onPress={connect}>Connect</Button>
      <Button onPress={sendChat}>Send Message</Button>
      {/* <Ionicons name="construct-outline" size={100} color="black"/>
      <Text variant="displayMedium" style={{textAlign:"center"}}>Chat Features Under Construction</Text> */}
    </View>
  );
}
