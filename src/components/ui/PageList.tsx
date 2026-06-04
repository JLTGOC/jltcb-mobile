import { FlatList, type FlatListProps, StyleSheet } from "react-native";

import { THEMES } from "@/constants/themes";

export default function PageList<T>({
  style,
  contentContainerStyle,
  ...props
}: FlatListProps<T>) {
  return (
    <FlatList
      style={[styles.list, style]}
      contentContainerStyle={[
        styles.listContentContainer,
        contentContainerStyle,
      ]}
      ListHeaderComponentStyle={styles.listHeader}
      keyboardShouldPersistTaps="handled"
      overScrollMode="never"
      bounces={false}
      stickyHeaderIndices={[0]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: THEMES.pageBackgroundColor,
  },
  listContentContainer: {
    paddingBottom: 20,
    backgroundColor: THEMES.pageBackgroundColor,
    flexGrow: 1,
  },
  listHeader: {
    backgroundColor: THEMES.pageBackgroundColor,
  },
});
