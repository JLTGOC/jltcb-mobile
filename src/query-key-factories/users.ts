export const userKeys = {
	all: () => ["chats"] as const,
	lists: () => [...userKeys.all(), "list"] as const,
	getAsUsers: () => [...userKeys.lists(), "account-specialists"] as const,
};
