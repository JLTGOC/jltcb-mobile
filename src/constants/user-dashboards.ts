import type {
  AccountSpecialistDashboard,
  ClientDashboard,
  DashboardFolderSection,
  FinanceDashboard,
  OperationsDashboard,
<<<<<<< HEAD
} from "../types/dashboard";
=======
} from "@/types/dashboard";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

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
          href: "/(client)/(tabs)/dashboard/shipment/on-going",
        },
        {
          title: "Completed",
          countKey: "completed_count",
          icon: "delivered",
          href: "/(client)/(tabs)/dashboard/shipment/completed",
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
          href: "/(client)/(tabs)/dashboard/request-quotation",
        },
        {
          title: "Responded",
          countKey: "responded_count",
          icon: "quotations",
          href: "/(client)/(tabs)/dashboard/responded-quotation",
        },
      ],
    },
  ] as const;

export const OPERATIONS_DB_FOLDER_SECTION: DashboardFolderSection<OperationsDashboard>[] =
  [
    {
      title: "Job Order",
      sectionKey: "job_orders",
      data: [
        {
          title: "Created",
          countKey: "created_count",
          icon: "ongoing",
          href: "/job-orders?status=created",
        },
        {
          title: "Processed",
          countKey: "processed_count",
          icon: "delivered",
          href: "/job-orders?status=processed",
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
          href: "/shipments?status=ongoing",
        },
        {
          title: "Delivered",
          countKey: "delivered_count",
          icon: "delivered",
          href: "/shipments?status=delivered",
        },
      ],
    },
  ] as const;

export const FINANCE_DB_FOLDER_SECTION: DashboardFolderSection<FinanceDashboard>[] =
  [
    {
      title: "Job Order",
      sectionKey: "job_orders",
      data: [
        {
          title: "Created",
          countKey: "ongoing_count",
          icon: "ongoing",
          href: "/",
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
          href: "/",
        },
        {
          title: "Delivered",
          countKey: "delivered_count",
          icon: "delivered",
          href: "/",
        },
      ],
    },
  ] as const;

export const OPERATIONS_DB_FOLDER_SECTION: DashboardFolderSection<OperationsDashboard>[] =
  [
    {
      title: "Job Order",
      sectionKey: "job_orders", //total of job order created
      data: [
        {
          title: "Created",
          countKey: "created_count",
          icon: "ongoing",
          href: "/(employee-operations)/(tabs)/dashboard/jobOrder/created",
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
          href: "/(employee-operations)/(tabs)/dashboard",
        },
        {
          title: "Delivered",
          countKey: "delivered_count",
          icon: "delivered",
          href: "/(employee-operations)/(tabs)/dashboard",
        },
      ],
    },
  ] as const;

export const FINANCE_DB_FOLDER_SECTION: DashboardFolderSection<FinanceDashboard>[] =
  [
    {
      title: "Job Order",
      sectionKey: "job_orders", //total of job order created
      data: [
        {
          title: "Created",
          countKey: "ongoing_count",
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
          href: "/",
        },
        {
          title: "New",
          countKey: "new_count",
          icon: "ongoing",
          href: "/",
        },
        {
          title: "Replied",
          countKey: "replied_count",
          icon: "ongoing",
          href: "/",
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
          href: "/",
        },
        {
          title: "Delivered",
          countKey: "delivered_count",
          icon: "delivered",
          href: "/",
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
          href: "/quotations?status=requested",
        },
        {
          title: "Responded",
          countKey: "responded_count",
          icon: "delivered",
          href: "/quotations?status=responded",
        },
        {
          title: "Accepted",
          countKey: "accepted_count",
          icon: "ongoing",
<<<<<<< HEAD
          href: "/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation",
=======
          href: "/quotations?status=accepted",
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
        },
        {
          title: "Discarded",
          countKey: "discarded_count",
          icon: "ongoing",
          href: "/",
        },
      ],
    },
    {
      title: "Job Order",
      sectionKey: "job_orders",
      data: [
        {
          title: "Created",
          countKey: "created_count",
          icon: "ongoing",
          href: "/job-orders",
        },
      ],
    },
    {
      title: "Job Order",
      sectionKey: "job_orders",
      data: [
        {
          title: "Created",
          countKey: "created_count",
          icon: "ongoing",
          href: "/(employee-account-specialist)/(tabs)/dashboard/created-job-order",
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
          href: "/",
        },
      ],
    },
  ] as const;
