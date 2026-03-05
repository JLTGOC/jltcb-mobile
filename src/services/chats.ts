import { apiGet, apiPost } from "@/src/services/axiosInstance";
import type {
  Inbox,
  Message,
  SendFileBody,
  SendMessageBody,
} from "@/src/types/chats";

export const fetchChats = (search: string) =>
  apiGet<Inbox[]>("conversations", { params: { search } });

export const fetchConversationData = (converstationId: string) =>
  apiGet<Inbox>(`conversations/${converstationId}`);

export const fetchChatMessages = (conversationId: string) =>
  apiGet<Message[]>(`conversations/${conversationId}/messages`);

export const sendMessage = (conversationId: string, data: SendMessageBody) =>
  apiPost<Message>(`conversations/${conversationId}`, data);

export const sendQuotationCard = (quotationId: string) =>
  apiPost<{ conversation_id: string }>(`quotations/${quotationId}/chat`);

export const sendFile = (
  conversationId: string,
  { client_id, type, file }: SendFileBody,
) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("client_id", client_id);
  formData.append("file", file as unknown as Blob);

  console.log(formData);

  return apiPost<Message>(`conversations/${conversationId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
