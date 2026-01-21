import { ScrollView, Text, View, StyleSheet, FlatList } from "react-native";
import NewsCardTemplate from "./NewsCardTemplate";
import NewsTabButtons from "./NewsTabButtons";

export default function NewsUpdatesContainer() {
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title} allowFontScaling={false}>
        News and Updates
      </Text>
      <NewsTabButtons />

      <FlatList
        data={data}
        renderItem={({ item }) => <NewsCardTemplate />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 500 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
  },
});
