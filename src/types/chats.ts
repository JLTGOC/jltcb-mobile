import { ApiResponse } from "@/src/types/api";
import type { ReactNativeFile } from "./files";

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
  as_full_name: string;
  reference_number: string;
  commodity: string;
  volume: number | null;
  date_created: string;
}

export interface Shipment {
  id: number;
  as_full_name: string;
  reference_number: string;
  commodity: string;
  cargo_type: string;
  volume: string | null;
  date_created: string;
}

export type MessageType =
  | "TEXT"
  | "QUOTATION_CARD"
  | "FILE"
  | "SHIPMENT_CARD"
  | "IMAGE";

export interface BaseMessage {
  id: number;
  type: MessageType;
  created_at: string;
  sender: Sender;
  client_id?: string;
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

export interface ImageMessage extends BaseMessage {
  type: "IMAGE";
  file_name: string;
  file_url: string;
  width: number;
  height: number;
}

export interface ShipmentCardMessage extends BaseMessage {
  type: "SHIPMENT_CARD";
  shipment: Shipment;
}

export type Message =
  | QuotationCardMessage
  | TextMessage
  | FileMessage
  | ShipmentCardMessage
  | ImageMessage;

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

interface BaseSendMessageData {
  type: SendMessageType;
  client_id: string;
}

export interface SendMessageBody extends BaseSendMessageData {
  type: "TEXT";
  content: string;
}

export interface SendFileBody extends BaseSendMessageData {
  type: "FILE";
  file: ReactNativeFile;
}

export interface ImageFile extends ReactNativeFile {
  width: number;
  height: number;
}

export interface SendImageBody extends BaseSendMessageData {
  type: "IMAGE";
  file: ImageFile;
}

export type SendMessageData = SendMessageBody | SendFileBody | SendImageBody;

export interface MessagesPagination {
  prev_cursor: null | string;
  next_cursor: null | string;
  prev_page_url: null | string;
  next_page_url: null | string;
}

export interface MessagesResponse {
  messages: Message[];
  pagination: MessagesPagination;
}

export type MessageApiResponse = ApiResponse<Message>;
export type MessagesApiResponse = ApiResponse<MessagesResponse>;
export type InboxApiResponse = ApiResponse<Inbox>;
export type InboxListApiResponse = ApiResponse<Inbox[]>;
