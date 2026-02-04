import { apiGet } from "../services/axiosInstance";
import { Reel } from "../types/reels";

export const fetchReels = async () => await apiGet<Reel[]>("reels");
export const fetchReel = async (reelId: string) =>
  await apiGet<Reel>(`reels/${reelId}`);
