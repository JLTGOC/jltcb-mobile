import { fetchQuotation } from "@/src/api/quotations";
import { quotationKeys } from "@/src/query-key-factories/quotations";
import { queryOptions } from "@tanstack/react-query";
import { Building, Package } from "lucide-react-native";

export const quotationQueryOptions = (quotationId: string) =>
  queryOptions({
    queryKey: quotationKeys.getQuotation(quotationId),
    queryFn: () => fetchQuotation(quotationId),
    select: (quotation) => {
      const consigneeDetails = {
        icon: Building,
        title: "Consignee Details",
        details: Object.entries(quotation.data.company).map(([key, value]) => [
          key.replace(/_/g, " "),
          value,
        ]),
      };

      const shipmentDetails = {
        icon: Package,
        title: "Shipment Details",
        details: [
          ...Object.entries(quotation.data.service).map(([key, value]) => [
            key.replace(/_/g, " "),
            value,
          ]),
          ["Commodity", quotation.data.commodity.commodity],
          [
            "Volume (Dimension)",
            `${quotation.data.commodity.cargo_type} ${quotation.data.commodity.container_size}`,
          ],
          ...Object.entries(quotation.data.shipment).map(([key, value]) => [
            key.replace(/_/g, " "),
            value,
          ]),
        ],
      };

      const personInCharge = {
        icon: Package,
        title: "Person in Charge",
        details: [["Account Specialist", quotation.data.account_specialist]],
      };

      return {
        sections: [consigneeDetails, shipmentDetails, personInCharge],
        documents: Array.isArray(quotation.data.documents)
          ? quotation.data.documents
          : [],
      };
    },
  });
