import { Inbox } from "../types/chats";
import { apiGet } from "./axiosInstance";

export const fetchChats = (search: string) =>
  apiGet<Inbox[]>("conversations", { params: { search } });
