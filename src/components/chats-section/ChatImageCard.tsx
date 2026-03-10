import { useAuth } from "@/src/hooks/useAuth";
import type { ImageMessage } from "@/src/types/chats";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";

const MAX_IMAGE_WIDTH = Dimensions.get("window").width * 0.65;
const MAX_IMAGE_HEIGHT = 250;
const IMAGE_BORDER_RADIUS = 15;
const IMAGE_TRANSITION_MS = 100;

interface Props {
  image: ImageMessage;
}

export default function ChatImageCard({ image }: Props) {
  const { userData } = useAuth();

  const isUserMessage = userData?.id === image.sender.id;
  const aspectRatio = image.width / image.height;

  return (
    <View style={[styles.container, isUserMessage && styles.userContainer]}>
      <View style={[styles.imageContainer, { aspectRatio }]}>
        <Image
          source={image.file_url}
          alt={image.file_name}
          contentFit="contain"
          transition={IMAGE_TRANSITION_MS}
          style={[styles.image, { aspectRatio }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  imageContainer: {
    maxHeight: MAX_IMAGE_HEIGHT,
    maxWidth: MAX_IMAGE_WIDTH,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: IMAGE_BORDER_RADIUS,
  },
});
