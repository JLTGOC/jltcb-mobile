import { useLocalSearchParams } from "expo-router";

import AcceptedQuotations from "@/components/as-quotation/AcceptedQuotations";
import ClientRequestedQuotations from "@/components/as-quotation/ClientRequestedQuotations";
import RequestedQuotations from "@/components/as-quotation/RequestedQuotations";
import RespondedQuotations from "@/components/as-quotation/RespondedQuotations";

import type { QuotationStatus } from "@/types/quotations";

export default function Quotations() {
  const { status = "requested", clientId } = useLocalSearchParams<{
    status?: Lowercase<QuotationStatus>;
    clientId?: string;
  }>();

  if (status === "requested") {
    if (clientId) return <ClientRequestedQuotations />;
    return <RequestedQuotations />;
  }

  if (status === "responded") return <RespondedQuotations />;
  if (status === "accepted") return <AcceptedQuotations />;

  // TODO: Implement discarded quotations screen
  // if (status === "discarded") return <DiscardedQuotations />;
}
