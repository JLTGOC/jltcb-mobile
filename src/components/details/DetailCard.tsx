import { StyleSheet, View, type ViewProps } from "react-native";
import {
  Card,
  Text,
  type CardContentProps,
  type CardProps,
  type CardTitleProps,
  type TextProps,
} from "react-native-paper";

import type { QuotationDetailsSection } from "@/types/quotations";

function DetailCardRoot({ ...props }: Omit<CardProps, "mode" | "elevation">) {
  return <Card mode="contained" style={styles.card} {...props} />;
}

interface DetailCardTitleProps extends CardTitleProps {
  icon: QuotationDetailsSection["icon"];
}

function DetailCardTitle({
  icon: Icon,
  style,
  titleStyle,
  leftStyle,
  ...props
}: DetailCardTitleProps) {
  return (
    <Card.Title
      style={[styles.title, style]}
      titleVariant="titleMedium"
      titleStyle={[
        { textTransform: "uppercase", textAlignVertical: "center" },
        titleStyle,
      ]}
      left={() => <Icon height={20} width={20} />}
      leftStyle={[
        {
          aspectRatio: 1,
          alignItems: "center",
          width: 20,
        },
        leftStyle,
      ]}
      {...props}
    />
  );
}

function DetailCardContent({ style, ...props }: CardContentProps) {
  return <Card.Content style={[styles.content, style]} {...props} />;
}

function DetailCardDetail({ style, ...props }: ViewProps) {
  return <View style={[styles.detail, style]} {...props} />;
}

function DetailCardLabel({ style, ...props }: TextProps<never>) {
  return <Text style={[styles.label, styles.text, style]} {...props} />;
}

function DetailCardValue({ style, ...props }: TextProps<never>) {
  return <Text style={[styles.value, styles.text, style]} {...props} />;
}

export const DetailCard = {
  Root: DetailCardRoot,
  Title: DetailCardTitle,
  Content: DetailCardContent,
  Detail: DetailCardDetail,
  Label: DetailCardLabel,
  Value: DetailCardValue,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: "white",
  },
  title: {
    minHeight: "auto",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: "#F5F5F5",
  },
  content: {
    gap: 7,
    paddingTop: 8,
    paddingBottom: 10,
  },
  detail: {
    flexDirection: "row",
    gap: 2,
  },
  label: {
    width: "35%",
    color: "#9D9D9D",
  },
  value: {
    flex: 1,
  },
  text: {
    textTransform: "uppercase",
  },
});
