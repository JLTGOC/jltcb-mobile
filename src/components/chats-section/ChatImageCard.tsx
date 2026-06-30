import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
<<<<<<< HEAD
import { useAuth } from "@/src/hooks/useAuth";
import type { ImageMessage } from "@/src/types/chats";
=======

import { useAuth } from "@/hooks/useAuth";
import type { ImageMessage } from "@/types/chats";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

const MAX_IMAGE_HEIGHT = 250;
const IMAGE_BORDER_RADIUS = 15;
const IMAGE_TRANSITION_MS = 100;
const LOADER_BORDER_COLOR = "#ddd";

interface Props {
<<<<<<< HEAD
	image: ImageMessage;
}

export default function ChatImageCard({ image }: Props) {
	const { userData } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const isUserMessage = userData?.id === image.sender.id;
	const aspectRatio = image.width / image.height;

	const handlePress = () => {
		if (loading) return;
		router.push({
			pathname: "/image-viewer",
			params: {
				url: image.file_url,
				fileName: image.file_name,
			},
		});
	};

	return (
		<Pressable
			onPress={handlePress}
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
		</Pressable>
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
=======
  image: ImageMessage;
  sending: boolean;
}

export default function ChatImageCard({ image, sending }: Props) {
  const { userData, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const isUserMessage = userData?.id === image.sender.id;
  const aspectRatio = image.width / image.height;

  const handlePress = () => {
    if (loading || sending) return;
    router.push({
      pathname: "/image-viewer",
      params: {
        url: image.file_url,
        fileName: image.file_name,
      },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.imageContainer,
        { aspectRatio },
        isUserMessage && { marginInlineStart: "auto" },
        loading && { borderColor: LOADER_BORDER_COLOR },
      ]}
    >
      <Image
        source={{
          uri: image.file_url,
          headers: { Authorization: `Bearer ${token}` },
        }}
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    maxHeight: MAX_IMAGE_HEIGHT,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: IMAGE_BORDER_RADIUS,
  },
  image: {
    width: "100%",
    flex: 1,
    borderRadius: IMAGE_BORDER_RADIUS,
  },
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
});
