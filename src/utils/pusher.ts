import { PusherEvent } from "@pusher/pusher-websocket-react-native";
import { pusher } from "../lib/pusher";

export const parseEventData = <T>(jsonData: string) => {
  try {
    const parsed: T = JSON.parse(jsonData);
    return parsed;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
  }
};

export const subscribeToChat = async (
  chatId: string,
  onEvent?: (e: PusherEvent) => void,
) =>
  await pusher.subscribe({
    channelName: `private-chat.${chatId}`,
    onEvent,
    onSubscriptionError: (channelName: string, message: string, e: any) => {
      console.log({ channelName, message, e });
    },
    onSubscriptionSucceeded: (data) => {
      console.log({ data });
    },
  });
