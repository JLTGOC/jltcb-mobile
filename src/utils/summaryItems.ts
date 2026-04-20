import type { SummaryCardData, SummaryItem } from "@/src/types/job-order";

export function buildSummaryItems(
  summaryCardsData: SummaryCardData[],
): SummaryItem[] {
  return [
    { type: "subject", key: "subject" },
    ...summaryCardsData.map(
      (item, index): SummaryItem => ({
        type: "summary",
        key: `summary-${index}-${item.title}`,
        item,
      }),
    ),
  ];
}
