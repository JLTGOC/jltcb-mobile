import { Children, type ReactNode } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import {
  Button,
  Text,
  type ButtonProps,
  type TextProps,
} from "react-native-paper";

import ArrowLine from "@/components/ui/ArrowLine";
import { Card } from "@/components/ui/Card";

function RecordCardDetails({ style, ...props }: ViewProps) {
  return <View style={[styles.detailsContainer, style]} {...props} />;
}

export interface RecordCardDetailRowProps extends Omit<ViewProps, "children"> {
  label: ReactNode;
  value: ReactNode;
}

function RecordCardDetail({
  label,
  value,
  style,
  ...props
}: RecordCardDetailRowProps) {
  return (
    <View style={[styles.detail, style]} {...props}>
      <View style={styles.column}>{label}</View>
      <ArrowLine style={[styles.detailArrow, styles.flex]} />
      <View style={styles.column}>{value}</View>
    </View>
  );
}

function RecordCardDetailText({ style, ...props }: TextProps<never>) {
  return (
    <Text
      variant="labelSmall"
      style={[styles.detailText, styles.uppercase, style]}
      {...props}
    />
  );
}

function RecordCardFooter({ style, children, ...props }: ViewProps) {
  const childrenArray = Children.toArray(children);

  return (
    <Card.Footer style={style} {...props}>
      {childrenArray.map((child, index) => (
        <View
          key={index}
          style={[
            styles.flex,
            index !== 0 && styles.footerChildContainerBorderLeft,
          ]}
        >
          {child}
        </View>
      ))}
    </Card.Footer>
  );
}

function RecordCardFooterButton({ labelStyle, style, ...props }: ButtonProps) {
  return (
    <Button
      style={[styles.footerButton, style]}
      labelStyle={[styles.footerButtonLabel, labelStyle]}
      {...props}
    />
  );
}

export const RecordCard = {
  Details: RecordCardDetails,
  Detail: RecordCardDetail,
  DetailText: RecordCardDetailText,
  Footer: RecordCardFooter,
  FooterButton: RecordCardFooterButton,
};

const styles = StyleSheet.create({
  column: {
    flex: 2,
    alignItems: "flex-start",
  },
  flex: {
    flex: 1,
  },
  uppercase: {
    textTransform: "uppercase",
  },

  detailsContainer: {
    gap: 4,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },
  detailArrow: {
    marginRight: 4,
  },
  detailText: {
    fontSize: 12,
    color: "#9D9D9D",
  },
  footerChildContainerBorderLeft: {
    borderLeftWidth: 2,
    borderLeftColor: "#F5F5F5",
  },
  footerButton: {
    borderRadius: 0,
  },
  footerButtonLabel: {
    paddingVertical: 4,
    color: "#898989",
    fontSize: 12,
    textTransform: "uppercase",
  },
});
