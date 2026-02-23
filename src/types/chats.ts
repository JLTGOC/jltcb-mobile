export interface Inbox {
  id: string;
  type: string;
  title: string;
  image_path: string | null;
  last_message: string;
  time: string;
  unread_count: number;
}
