export const chatKeys = {
  all: () => ["chats"] as const,
  getChats: (search: string) =>
    [...chatKeys.all(), "list", { search }] as const,
  getChat: (conversationId: string) =>
    [...chatKeys.all(), "detail", { conversationId }] as const,
};
