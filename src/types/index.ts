import type { StyleProp, ViewStyle } from "react-native";
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface TableHeader {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export interface MenuOption {
  title: string;
  icon?: IconSource;
}

export interface SelectOption {
  id: string;
  title: string;
  [key: string]: unknown;
}
