import { Pusher } from "@pusher/pusher-websocket-react-native";
import { auth } from "../services/pusher";

export const pusher = Pusher.getInstance();

export const initPusher = async () => {
  if (pusher.connectionState !== "DISCONNECTED") return;

  try {
    await pusher.init({
      apiKey: process.env.EXPO_PUBLIC_PUSHER_API_KEY!,
      cluster: process.env.EXPO_PUBLIC_PUSHER_CLUSTER!,

      onAuthorizer: async (channelName: string, socketId: string) => {
        const data = { channel_name: channelName, socket_id: socketId };
        const res = await auth(data);
        return res.data;
      },

      onConnectionStateChange: (state) => {
        console.log("Pusher state:", state);
      },
      onError: (err) => {
        console.log("Pusher error:", err);
      },
    });
  } catch (e) {
    console.error(e);
  }
};
