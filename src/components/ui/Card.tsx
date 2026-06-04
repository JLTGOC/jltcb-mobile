import { StyleSheet, View, type ViewProps } from "react-native";

function CardRoot({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

function CardHeader({ style, ...props }: ViewProps) {
  return <View style={[styles.cardHeader, style]} {...props} />;
}

function CardTitle({ style, ...props }: ViewProps) {
  return <View style={[styles.cardTitle, style]} {...props} />;
}

function CardAction({ style, ...props }: ViewProps) {
  return <View style={[styles.cardAction, style]} {...props} />;
}

function CardContent({ style, ...props }: ViewProps) {
  return <View style={[styles.cardContent, style]} {...props} />;
}

function CardFooter({ style, ...props }: ViewProps) {
  return <View style={[styles.cardFooter, style]} {...props} />;
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
  cardTitle: {
    flex: 1,
  },
  cardAction: {},
  cardContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  cardFooter: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderColor: "#F5F5F5",
    alignItems: "center",
  },
});

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
};
