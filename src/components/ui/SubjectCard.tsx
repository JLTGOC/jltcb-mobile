import Article from "@material-symbols/svg-500/outlined/article.svg";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/job-order-section/Card";

interface SubjectCardProps {
  subject: string;
  body: string;
}

export default function SubjectCard({ subject, body }: SubjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <View style={styles.headerLeft}>
          <Article width={20} height={20} fill="#4E6174" />
          <CardTitle variant="labelSmall" style={styles.upper}>
            Subject
          </CardTitle>
        </View>
        <CardTitle style={styles.flexContent}>{subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <Text variant="bodySmall">{body}</Text>
      </CardContent>
    </Card>
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
