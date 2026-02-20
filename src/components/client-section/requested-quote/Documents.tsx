import { useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Text,
} from "react-native-paper";

import { fetchClientQuote } from "@/src/services/clientQuotation";
import { QuoteForm } from "@/src/types/client-type";

type Props = {
  id?: string;
};
export default function Details({ id }: Props) {
  const { data, isLoading, error } = useQuery<QuoteForm>({
    queryKey: [id],
    queryFn: () => fetchClientQuote(id as any),
    enabled: !!id,
  });

  console.log("documents.tsx", data)

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator animating={true} />
        <Text style={{ marginTop: 10, textAlign: "center" }}>
          Fetching quote details...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top section for cards */}
      <View style={styles.cardsContainer}>
        {Array.isArray(data?.documents) ? (
    // If it's an array, map through the files
    data.documents.map((files, index) => (
      <Card
        key={index}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.content}>
            File name: {decodeURIComponent(files.file_name)}
          </Text>
        </View>
      </Card>
    ))
  ) : (
    // If it's NOT an array (e.g., a string or null), show the message
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={[styles.content, { color: '#666', fontStyle: 'italic' }]}>
        {data?.documents || "No documents available."}
      </Text>
    </View>
  )}
      </View>

      {/* Bottom section for button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor="#161F3C"
          textColor="white"
          style={{ borderRadius: 4 }}
        >
          VIEW QUOTATION
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardsContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    marginBottom: 20, // optional spacing from bottom
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  content: {
    fontSize: 12,
    fontWeight: "600",
  },
});
