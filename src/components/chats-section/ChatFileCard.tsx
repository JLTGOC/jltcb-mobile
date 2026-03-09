import type { FileMessage } from "@/src/types/chats";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

type Props = {
  file: FileMessage;
};

export default function ChatFileCard({ file }: Props) {
  return (
    <Card mode="contained">
      <Card.Content style={styles.content}>
        <Avatar.Icon size={32} icon="file" />
        <View style={styles.textContentContainer}>
          <Text variant="labelLarge" numberOfLines={4}>
            {file.file_name}
          </Text>
          {/* <Text variant="bodySmall" style={styles.fileSize}>
            {file.}
          </Text> */}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
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
