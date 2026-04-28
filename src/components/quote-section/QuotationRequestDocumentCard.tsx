import { format } from "date-fns";
import * as Print from "expo-print";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Menu,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import type { Document } from "@/src/types/quotations";
import { handleFileOpen } from "@/src/utils/handleFileOpen";

interface QuotationRequestDocumentCardProps {
  document: Partial<Document> & { file_name: string; file_url?: string };
  showRemoveButton?: boolean;
  onRemove?: () => void;
  onViewPress?: (url?: string) => void | Promise<void>;
  onRename?: (newFileName: string) => void | Promise<unknown>;
}

interface RenameDialogState {
  fileName: string;
  error: string | null;
  isLoading: boolean;
}

const INITIAL_RENAME_STATE: RenameDialogState = {
  fileName: "",
  error: null,
  isLoading: false,
};

export default function QuotationRequestDocumentCard({
  document,
  showRemoveButton,
  onRemove,
  onViewPress,
  onRename,
}: QuotationRequestDocumentCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [renameState, setRenameState] =
    useState<RenameDialogState>(INITIAL_RENAME_STATE);

  const closeRenameDialog = () => {
    setRenameVisible(false);
    setRenameState(INITIAL_RENAME_STATE);
  };

  const handleViewPress = async () => {
    setMenuVisible(false);
    await (onViewPress
      ? onViewPress(document.file_url)
      : handleFileOpen(document.file_url));
  };

  const handlePrintPress = async () => {
    setMenuVisible(false);
    try {
      await Print.printAsync({ uri: document.file_url });
    } catch (error) {
      console.error("Print error:", error);
    }
  };

  const openRenameDialog = () => {
    setMenuVisible(false);
    setRenameState(INITIAL_RENAME_STATE);
    setRenameVisible(true);
  };

  const handleRenameConfirm = async () => {
    const trimmedFileName = renameState.fileName.trim();

    if (!trimmedFileName) {
      setRenameState((prev) => ({ ...prev, error: "File name is required." }));
      return;
    }

    if (!onRename) {
      closeRenameDialog();
      return;
    }

    setRenameState((prev) => ({ ...prev, isLoading: true }));

    try {
      await onRename(trimmedFileName);
      closeRenameDialog();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to rename file.";
      setRenameState((prev) => ({ ...prev, error: message, isLoading: false }));
    }
  };

  const menuItems = [
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
    { leadingIcon: "pencil", title: "Rename", onPress: openRenameDialog },
  ];

  const date = document.updated_at ?? document.created_at;

  const formattedDate = date ? format(date, "PPP") : null;

  return (
    <View style={styles.container}>
      {/* <View style={styles.icon} /> */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{document.file_name}</Text>
        {formattedDate && <Text style={styles.subtitle}>{formattedDate}</Text>}
      </View>

      {showRemoveButton ? (
        <IconButton icon="close" size={20} onPress={onRemove} />
      ) : (
        <Menu
          anchor={
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={() => setMenuVisible(true)}
            />
          }
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchorPosition="bottom"
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.title}
              title={item.title}
              onPress={item.onPress}
              leadingIcon={item.leadingIcon}
              disabled={item.disabled}
              dense
            />
          ))}
        </Menu>
      )}

      <Portal>
        <Dialog
          visible={renameVisible}
          onDismiss={renameState.isLoading ? undefined : closeRenameDialog}
        >
          <Dialog.Title>Rename File</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label={document.file_name}
              value={renameState.fileName}
              onChangeText={(text) =>
                setRenameState((prev) => ({
                  ...prev,
                  fileName: text,
                  error: null,
                }))
              }
              autoCapitalize="none"
              autoCorrect={false}
              error={!!renameState.error}
              disabled={renameState.isLoading}
            />
            {renameState.error ? (
              <Text style={styles.renameErrorText}>{renameState.error}</Text>
            ) : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={closeRenameDialog}
              disabled={renameState.isLoading}
            >
              Cancel
            </Button>
            <Button
              onPress={handleRenameConfirm}
              loading={renameState.isLoading}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 16,
    borderRadius: 5,
    paddingVertical: 4,
  },
  icon: { width: 50 },
  textContainer: { flex: 1 },
  title: { color: "black" },
  subtitle: { color: "#767676", fontSize: 12 },
  renameErrorText: {
    marginTop: 8,
    color: "#B00020",
  },
});
