import { THEMES } from "@/src/constants/themes";
import type { TabTriggerSlotProps } from "expo-router/ui";
import type { ReactNode } from "react";
import { Pressable, Text } from "react-native";

type Props = {
  icon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => ReactNode;
};

export default function TabButton({
  icon,
  children,
  isFocused,
  ...props
}: Props & TabTriggerSlotProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      {...props}
    >
      {icon?.({
        focused: !!isFocused,
        color: isFocused
          ? THEMES.tabBarActiveTintColor
          : THEMES.tabBarInactiveTintColor,
        size: 24,
      })}
      {children && <Text>{children}</Text>}
    </Pressable>
  );
}
