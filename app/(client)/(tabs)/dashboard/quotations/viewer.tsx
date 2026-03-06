import BannerHeader from "@/src/components/ui/BannerHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { WebView } from "react-native-webview";

export default function QuotationViewer() {
  const router = useRouter();
  const { url, title } = useLocalSearchParams<{
    url?: string;
    title?: string;
  }>();

  const fileUrl = typeof url === "string" ? url : "";
  const isPdf = /\.pdf($|[?#])|application\/pdf/i.test(fileUrl);

  const googleViewerUrl = useMemo(() => {
    if (!fileUrl) {
      return "";
    }

    return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(fileUrl)}`;
  }, [fileUrl]);

  const [viewerUrl, setViewerUrl] = useState(fileUrl);
  const [usedFallback, setUsedFallback] = useState(false);

  if (!fileUrl) {
    return (
      <View style={styles.container}>
        <BannerHeader title={title || "View Quotation"} variant="dark" />
        <View style={styles.emptyState}>
          <Text>Unable to open file. Missing file URL.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BannerHeader title={title || "View Quotation"} variant="dark" />
      <WebView
        source={{ uri: viewerUrl }}
        originWhitelist={["*"]}
        mixedContentMode="always"
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator animating={true} />
            <Text style={styles.loaderText}>Opening file...</Text>
          </View>
        )}
        onError={() => {
          if (isPdf && !usedFallback && googleViewerUrl) {
            setUsedFallback(true);
            setViewerUrl(googleViewerUrl);
            return;
          }

          Alert.alert("Unable to open file", "Please try again later.");
          router.back();
        }}
        onHttpError={() => {
          if (isPdf && !usedFallback && googleViewerUrl) {
            setUsedFallback(true);
            setViewerUrl(googleViewerUrl);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
