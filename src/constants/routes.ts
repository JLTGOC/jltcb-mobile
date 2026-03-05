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
  CLIENT_QUOTE_DETAILS: "/(client)/(tabs)/dashboard/quotations/[id]",
  CLIENT_QUOTATION_VIEWER: "/(client)/(tabs)/dashboard/quotations/viewer",
  CLIENT_SHIPMENT_DETAILS: "/(client)/(tabs)/dashboard/shipment/[id]/index",
  CLIENT_MESSAGES: "/(client)/(tabs)/messages",
  AS_DB: "/(employee-account-specialist)/(tabs)/dashboard",
  AS_QUOTE_REQUESTS:
    "/(employee-account-specialist)/(tabs)/dashboard/request-quotation",
  AS_QUOTE_RESPONDED:
    "/(employee-account-specialist)/(tabs)/dashboard/responded-quotation",
  AS_AHTN: "/(employee-account-specialist)/(tabs)/ahtn-checker",
  ACCOUNT_SETTINGS: "/account-settings",
  MARKETING_DB: "/(employee-marketing)/dashboard",
  UNAUTHORIZED: "/(pages)/Unauthorized",
  UNDERCONSTRUCTION: "/UnderConstruction",
} as const satisfies Record<string, Href>;
