import type { PusherAuthorizerResult } from "@pusher/pusher-websocket-react-native";
import api from "./axiosInstance";

interface PusherAuthBody {
  socket_id: string;
  channel_name: string;
}

export const auth = (data: PusherAuthBody) =>
  api.post<PusherAuthorizerResult>("broadcasting/auth", data);
