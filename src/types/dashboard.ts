import type { Href } from "expo-router";
import type { LucideIcon } from "lucide-react-native";

export type DashbordFolderItem = {
	title: string;
	icon: LucideIcon;
	href: Href;
};

export type DashboardFolderSection = {
	title: string;
	data: DashbordFolderItem[];
};
