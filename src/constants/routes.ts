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
  CLIENT_DB: "/(client)/dashboard",
  CLIENT_CREATE_QUOTE: "/(client)/create-quote-request-form",
  CLIENT_QUOTE_EDIT: "/(client)/update-quote-request",
  CLIENT_QUOTE_DETAILS: "/(client)/QuoteDetails",
  CLIENT_REQ_QUOTE_RECORDS: "/(client)/requested-quote",
  CLIENT_QUOTE_RECORD: "/(client)/QuoteDetails",
  CLIENT_RES_QUOTE_RECORDS: "/(client)/responded-quote",
  AS_DB: "/(employee-account-specialist)/dashboard",
  AS_QUOTE_REQUESTS: "/(employee-account-specialist)/quotations/new-request",
  AS_QUOTE_REQUEST_LIST:
    "/(employee-account-specialist)/quotations/new-request/request-list",
  AS_QUOTE_REQUEST:
    "/(employee-account-specialist)/quotations/new-request/[id]" as Href,
  AS_QUOTE_REQUEST_UPLOAD:
    "/(employee-account-specialist)/quotations/new-request/[id]/upload",
  AS_QUOTE_RESPONDED:
    "/(employee-account-specialist)/quotations/responded" as Href,
  MARKETING_DB: "/(employee-marketing)/dashboard",
  CHATBOX: "/(client)/chatbox",
  UNAUTHORIZED: "/(pages)/Unauthorized",
} as const satisfies Record<string, Href>;
