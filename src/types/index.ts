<<<<<<< HEAD
import type { StyleProp, ViewStyle } from "react-native";
=======
import type { DocumentPickerAsset } from "expo-document-picker";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface TableHeader {
  title: string;
  style?: StyleProp<ViewStyle>;
<<<<<<< HEAD
=======
  cellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
  numeric?: boolean;
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
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
<<<<<<< HEAD
=======

export type File = Omit<DocumentPickerAsset, "file" | "base64">;
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
