export const userKeys = {
  all: () => ["users"] as const,
  lists: () => [...userKeys.all(), "list"] as const,
  details: () => [...userKeys.all(), "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  getAsUsers: () => [...userKeys.lists(), "account-specialists"] as const,
};
