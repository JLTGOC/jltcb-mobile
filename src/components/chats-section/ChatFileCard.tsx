import { useAuth } from "@/src/hooks/useAuth";
import type { FileMessage } from "@/src/types/chats";
import * as Linking from "expo-linking";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

type Props = {
  file: FileMessage;
};

export default function ChatFileCard({ file }: Props) {
  const { userData } = useAuth();
  const isUserMessage = userData?.id === file.sender.id;

  const handlePress = async () => {
    await Linking.openURL(file.file_url);
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
              {file.file_name}
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
