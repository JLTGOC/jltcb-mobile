import { createContext, type PropsWithChildren, use } from "react";
import { StyleSheet } from "react-native";
import { Text, type TextProps } from "react-native-paper";

import Badge from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  RecordCard,
  type RecordCardDetailProps,
} from "@/components/ui/RecordCard";

import type { JobOrderSummary, JobTypeSummary } from "@/types/job-order";

interface JobOrderState {
  jobOrder: JobOrderSummary;
}

interface JobOrderCardContextValue {
  state: JobOrderState;
}

const JobOrderCardContext = createContext<JobOrderCardContextValue | null>(
  null,
);

function useJobOrderCardContext() {
  const context = use(JobOrderCardContext);
  if (!context) {
    throw new Error(
      "JobOrderCard compound components cannot be rendered outside the JobOrderCard component",
    );
  }
  return context;
}

function JobOrderCardProvider({
  children,
  jobOrder,
}: PropsWithChildren<JobOrderState>) {
  return (
    <JobOrderCardContext value={{ state: { jobOrder } }}>
      {children}
    </JobOrderCardContext>
  );
}

function JobOrderCardTitle() {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();

  return (
    <Card.Title>
      <Text style={[styles.cardTitleHeader, styles.uppercase]}>
        Reference No
      </Text>
      <Text style={[styles.cardTitle, styles.uppercase]}>
        {jobOrder.reference_number}
      </Text>
    </Card.Title>
  );
}

const BADGE_COLORS: Record<JobTypeSummary, string> = {
  "Regulatory Services": "#767676",
  "Logistics Services": "#4E6174",
} as const;

function JobOrderCardBadge() {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();
  const jobOrderService = jobOrder.service;

  return (
    <Badge style={{ backgroundColor: BADGE_COLORS[jobOrderService] }}>
      <Text style={styles.cardBadgeText}>{jobOrderService}</Text>
    </Badge>
  );
}

function JobOrderCardContentTitle({
  style,
  ...props
}: Omit<TextProps<never>, "children">) {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();

  return (
    <Text style={[styles.cardContentTitle, styles.uppercase, style]} {...props}>
      {jobOrder.client}
    </Text>
  );
}

function JobOrderCardDetail({ label, value, ...props }: RecordCardDetailProps) {
  return <RecordCard.Detail label={label} value={value} {...props} />;
}

function JobOrderCardDetailLabel({ style, ...props }: TextProps<never>) {
  return (
    <Text
      variant="labelSmall"
      style={[styles.cardContentDesc, styles.uppercase, styles.column, style]}
      {...props}
    />
  );
}

interface JobOrderCardDetailValueProps extends Omit<
  TextProps<never>,
  "children"
> {
  valueKey: keyof JobOrderSummary;
}

function JobOrderCardDetailValue({
  valueKey,
  style,
  ...props
}: JobOrderCardDetailValueProps) {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();

  return (
    <Text
      variant="labelSmall"
      style={[styles.cardContentDesc, styles.uppercase, styles.column, style]}
      {...props}
    >
      {jobOrder[valueKey]}
    </Text>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 2,
  },
  uppercase: {
    textTransform: "uppercase",
  },

  cardTitleHeader: {
    color: "#666666",
    fontSize: 12,
  },
  cardTitle: {},
  cardBadgeText: {
    color: "white",
    fontSize: 12,
  },
  cardContentTitle: {},
  cardContentDesc: {
    fontSize: 12,
    color: "#9D9D9D",
  },
});

export const JobOrderCard = {
  Provider: JobOrderCardProvider,
  Title: JobOrderCardTitle,
  Badge: JobOrderCardBadge,
  ContentTitle: JobOrderCardContentTitle,
  Detail: JobOrderCardDetail,
  DetailLabel: JobOrderCardDetailLabel,
  DetailValue: JobOrderCardDetailValue,
};
