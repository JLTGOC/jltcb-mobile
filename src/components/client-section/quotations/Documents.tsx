import { useQuery } from "@tanstack/react-query";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

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

  const handleOnPress = async (url?: string) => {
    if (!url) {
      return;
    }

    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      Alert.alert("Unable to open file", "Invalid file URL.");
      return;
    }

    await Linking.openURL(url);
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
            <View
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
                <Text style={[styles.content, { color: "green" }]}>
                  UPLOADED
                </Text>
              </View>
            </View>
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
    width: "90%",
  },
  cardsContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  content: {
    fontSize: 12,
    fontWeight: "600",
  },
});
