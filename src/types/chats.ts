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

export interface QuotationCardMessage {
  id: number;
  type: "QUOTATION_CARD";
  created_at: string;
  sender: Sender;
  quotation: Quotation;
}

export interface TextMessage {
  id: number;
  type: "TEXT";
  created_at: string;
  sender: Sender;
  content: string;
}

export type Message = QuotationCardMessage | TextMessage;

export interface ChatEventMap {
  "message.sent": Message;
}

export type ChatEvent = keyof ChatEventMap;

export type SendMessageType = "TEXT" | "FILE" | "IMAGE";

export type SendMessageData =
  | {
      type: "TEXT";
      content: string;
    }
  | {
      type: Exclude<SendMessageType, "TEXT">;
      file: string;
    };
