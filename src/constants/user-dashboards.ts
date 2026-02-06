import type {
	AccountSpecialistDashboard,
	ClientDashboard,
	DashboardFolderSection,
} from "../types/dashboard";

export const CLIENT_DB_FOLDER_SECTIONS: DashboardFolderSection<ClientDashboard>[] =
	[
		{
			title: "Shipment",
			sectionKey: "shipments",
			data: [
				{
					title: "Ongoing",
					countKey: "ongoing_count",
					icon: "ongoing",
					href: "/(client)/dashboard",
				},
				{
					title: "Completed",
					countKey: "completed_count",
					icon: "delivered",
					href: "/(client)/dashboard",
				},
			],
		},
		{
			title: "Quotation",
			sectionKey: "quotations",
			data: [
				{
					title: "Requested",
					countKey: "requested_count",
					icon: "request-quotation",
					href: "/(client)/dashboard",
				},
				{
					title: "Responded",
					countKey: "responded_count",
					icon: "quotations",
					href: "/(client)/dashboard",
				},
			],
		},
	] as const;

export const AS_DB_FOLDER_SECTIONS: DashboardFolderSection<AccountSpecialistDashboard>[] =
	[
		{
			title: "Leads",
			sectionKey: "leads",
			data: [
				{
					title: "Queries",
					countKey: "queries_count",
					icon: "delivered",
					href: "/(employee-account-specialist)/dashboard",
				},
				{
					title: "New",
					countKey: "new_count",
					icon: "ongoing",
					href: "/(employee-account-specialist)/dashboard",
				},
				{
					title: "Replied",
					countKey: "replied_count",
					icon: "ongoing",
					href: "/(employee-account-specialist)/dashboard",
				},
			],
		},
		{
			title: "Shipment",
			sectionKey: "shipments",
			data: [
				{
					title: "Ongoing",
					countKey: "ongoing_count",
					icon: "ongoing",
					href: "/(employee-account-specialist)/dashboard",
				},
				{
					title: "Delivered",
					countKey: "delivered_count",
					icon: "delivered",
					href: "/(employee-account-specialist)/dashboard",
				},
			],
		},
		{
			title: "Quotations",
			sectionKey: "quotations",
			data: [
				{
					title: "New",
					countKey: "new_count",
					icon: "quotations",
					href: "/(employee-account-specialist)/dashboard",
				},
				{
					title: "Responded",
					countKey: "responded_count",
					icon: "delivered",
					href: "/(employee-account-specialist)/dashboard",
				},
				{
					title: "Accepted",
					countKey: "accepted_count",
					icon: "ongoing",
					href: "/(employee-account-specialist)/dashboard",
				},
				{
					title: "Discarded",
					countKey: "discarded_count",
					icon: "ongoing",
					href: "/(employee-account-specialist)/dashboard",
				},
			],
		},
		{
			title: "Accounts",
			sectionKey: "accounts",
			data: [
				{
					title: "Clients",
					countKey: "clients_count",
					icon: "accounts",
					iconStyles: {
						aspectRatio: 23 / 28,
						height: 26,
					},
					href: "/(employee-account-specialist)/dashboard",
				},
			],
		},
	] as const;
