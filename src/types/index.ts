import type { DocumentPickerAsset } from "expo-document-picker";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface TableHeader {
  title: string;
  style?: StyleProp<ViewStyle>;
  cellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
  numeric?: boolean;
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

export type File = Omit<DocumentPickerAsset, "file" | "base64">;
