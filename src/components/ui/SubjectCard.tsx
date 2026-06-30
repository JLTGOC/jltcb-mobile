import Article from "@material-symbols/svg-500/outlined/article.svg";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { SummaryDetailCard } from "@/components/ui/SummaryDetailCard";

interface SubjectCardProps {
  subject: string;
  body: string;
}

export default function SubjectCard({ subject, body }: SubjectCardProps) {
  return (
    <SummaryDetailCard.Root>
      <SummaryDetailCard.Header>
        <View style={styles.headerLeft}>
          <Article width={20} height={20} fill="#4E6174" />
          <SummaryDetailCard.Title variant="labelSmall" style={styles.upper}>
            Subject
          </SummaryDetailCard.Title>
        </View>
        <SummaryDetailCard.Title style={styles.flexContent}>
          {subject}
        </SummaryDetailCard.Title>
      </SummaryDetailCard.Header>
      <SummaryDetailCard.Content>
        <Text variant="bodySmall">{body}</Text>
      </SummaryDetailCard.Content>
    </SummaryDetailCard.Root>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "40%",
    alignSelf: "flex-start",
  },
  upper: {
    textTransform: "uppercase",
  },
  flexContent: {
    flex: 1,
  },
});
