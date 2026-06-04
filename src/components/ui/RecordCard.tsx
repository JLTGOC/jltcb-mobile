import { Children, type ReactNode } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import { Button, type ButtonProps } from "react-native-paper";

import ArrowLine from "@/components/ui/ArrowLine";
import { Card } from "@/components/ui/Card";

export interface RecordCardDetailProps extends Omit<ViewProps, "children"> {
  label: ReactNode;
  value: ReactNode;
}

function RecordCardDetail({
  label,
  value,
  style,
  ...props
}: RecordCardDetailProps) {
  return (
    <View style={[styles.detail, style]} {...props}>
      {label}
      <ArrowLine style={[styles.detailArrow, styles.flex]} />
      {value}
    </View>
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
  Detail: RecordCardDetail,
  Footer: RecordCardFooter,
  FooterButton: RecordCardFooterButton,
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
