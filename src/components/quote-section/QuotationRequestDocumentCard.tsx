import type { Document } from "@/src/types/quotations";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Menu, Text } from "react-native-paper";
import { handleFileOpen } from "@/src/utils/handleFileOpen";
import * as Print from "expo-print";

interface QuotationRequestDocumentCardProps {
  document: Partial<Document> & { file_name: string; file_url?: string };
  showRemoveButton?: boolean;
  onRemove?: () => void;
  onViewPress?: (url?: string) => void | Promise<void>;
}

export default function QuotationRequestDocumentCard({
  document,
  showRemoveButton,
  onRemove,
  onViewPress,
}: QuotationRequestDocumentCardProps) {
  const [visible, setVisible] = useState(false);

  const handleViewPress = async () => {
    setVisible(false);

    if (onViewPress) {
      await onViewPress(document.file_url);
      return;
    }

    await handleFileOpen(document.file_url);
  };

  const handlePrintPress = async () => {
    try {
      await Print.printAsync({
        uri: document.file_url,
      });
    } catch (error) {
      console.error("Print error:", error);
    }
    setVisible(false);
  };

  const menus = [
    {
      leadingIcon: "pencil",
      title: "Rename",
      onPress: () => setVisible(false),
    },
    {
      leadingIcon: "eye",
      title: "View",
      onPress: handleViewPress,
      disabled: !document.file_url,
    },
    {
      leadingIcon: "printer",
      title: "Print",
      onPress: handlePrintPress,
      disabled: !document.file_url,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.icon}></View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{document.file_name}</Text>
        {/*<Text>{document.date}</Text>*/}
      </View>
      {showRemoveButton ? (
        <IconButton icon="close" size={20} onPress={onRemove} />
      ) : (
        <Menu
          anchor={
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={() => setVisible(true)}
            />
          }
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchorPosition="bottom"
        >
          {menus.map((menu) => (
            <Menu.Item
              key={menu.title}
              title={menu.title}
              onPress={menu.onPress}
              leadingIcon={menu.leadingIcon}
              disabled={menu.disabled}
            />
          ))}
        </Menu>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: {
    width: 50,
  },
  textContainer: { flex: 1 },
  title: {
    color: "black",
  },
});
