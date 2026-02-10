import { articlesQueryOptions } from "@/src/query-options/articles/articlesQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";
import NewsCardSkeleton from "./NewsCardSkeleton";
import NewsCardTemplate from "./NewsCardTemplate";
import NewsTabButtons from "./NewsTabButtons";

export default function NewsUpdatesContainer() {
  const { data, isPending, error } = useQuery(articlesQueryOptions);

  console.log(error);

  return (
    <View style={styles.container}>
      <Text style={styles.title} allowFontScaling={false}>
        News and Updates
      </Text>
      <NewsTabButtons />

      {isPending ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Array.from({ length: 3 })}
          renderItem={() => <NewsCardSkeleton />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          data={data?.data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: article }) => (
            <NewsCardTemplate article={article} />
          )}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 450,
  },
  title: {
    fontSize: 18,
  },
});
