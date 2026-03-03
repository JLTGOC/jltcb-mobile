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
  CLIENT_DB: "/(client)/dashboard",
  CLIENT_CREATE_QUOTE: "/(client)/quotations" as Href,
  CLIENT_QUOTE_DETAILS: "/(client)/quotations/[id]",
  CLIENT_REQ_QUOTE_RECORDS: "/(client)/quotations/RequestedQuotes",
  CLIENT_RES_QUOTE_RECORDS: "/(client)/quotations/RespondedQuotes",
  AS_DB: "/(employee-account-specialist)/dashboard",
  AS_QUOTE_REQUESTS: "/(employee-account-specialist)/quotations/new-request",
  AS_QUOTE_REQUEST_LIST:
    "/(employee-account-specialist)/quotations/new-request/request-list",
  AS_QUOTE_REQUEST:
    "/(employee-account-specialist)/quotations/new-request/[id]",
  AS_QUOTE_REQUEST_UPLOAD:
    "/(employee-account-specialist)/quotations/new-request/[id]/upload",
  AS_QUOTE_RESPONDED:
    "/(employee-account-specialist)/quotations/responded" as Href,
  MARKETING_DB: "/(employee-marketing)/dashboard",
  CHATBOX: "/(client)/chatbox",
  UNAUTHORIZED: "/(pages)/Unauthorized",
  UNDERCONSTRUCTION: "/UnderConstruction",
} as const satisfies Record<string, Href>;
