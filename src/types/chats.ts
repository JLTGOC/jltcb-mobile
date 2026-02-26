export interface Inbox {
  id: string;
  type: string;
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

export interface BaseMessage {
  id: number;
  type: "TEXT" | "QUOTATION_CARD";
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

export type Message = QuotationCardMessage | TextMessage;

export interface MessageSentEvent {
  message: Message;
  client_id: string;
}

export interface ChatEventMap {
  "message.sent": MessageSentEvent;
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
