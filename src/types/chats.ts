import { ApiResponse } from "@/src/types/api";

export interface Inbox {
  id: string;
  type: "DIRECT" | "GROUP";
  title: string;
  image_path: string | null;
  last_message: string;
  time: string;
  unread_count: number;
}

export interface Sender {
  id: number | null;
  full_name: string;
  image_path: string;
}

export interface Quotation {
  id: number;
  reference_number: string;
  commodity: string;
  volume: number | null;
  date_created: string;
}

export interface Shipment {
  id: number;
  reference_number: string;
  commodity: string;
  cargo_type: string;
  volume: string | null;
  date_created: string;
}

export type MessageType = "TEXT" | "QUOTATION_CARD" | "FILE" | "SHIPMENT_CARD";

export interface BaseMessage {
  id: number;
  type: MessageType;
  created_at: string;
  sender: Sender;
  client_id?: string; // ✅ snake_case everywhere
}

export interface TextMessage extends BaseMessage {
  type: "TEXT";
  content: string;
}

export interface QuotationCardMessage extends BaseMessage {
  type: "QUOTATION_CARD";
  quotation: Quotation;
}

export interface FileMessage extends BaseMessage {
  type: "FILE";
  file_name: string;
  file_url: string;
}

export interface ShipmentCardMessage extends BaseMessage {
  type: "SHIPMENT_CARD";
  shipment: Shipment;
}

export type Message =
  | QuotationCardMessage
  | TextMessage
  | FileMessage
  | ShipmentCardMessage;

export interface MessageSentEvent {
  message: Message;
  client_id: string;
}

export interface InboxUpdatedEvent {
  inbox: Inbox;
}

export interface ChatEventMap {
  "message.sent": MessageSentEvent;
  "inbox.updated": InboxUpdatedEvent;
}

export type ChatEvent = keyof ChatEventMap;

export type SendMessageType = "TEXT" | "FILE" | "IMAGE";

export type SendMessageData =
  | {
      type: "TEXT";
      content: string;
      client_id: string;
    }
  | {
      type: Exclude<SendMessageType, "TEXT">;
      file: string;
      client_id: string;
    };

export type MessageResponse = ApiResponse<Message>;
export type MessagesResponse = ApiResponse<Message[]>;
export type InboxResponse = ApiResponse<Inbox>;
export type InboxListResponse = ApiResponse<Inbox[]>;
