import { ScrollView, Text, View } from "react-native";
import NewsCardTemplate from "./news-and-updates/NewsCardTemplate"
import NewsTabButtons from "./news-and-updates/NewsTabButtons";
import styles from "./styles";

export default function NewsUpdates() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>News and Updates</Text>
      <NewsTabButtons></NewsTabButtons>
      <ScrollView>
        {data.map((data, i) => (
            <View key={i}>
              <NewsCardTemplate/>
            </View>
        ))}
      </ScrollView>
    </View>
  );
}
