import { reelsQueryOptions } from "@/src/query-options/reels/reelsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  type ViewabilityConfig,
  type ViewToken,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ReelsPlayer from "./ReelsPlayer";

export default function ReelsContainer() {
  const router = useRouter();
  const { data, isPending } = useQuery(reelsQueryOptions);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  useEffect(() => {
    if (data?.data && data.data.length > 0 && activeItemId === null) {
      setActiveItemId(data.data[0].id);
    }
  }, [data, activeItemId]);

  const visibleItemsRef = useRef<number[]>([]);

  const viewabilityConfig = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 85,
    minimumViewTime: 100,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      visibleItemsRef.current = viewableItems.map((v) => v.item.id);
    },
  ).current;

  const handleMomentumScrollEnd = () => {
    setActiveItemId((currentActiveId) => {
      if (visibleItemsRef.current.length === 0) return currentActiveId;
      const isCurrentStillVisible = visibleItemsRef.current.includes(
        currentActiveId as number,
      );
      if (isCurrentStillVisible) return currentActiveId;
      return visibleItemsRef.current[0];
    });
  };

  const screenWidth = Dimensions.get("window").width;

  if (isPending) {
    return (
      <ActivityIndicator color="gray" style={{ height: screenWidth * 0.3 }} />
    );
  }

  return (
    <View style={styles.videoContainer}>
      <FlatList
        data={data?.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => setActiveItemId(item.id)}
            onPress={() => {
              router.push({
                pathname: "/home/reels/[id]",
                params: { id: item.id, placeholder: item.thumbnail_path },
              });
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <ReelsPlayer reel={item} shouldPlay={activeItemId === item.id} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  videoSize: {
    marginRight: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
});
