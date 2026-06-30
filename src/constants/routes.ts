import type { Href } from "expo-router";

export const routes = {
  HOME: "/home",
  GUEST_HOME: "/(guest)/(tabs)/home",
  ABOUT_US: "/about-us",
  CONTACT_US: "/contact-us",
  SERVICES: "/services",
  PORTS_CATERED: "/ports-catered",
  GET_QUOTE: "/get-quote",
  GET_APPOINTMENT: "/get-appointment",
  AHTN_CHECKER: "/ahtn-checker",
  LANDING_PAGE: "/landing-page",
  CUSTOMS_BROKERAGE_LANDING: "/landing-page/customs-brokerage",
  CAREERS: "/home/careers",
  LOG_IN: "/login",
  CLIENT_DB: "/(client)/(tabs)/dashboard",
  CLIENT_AHTN: "/(client)/(tabs)/ahtn-checker",
  CLIENT_CREATE_QUOTE: "/(client)/(tabs)/get-quote",
<<<<<<< HEAD
  CLIENT_QUOTE_DETAILS: "/(client)/(tabs)/dashboard/quotations/[id]",
  CLIENT_QUOTATION_VIEWER: "/(client)/(tabs)/dashboard/quotations/viewer",
  CLIENT_SHIPMENT_DETAILS: "/(client)/(tabs)/dashboard/shipment/[id]" as Href,
=======
  CLIENT_SHIPMENT_DETAILS: "/(client)/(tabs)/dashboard/shipment/[id]",
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  CLIENT_MESSAGES: "/(client)/(tabs)/messages",
  AS_DB: "/",
  AS_QUOTE_REQUESTS: "/quotations?status=requested",
  AS_QUOTE_RESPONDED: "/quotations?status=responded",
  AS_AHTN: "/(employee-account-specialist)/(tabs)/ahtn-checker",
<<<<<<< HEAD
  OPERATIONS_DB: "/(employee-operations)/(tabs)/dashboard",
=======
  OPERATIONS_DB: "/",
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  FINANCE_DB: "/(employee-finance)/(tabs)/dashboard",
  ACCOUNT_SETTINGS: "/account-settings",
  MARKETING_DB: "/(employee-marketing)/dashboard",
  UNDERCONSTRUCTION: "/UnderConstruction",
} as const satisfies Record<string, Href>;
