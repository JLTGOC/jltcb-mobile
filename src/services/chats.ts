import { apiGet, apiPost } from "@/src/services/axiosInstance";
import type { Inbox, Message, SendMessageData } from "@/src/types/chats";

export const fetchChats = (search: string) =>
  apiGet<Inbox[]>("conversations", { params: { search } });

export const fetchChatMessages = (conversationId: string) =>
  apiGet<Message[]>(`conversations/${conversationId}/messages`);

export const sendMessage = (conversationId: string, data: SendMessageData) =>
  apiPost<Message>(`conversations/${conversationId}`, data);
