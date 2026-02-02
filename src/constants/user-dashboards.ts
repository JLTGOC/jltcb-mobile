import {
	CircleUser,
	FileSpreadsheet,
	NotepadTextDashed,
	Package2,
	Truck,
} from "lucide-react-native";
import type { DashboardFolderSection } from "../types/dashboard";

export const CLIENT_DB_FOLDER_SECTIONS: DashboardFolderSection[] = [
	{
		title: "Shipment",
		data: [
			{
				title: "Ongoing",
				icon: Truck,
				href: "/(client)/dashboard",
			},
			{
				title: "Completed",
				icon: Package2,
				href: "/(client)/dashboard",
			},
		],
	},
	{
		title: "Quotation",
		data: [
			{
				title: "Requested",
				icon: NotepadTextDashed,
				href: "/(client)/dashboard",
			},
			{
				title: "Responded",
				icon: FileSpreadsheet,
				href: "/(client)/dashboard",
			},
		],
	},
] as const;

export const AS_DB_FOLDER_SECTIONS: DashboardFolderSection[] = [
	{
		title: "Leads",
		data: [
			{
				title: "Queries",
				icon: Package2,
				href: "/(employee-account-specialist)/dashboard",
			},
			{
				title: "New",
				icon: Truck,
				href: "/(employee-account-specialist)/dashboard",
			},
			{
				title: "Replied",
				icon: Truck,
				href: "/(employee-account-specialist)/dashboard",
			},
		],
	},
	{
		title: "Shipment",
		data: [
			{
				title: "Ongoing",
				icon: Truck,
				href: "/(employee-account-specialist)/dashboard",
			},
			{
				title: "Delivered",
				icon: Package2,
				href: "/(employee-account-specialist)/dashboard",
			},
		],
	},
	{
		title: "Quotations",
		data: [
			{
				title: "New",
				icon: FileSpreadsheet,
				href: "/(employee-account-specialist)/dashboard",
			},
			{
				title: "Responded",
				icon: Package2,
				href: "/(employee-account-specialist)/dashboard",
			},
			{
				title: "Accepted",
				icon: Truck,
				href: "/(employee-account-specialist)/dashboard",
			},
			{
				title: "Discarded",
				icon: Truck,
				href: "/(employee-account-specialist)/dashboard",
			},
		],
	},
	{
		title: "Accounts",
		data: [
			{
				title: "Clients",
				icon: CircleUser,
				href: "/(employee-account-specialist)/dashboard",
			},
		],
	},
] as const;
