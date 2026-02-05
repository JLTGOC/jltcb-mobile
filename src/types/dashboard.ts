import { ImageStyle } from "expo-image";
import type { Href } from "expo-router";
import { StyleProp } from "react-native";
// import type { LucideIcon } from "lucide-react-native";

export type DashbordFolderItem = {
  title: string;
  icon: string;
  iconStyles?: StyleProp<ImageStyle>;
  href: Href;
};

export type DashboardFolderSection = {
  title: string;
  data: DashbordFolderItem[];
};
