import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { Text } from "react-native-paper";

import { SummaryDetailCard } from "@/components/ui/SummaryDetailCard";

import type { SummaryCardData } from "@/types/job-order";

interface SummaryCardProps {
  item: SummaryCardData;
  style?: StyleProp<ViewStyle>;
}

export default function SummaryCard({ item, style }: SummaryCardProps) {
  return (
    <SummaryDetailCard.Root style={style}>
      <SummaryDetailCard.Header>
        {item.renderIcon()}
        <SummaryDetailCard.Title variant="labelSmall" style={styles.upper}>
          {item.title}
        </SummaryDetailCard.Title>
      </SummaryDetailCard.Header>
      <SummaryDetailCard.Content>
        {item.content.map((contentItem) => (
          <View
            key={`${item.title}-${contentItem.label}`}
            style={{ flexDirection: "row", gap: 4 }}
          >
            <Text
              variant="bodySmall"
              style={[styles.contentLabel, styles.flexLabel]}
            >
              {contentItem.label}
            </Text>
            <Text variant="bodySmall" style={styles.flexContent}>
              {contentItem.value}
            </Text>
          </View>
        ))}
      </SummaryDetailCard.Content>
    </SummaryDetailCard.Root>
  );
}

const styles = StyleSheet.create({
  upper: { textTransform: "uppercase" },
  contentLabel: { color: "#979797" },
  flexLabel: { width: "40%" },
  flexContent: { flex: 1 },
  row: { flexDirection: "row", gap: 4, marginBottom: 4 },
});
