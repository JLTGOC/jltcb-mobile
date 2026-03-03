import { articleQueryOptions } from "@/src/query-options/articles/articleQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function SharedArticle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isPending, error } = useQuery(articleQueryOptions(id));

  const screenHeight = Dimensions.get("window").height;

  if (isPending) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Image
          source={data.data.image_url}
          style={{ width: "100%", height: screenHeight * 0.25 }}
          contentFit="cover"
        />
        <ImageBackground
          source={require("@/src/assets/banners/large.png")}
          style={{
            padding: 24,
            paddingBottom: "30%",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            allowFontScaling={false}
          >
            {data.data.title}
          </Text>
        </ImageBackground>
        <View style={{ paddingHorizontal: 10, gap: 50, paddingVertical: 16 }}>
          <Text variant="bodySmall" allowFontScaling={false}>
            {data.data.content}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
