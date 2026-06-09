import Box from "@material-symbols/svg-500/outlined/box.svg";
import CorporateFare from "@material-symbols/svg-500/outlined/corporate_fare.svg";
import { useQuery } from "@tanstack/react-query";

import { quotationQueries } from "@/queries/quotations";
import type { ApiResponse } from "@/types/api";
import type { Quotation } from "@/types/quotations";

const selectQuotationData = ({ data }: ApiResponse<Quotation>) => {
  const {
    company,
    service,
    commodity,
    shipment,
    account_specialist,
    remarks,
    regulatory_service,
  } = data;

  const shipmentSection = regulatory_service
    ? []
    : [
        {
          icon: Box,
          title: "Shipment Details",
          details: [
            ["Service Type", service.type],
            ["Freight Transport Mode", service.transport_mode],
            ["Service", service.options.join(", ")],
            ["Commodity", commodity.commodity],
            [
              "Volume (Dimension)",
              `${commodity.cargo_type} ${commodity.container_size ?? ""}`,
            ],
            ...Object.entries(shipment).map(([key, value]) => [
              key.replace(/_/g, " "),
              value,
            ]),
            ["Details", remarks ?? ""],
          ],
        },
      ];

  return {
    sections: [
      {
        icon: CorporateFare,
        title: "Consignee Details",
        details: [
          ["Company Name", company.name],
          ["Company Address", company.address],
          ["Contact Person", company.contact_person],
          ["Contact Number", company.contact_number],
          ["Email", company.email],
        ],
      },
      ...shipmentSection,
      {
        icon: Box,
        title: "Person in Charge",
        details: [["Account Specialist", account_specialist]],
      },
    ],
  };
};

export type SelectedQuotationData = ReturnType<typeof selectQuotationData>;

export function useQuotationDetailQuery(id: number) {
  return useQuery({
    ...quotationQueries.detail(id),
    select: selectQuotationData,
  });
}
