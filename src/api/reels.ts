import { apiGet } from "../services/axiosInstance";
import { Reel } from "../types/reels";

export const fetchReels = async () => await apiGet<Reel[]>("reels");
