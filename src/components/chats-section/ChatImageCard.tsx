import { useAuth } from "@/src/hooks/useAuth";
import type { ImageMessage } from "@/src/types/chats";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const MAX_IMAGE_HEIGHT = 250;
const IMAGE_BORDER_RADIUS = 15;
const IMAGE_TRANSITION_MS = 100;
const LOADER_BORDER_COLOR = "#ddd";

interface Props {
  image: ImageMessage;
}

export default function ChatImageCard({ image }: Props) {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(true);

  const isUserMessage = userData?.id === image.sender.id;
  const aspectRatio = image.width / image.height;

  return (
    <View
      style={[
        styles.imageContainer,
        { aspectRatio },
        isUserMessage && { marginInlineStart: "auto" },
        loading && { borderColor: LOADER_BORDER_COLOR },
      ]}
    >
      <Image
        source={image.file_url}
        alt={image.file_name}
        transition={IMAGE_TRANSITION_MS}
        style={styles.image}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    maxHeight: MAX_IMAGE_HEIGHT,
    borderWidth: 1,
    borderColor: "transparent",
  },
  image: {
    width: "100%",
    flex: 1,
    borderRadius: IMAGE_BORDER_RADIUS,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
