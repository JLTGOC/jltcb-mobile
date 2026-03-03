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
          href: "/UnderConstruction",
        },
        {
          title: "Completed",
          countKey: "completed_count",
          icon: "delivered",
          href: "/UnderConstruction",
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
          href: "/(client)/(tabs)/dashboard/requested-quotes",
        },
        {
          title: "Responded",
          countKey: "responded_count",
          icon: "quotations",
          href: "/(client)/(tabs)/dashboard/responded-quotes",
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
          href: "/(employee-account-specialist)/(tabs)/dashboard",
        },
        {
          title: "New",
          countKey: "new_count",
          icon: "ongoing",
          href: "/(employee-account-specialist)/(tabs)/dashboard",
        },
        {
          title: "Replied",
          countKey: "replied_count",
          icon: "ongoing",
          href: "/(employee-account-specialist)/(tabs)/dashboard",
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
          href: "/(employee-account-specialist)/(tabs)/dashboard",
        },
        {
          title: "Delivered",
          countKey: "delivered_count",
          icon: "delivered",
          href: "/(employee-account-specialist)/(tabs)/dashboard",
        },
      ],
    },
    {
      title: "Quotations",
      sectionKey: "quotations",
      data: [
        {
          title: "Requests",
          countKey: "new_count",
          icon: "quotations",
          href: "/(employee-account-specialist)/(tabs)/dashboard/request-quotation",
        },
        {
          title: "Responded",
          countKey: "responded_count",
          icon: "delivered",
          href: "/(employee-account-specialist)/(tabs)/dashboard/responded-quotation",
        },
        {
          title: "Accepted",
          countKey: "accepted_count",
          icon: "ongoing",
          href: "/(employee-account-specialist)/(tabs)/dashboard",
        },
        {
          title: "Discarded",
          countKey: "discarded_count",
          icon: "ongoing",
          href: "/(employee-account-specialist)/(tabs)/dashboard",
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
          href: "/(employee-account-specialist)/(tabs)/dashboard",
        },
      ],
    },
  ] as const;
