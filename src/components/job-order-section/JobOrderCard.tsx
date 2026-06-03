import { createContext, type PropsWithChildren, use } from "react";
import {
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewProps,
} from "react-native";
import {
  Button,
  type ButtonProps,
  Text,
  type TextProps,
} from "react-native-paper";

import ArrowLine from "@/components/job-order-section/ArrowLine";
import type { JobOrderSummary } from "@/types/job-order";

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

function JobOrderCardRoot({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

function JobOrderCardHeader({ style, ...props }: ViewProps) {
  return <View style={[styles.cardHeader, style]} {...props} />;
}

function JobOrderCardHeaderTitle() {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();

  return (
    <View style={styles.cardTitleContainer}>
      <Text style={[styles.cardTitleHeader, styles.uppercase]}>
        Reference No
      </Text>
      <Text style={[styles.cardTitle, styles.uppercase]}>
        {jobOrder.reference_number}
      </Text>
    </View>
  );
}

const BADGE_COLORS: Record<string, string> = {
  "Regulatory Services": "#767676",
  "Logistics Services": "#4E6174",
};

function JobOrderCardBadge() {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();
  const jobOrderService = jobOrder.service;

  return (
    <Text
      style={[
        styles.cardBadge,
        { backgroundColor: BADGE_COLORS[jobOrderService] ?? "#E0E0E0" },
      ]}
    >
      {jobOrderService}
    </Text>
  );
}

function JobOrderCardContent({ style, ...props }: ViewProps) {
  return <View style={[styles.cardContent, style]} {...props} />;
}

function JobOrderCardContentTitle({
  style,
  ...props
}: Omit<TextProps<string>, "children">) {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();

  return (
    <Text style={[styles.cardContentTitle, styles.uppercase, style]} {...props}>
      {jobOrder.client}
    </Text>
  );
}

function JobOrderCardDetailRow({
  label,
  valueKey,
  valueStyle,
}: {
  label: string;
  valueKey: keyof JobOrderSummary;
  valueStyle?: StyleProp<TextStyle>;
}) {
  const {
    state: { jobOrder },
  } = useJobOrderCardContext();

  return (
    <View style={styles.contentDetailRow}>
      <Text
        variant="labelSmall"
        style={[styles.cardContentDesc, styles.uppercase, styles.column]}
      >
        {label}
      </Text>
      <ArrowLine style={styles.arrow} />
      <Text
        variant="labelSmall"
        style={[
          styles.cardContentDesc,
          styles.uppercase,
          styles.column,
          valueStyle,
        ]}
      >
        {jobOrder[valueKey]}
      </Text>
    </View>
  );
}

function JobOrderCardFooter({ style, ...props }: ViewProps) {
  return <View style={[styles.cardFooter, style]} {...props} />;
}

function JobOrderCardAction({
  first,
  style,
  labelStyle,
  ...props
}: ButtonProps & { first?: boolean }) {
  return (
    <Button
      labelStyle={[styles.uppercase, styles.cardFooterButtonLabel, labelStyle]}
      style={[
        styles.cardFooterButton,
        !first && { borderLeftWidth: 2, borderColor: "#F5F5F5" },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowRadius: 7,
    shadowOpacity: 0.25,
    boxShadow: "0 0 7px 0 rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    paddingTop: 12,
    backgroundColor: "white",
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: "#F5F5F5",
    paddingBottom: 8,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitleHeader: {
    color: "#666666",
    fontSize: 12,
  },
  cardTitle: {},
  cardBadge: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 15,
    color: "white",
    fontSize: 12,
  },
  cardContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  contentDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },
  column: {
    flex: 2,
  },
  arrow: {
    flex: 1,
    marginRight: 4,
  },
  cardContentTitle: {},
  cardContentDesc: {
    fontSize: 12,
    color: "#9D9D9D",
  },
  cardFooter: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderColor: "#F5F5F5",
  },
  cardFooterButton: {
    flex: 1,
    borderRadius: 0,
  },
  cardFooterButtonLabel: {
    paddingVertical: 4,
    color: "#898989",
    fontSize: 12,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  divider: {
    height: 3,
    backgroundColor: "#F5F5F5",
  },
});

export const JobOrderCard = {
  Provider: JobOrderCardProvider,
  Root: JobOrderCardRoot,
  Header: JobOrderCardHeader,
  HeaderTitle: JobOrderCardHeaderTitle,
  Badge: JobOrderCardBadge,
  Content: JobOrderCardContent,
  ContentTitle: JobOrderCardContentTitle,
  DetailRow: JobOrderCardDetailRow,
  Footer: JobOrderCardFooter,
  Action: JobOrderCardAction,
};
