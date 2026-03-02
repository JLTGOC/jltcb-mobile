import { useQuery } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";

import { fetchClientQuote } from "@/src/services/clientQuotation";
import { QuoteForm } from "@/src/types/client-type";

type Props = {
  quotationId?: string;
};
export default function Details({ quotationId }: Props) {
  //fetch the single quotation details
  const { data, isLoading, error } = useQuery<QuoteForm>({
    queryKey: [quotationId],
    queryFn: () => fetchClientQuote(Number(quotationId)),
    enabled: !!quotationId,
  });

  console.log("documents.tsx", data);

  const handleOnPress = async (url?: string) => {
    await WebBrowser.openBrowserAsync(url as any);
  };

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
      <View style={styles.cardsContainer}>
        {Array.isArray(data?.documents) ? (
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
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text
              style={[styles.content, { color: "#666", fontStyle: "italic" }]}
            >
              {data?.documents || "No documents available."}
            </Text>
          </View>
        )}
      </View>
      {data?.status === "RESPONDED" && data?.quotation_file?.[0]?.file_url && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            buttonColor="#161F3C"
            textColor="white"
            style={{ borderRadius: 4 }}
            onPress={() => handleOnPress(data?.quotation_file?.[0]?.file_url)}
          >
            VIEW QUOTATION
          </Button>
        </View>
      )}
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
