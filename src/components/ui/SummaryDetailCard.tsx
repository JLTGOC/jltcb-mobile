import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function SummaryDetailCardRoot({
  style,
  ...props
}: React.ComponentProps<typeof View>) {
  return <View style={[styles.card, style]} {...props} />;
}

function SummaryDetailCardHeader({
  style,
  ...props
}: React.ComponentProps<typeof View>) {
  return <View style={[styles.cardHeader, style]} {...props} />;
}

function SummaryDetailCardTitle({
  style,
  ...props
}: React.ComponentProps<typeof Text>) {
  return <Text style={[styles.cardTitle, style]} {...props} />;
}

function SummaryDetailCardDescription({
  style,
  ...props
}: React.ComponentProps<typeof Text>) {
  return <Text style={[styles.cardDescription, style]} {...props} />;
}

function SummaryDetailCardContent({
  style,
  ...props
}: React.ComponentProps<typeof View>) {
  return <View style={[styles.cardContent, style]} {...props} />;
}

function SummaryDetailCardFooter({
  style,
  ...props
}: React.ComponentProps<typeof View>) {
  return <View style={[styles.cardFooter, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#BEBEBE",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "column",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#BEBEBE",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 12,
    color: "#4E6174",
  },
  cardDescription: {
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
    flexDirection: "column",
    gap: 8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
});

export const SummaryDetailCard = {
  Root: SummaryDetailCardRoot,
  Content: SummaryDetailCardContent,
  Description: SummaryDetailCardDescription,
  Footer: SummaryDetailCardFooter,
  Header: SummaryDetailCardHeader,
  Title: SummaryDetailCardTitle,
};
