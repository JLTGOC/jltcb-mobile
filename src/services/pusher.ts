import { Pusher } from "@pusher/pusher-websocket-react-native";

export const initPusher = async () => {
  const pusher = Pusher.getInstance();

  await pusher.init({
    apiKey: process.env.EXPO_PUBLIC_PUSHER_API_KEY!,
    cluster: process.env.EXPO_PUBLIC_PUSHER_API_CLUSTER!,
    onConnectionStateChange: (currentState: string, previousState: string) => {
      console.log(
        `onConnectionStateChange. previousState=${previousState} newState=${currentState}`,
      );
    },
  });

  await pusher.connect();
};
