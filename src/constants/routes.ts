import type { Href } from "expo-router";

export const routes = {
  HOME: "/(pages)/home",
  ABOUT: "/(pages)/about-us",
  CONTACT: "/(pages)/contact-us",
  SERVICES: "/(pages)/services",
  PORTS: "/(pages)/ports-catered",
  QUOTE: "/(pages)/get-quote",
  APPOINTMENT: "/(pages)/get-appointment",
  AHTN: "/(pages)/ahtn-checker",
  LANDING_PAGE: "/(pages)/landing-page",
  LANDING_PAGE2: "/(pages)/landing-page/customs-brokerage",
  CAREERS: "/(pages)/careers",
  SIGN_IN: "/(pages)/sign-in",
  CLIENT: "/(client)/(tabs)/dashboard",
  CLIENT_AHTN: "/(client)/(tabs)/ahtn-checker",
  CLIENT_CREATE_QUOTE: "/(client)/(tabs)/get-quote",
  CLIENT_QUOTE_DETAILS: "/(client)/(tabs)/dashboard/quotations/[id]",
  CLIENT_REQ_QUOTE_RECORDS: "/(client)/(tabs)/dashboard/requested-quotes",
  CLIENT_RES_QUOTE_RECORDS: "/(client)/(tabs)/dashboard/responded-quotes",
  CLIENT_MESSAGES: "/(client)/(tabs)/messages",
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
  UNAUTHORIZED: "/(pages)/Unauthorized",
  UNDERCONSTRUCTION: "/UnderConstruction",
} as const satisfies Record<string, Href>;
