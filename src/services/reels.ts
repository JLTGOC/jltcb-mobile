import { Reel } from "../types/reels";
import { apiGet } from "./axiosInstance";

export const fetchReels = async () => await apiGet<Reel[]>("reels");
export const fetchReel = async (reelId: string) =>
  await apiGet<Reel>(`reels/${reelId}`);
