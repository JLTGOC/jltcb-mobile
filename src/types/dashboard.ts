import type { ImageStyle } from "expo-image";
import type { Href } from "expo-router";
import type { StyleProp } from "react-native";
import type { User } from "./auth";

type ExtractCountKeys<T> = {
	[K in keyof Omit<T, "user">]: keyof T[K];
}[keyof Omit<T, "user">];

export type BaseFolderItem = {
	title: string;
	icon: string;
	countKey: string;
	href: Href;
	count?: number;
	iconStyles?: StyleProp<ImageStyle>;
};

export type BaseFolderSection = {
	title: string;
	data: BaseFolderItem[];
};

export type DashboardFolderItem<T> = BaseFolderItem & {
	countKey: T extends object ? ExtractCountKeys<T> : string;
};

export type DashboardFolderSection<T> = {
	title: string;
	sectionKey: T extends object ? keyof Omit<T, "user"> : string;
	data: DashboardFolderItem<T>[];
};
export type DashboardUser = Pick<User, "role" | "image_path"> & {
	company: User["company_name"];
};

export type AccountSpecialistDashboard = {
	user: DashboardUser;
	leads: {
		queries_count: number;
		new_count: number;
		replied_count: number;
	};
	shipments: {
		ongoing_count: number;
		delivered_count: number;
	};
	quotations: {
		new_count: number;
		responded_count: number;
		accepted_count: number;
		discarded_count: number;
	};
	accounts: {
		clients_count: number;
	};
};

export type ClientDashboard = {
	user: DashboardUser;
	shipments: {
		ongoing_count: number;
		completed_count: number;
	};
	quotations: {
		requested_count: number;
		responded_count: number;
	};
};
