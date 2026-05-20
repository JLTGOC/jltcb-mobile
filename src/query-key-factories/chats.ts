export const chatKeys = {
  all: () => ["chats"] as const,
  lists: () => [...chatKeys.all(), "list"] as const,
  getChats: (search: string) => [...chatKeys.lists(), { search }] as const,
  getChat: (conversationId: string) =>
    [...chatKeys.all(), "detail", conversationId] as const,
  getMessages: (conversationId: string) =>
    [...chatKeys.getChat(conversationId), "messages"] as const,
};
