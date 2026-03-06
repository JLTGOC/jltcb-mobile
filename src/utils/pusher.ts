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

type SubscriptionType = "chat" | "user";

const subscribe = async (
  type: SubscriptionType,
  id: string,
  onEvent?: (e: PusherEvent) => void,
) => {
  return await pusher.subscribe({
    channelName: `private-${type}.${id}`,
    onEvent,
    onSubscriptionError: (channelName: string, message: string, e: any) => {
      console.log({ channelName, message, e });
    },
    onSubscriptionSucceeded: (data) => {
      // console.log({ data });
    },
  });
};

export const subscribeToChat = (
  chatId: string,
  onEvent?: (e: PusherEvent) => void,
) => subscribe("chat", chatId, onEvent);

export const subscribeToUser = (
  userId: string,
  onEvent?: (e: PusherEvent) => void,
) => subscribe("user", userId, onEvent);
