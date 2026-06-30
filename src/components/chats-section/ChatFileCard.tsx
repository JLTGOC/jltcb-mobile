<<<<<<< HEAD
import { useAuth } from "@/src/hooks/useAuth";
import type { FileMessage } from "@/src/types/chats";
import { handleFileOpen } from "@/src/utils/handleFileOpen";
=======
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

import { useAuth } from "@/hooks/useAuth";
import type { FileMessage } from "@/types/chats";
import { handleSaveFile } from "@/utils/handleFileDownload";
import { showToast } from "@/utils/showToast";

type Props = {
  file: FileMessage;
};

export default function ChatFileCard({ file }: Props) {
<<<<<<< HEAD
  const { userData } = useAuth();
  const isUserMessage = userData?.id === file.sender.id;

  const handlePress = async () => {
    await handleFileOpen(file.file_url);
=======
  const { userData, token } = useAuth();
  const isUserMessage = userData?.id === file.sender.id;

  const handlePress = async () => {
    try {
      await handleSaveFile({
        url: file.file_url,
        token: token!,
        cacheDir: "files",
        fileName: decodeURI(file.file_name),
      });
    } catch (err) {
      showToast("Failed to download file.");
      console.error(err);
    }
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  };

  return (
    <View
      style={[
        styles.container,
        isUserMessage && { justifyContent: "flex-end" },
      ]}
    >
      <Card style={styles.card} mode="contained" onPress={handlePress}>
        <Card.Content style={styles.content}>
          <Avatar.Icon size={32} icon="file" />
          <View style={styles.textContentContainer}>
            <Text variant="labelLarge" numberOfLines={4}>
<<<<<<< HEAD
              {file.file_name}
=======
              {decodeURI(file.file_name)}
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
            </Text>
            {/* <Text variant="bodySmall" style={styles.fileSize}>
            {file.}
          </Text> */}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  card: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    gap: 12,
  },
  textContentContainer: { flex: 1, flexShrink: 1 },
  fileSize: {
    color: "gray",
  },
  iconContainerStyle: {
    width: 32,
    height: 32,
  },
});
