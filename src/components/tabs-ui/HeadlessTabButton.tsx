import { THEME } from "@/src/constants/theme";
import type { TabTriggerSlotProps } from "expo-router/ui";
import type { PropsWithChildren, ReactNode, Ref } from "react";
import {
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  Text,
  type TextStyle,
  type View,
  type ViewStyle,
} from "react-native";

type HeadlessTabButtonProps = {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  showOutline?: boolean;
  tabBarIcon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => ReactNode;
  tabBarInactiveColor?: string;
  tabBarActiveColor?: string;
  ref?: Ref<View>;
};

export default function HeadlessTabButton({
  label,
  labelStyle,
  isFocused,
  showOutline = false,
  tabBarIcon,
  tabBarActiveColor = THEME.tabBarActiveColor,
  tabBarInactiveColor = THEME.tabBarInactiveColor,
  style,
  ref,
  ...props
}: HeadlessTabButtonProps & PropsWithChildren & TabTriggerSlotProps) {
  const baseStyle: ViewStyle = {
    flex: 0,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  };

  const pressableStyle = (
    state: PressableStateCallbackType,
  ): StyleProp<ViewStyle> => {
    const interactionStyle: ViewStyle = {
      opacity: state.pressed ? 0.7 : 1, // Reduces opacity to 50% when clicked
      borderBottomColor:
        isFocused && showOutline ? tabBarActiveColor : "transparent",
    };

    const resolvedUserStyle =
      typeof style === "function" ? style(state) : style;

    return [baseStyle, interactionStyle, resolvedUserStyle];
  };

  return (
    <Pressable ref={ref} {...props} style={pressableStyle}>
      {tabBarIcon?.({
        color: isFocused ? tabBarActiveColor : tabBarInactiveColor,
        size: 24,
        focused: isFocused ?? false,
      })}
      {label && (
        <Text
          style={[
            {
              fontWeight: 600,
              color: isFocused ? tabBarActiveColor : tabBarInactiveColor,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
