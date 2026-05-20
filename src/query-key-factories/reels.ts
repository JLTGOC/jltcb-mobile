export const reelKeys = {
  all: () => ["reels"] as const,
  getReels: () => [...reelKeys.all(), "list"] as const,
  getReel: (reelId?: string) =>
    [...reelKeys.all(), "detail", { reelId }] as const,
};
