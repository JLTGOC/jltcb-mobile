import type { DashboardFolderSection } from "../types/dashboard";

export const CLIENT_DB_FOLDER_SECTIONS: DashboardFolderSection[] = [
  {
    title: "Shipment",
    data: [
      {
        title: "Ongoing",
        icon: "ongoing",
        href: "/(client)/dashboard",
      },
      {
        title: "Completed",
        icon: "delivered",
        href: "/(client)/dashboard",
      },
    ],
  },
  {
    title: "Quotation",
    data: [
      {
        title: "Requested",
        icon: "request-quotation",
        href: "/(client)/dashboard",
      },
      {
        title: "Responded",
        icon: "quotations",
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
        icon: "delivered",
        href: "/(employee-account-specialist)/dashboard",
      },
      {
        title: "New",
        icon: "ongoing",
        href: "/(employee-account-specialist)/dashboard",
      },
      {
        title: "Replied",
        icon: "ongoing",
        href: "/(employee-account-specialist)/dashboard",
      },
    ],
  },
  {
    title: "Shipment",
    data: [
      {
        title: "Ongoing",
        icon: "ongoing",
        href: "/(employee-account-specialist)/dashboard",
      },
      {
        title: "Delivered",
        icon: "delivered",
        href: "/(employee-account-specialist)/dashboard",
      },
    ],
  },
  {
    title: "Quotations",
    data: [
      {
        title: "New",
        icon: "quotations",
        href: "/(employee-account-specialist)/dashboard",
      },
      {
        title: "Responded",
        icon: "delivered",
        href: "/(employee-account-specialist)/dashboard",
      },
      {
        title: "Accepted",
        icon: "ongoing",
        href: "/(employee-account-specialist)/dashboard",
      },
      {
        title: "Discarded",
        icon: "ongoing",
        href: "/(employee-account-specialist)/dashboard",
      },
    ],
  },
  {
    title: "Accounts",
    data: [
      {
        title: "Clients",
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
