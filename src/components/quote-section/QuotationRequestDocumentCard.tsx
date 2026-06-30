<<<<<<< HEAD
import type { Document } from "@/src/types/quotations";
=======
import { format } from "date-fns";
import * as Print from "expo-print";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
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
<<<<<<< HEAD
import { handleFileOpen } from "@/src/utils/handleFileOpen";
import * as Print from "expo-print";
=======

import type { Document } from "@/types/quotations";
import { handleFileOpen } from "@/utils/handleFileOpen";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

interface QuotationRequestDocumentCardProps {
  document: Partial<Document> & { file_name: string; file_url?: string };
  showRemoveButton?: boolean;
  onRemove?: () => void;
  onViewPress?: (url?: string) => void | Promise<void>;
  onRename?: (newFileName: string) => void | Promise<unknown>;
}

<<<<<<< HEAD
export default function QuotationRequestDocumentCard({
  document,
  showRemoveButton,
  onRemove,
  onViewPress,
  onRename,
}: QuotationRequestDocumentCardProps) {
  const [visible, setVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [renameFileName, setRenameFileName] = useState("");
  const [renameError, setRenameError] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState(false);

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

  const openRenameDialog = () => {
    setVisible(false);
    setRenameError(null);
    setRenameFileName("");
    setRenameVisible(true);
  };

  const handleRenamePress = async () => {
    const trimmedFileName = renameFileName.trim();

    if (!trimmedFileName) {
      setRenameError("File name is required.");
=======
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
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      return;
    }

    if (!onRename) {
<<<<<<< HEAD
      setRenameVisible(false);
      return;
    }

    try {
      setIsRenaming(true);
      await onRename(trimmedFileName);
      setRenameVisible(false);
      setRenameError(null);
      setRenameFileName("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to rename file.";
      setRenameError(message);
    } finally {
      setIsRenaming(false);
    }
  };

  const menus = [
    {
      leadingIcon: "pencil",
      title: "Rename",
      onPress: openRenameDialog,
    },
=======
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
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
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
<<<<<<< HEAD
  ];

  return (
    <View style={styles.container}>
      <View style={styles.icon}></View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{document.file_name}</Text>
        {/*<Text>{document.date}</Text>*/}
      </View>
=======
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

>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      {showRemoveButton ? (
        <IconButton icon="close" size={20} onPress={onRemove} />
      ) : (
        <Menu
          anchor={
            <IconButton
              icon="dots-vertical"
              size={20}
<<<<<<< HEAD
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
=======
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
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
            />
          ))}
        </Menu>
      )}

      <Portal>
        <Dialog
          visible={renameVisible}
<<<<<<< HEAD
          onDismiss={() => {
            if (!isRenaming) {
              setRenameVisible(false);
              setRenameError(null);
              setRenameFileName("");
            }
          }}
=======
          onDismiss={renameState.isLoading ? undefined : closeRenameDialog}
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
        >
          <Dialog.Title>Rename File</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label={document.file_name}
<<<<<<< HEAD
              value={renameFileName}
              onChangeText={setRenameFileName}
              autoCapitalize="none"
              autoCorrect={false}
              error={!!renameError}
              disabled={isRenaming}
            />
            {renameError ? (
              <Text style={styles.renameErrorText}>{renameError}</Text>
=======
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
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
            ) : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
<<<<<<< HEAD
              onPress={() => {
                setRenameVisible(false);
                setRenameError(null);
                setRenameFileName("");
              }}
              disabled={isRenaming}
            >
              Cancel
            </Button>
            <Button onPress={handleRenamePress} loading={isRenaming}>
=======
              onPress={closeRenameDialog}
              disabled={renameState.isLoading}
            >
              Cancel
            </Button>
            <Button
              onPress={handleRenameConfirm}
              loading={renameState.isLoading}
            >
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
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
<<<<<<< HEAD
  },
  icon: {
    width: 50,
  },
  textContainer: { flex: 1 },
  title: {
    color: "black",
  },
=======
    paddingLeft: 16,
    borderRadius: 5,
    paddingVertical: 4,
  },
  icon: { width: 50 },
  textContainer: { flex: 1 },
  title: { color: "black" },
  subtitle: { color: "#767676", fontSize: 12 },
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  renameErrorText: {
    marginTop: 8,
    color: "#B00020",
  },
});
