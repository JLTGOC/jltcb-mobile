import type { Inbox, SendMessageData } from "../types/chats";
import { apiGet, apiPost } from "./axiosInstance";

export const fetchChats = (search: string) =>
  apiGet<Inbox[]>("conversations", { params: { search } });

export const sendMessage = (conversationId: string, data: SendMessageData) =>
  apiPost(`conversations/${conversationId}`, data);
