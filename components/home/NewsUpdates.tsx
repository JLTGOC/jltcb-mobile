import { Text, View, ScrollView } from "react-native";
import styles from "../../styles/home/news-updates-styles";
import SegmentedButtons from "../../components/home/newsUpdates/SegementedButtons";
import CardTemplate from "./newsUpdates/CardTemplate";

export default function NewsUpdates() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>News and Updates</Text>
      <SegmentedButtons></SegmentedButtons>
      <ScrollView>
        {data.map((data, i) => (
            <View key={i}>
              <CardTemplate/>
            </View>
        ))}
      </ScrollView>
    </View>
  );
}
