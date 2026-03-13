import { fetchShipmentDetails } from "@/src/services/shipment";
import type { ShipmentDetails } from "@/src/types/shipment-type";
import { useQuery } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";

type ShipmentDocument = {
  id: number | string;
  file_name: string;
  file_url: string;
};

type ShipmentDetailsWithFiles = ShipmentDetails & {
  documents?: ShipmentDocument[];
  quotation_file?: ShipmentDocument[];
};

type Props = {
  shipment: number;
};

function getFileExtension(url: string) {
  const cleanUrl = url.split("?")[0].split("#")[0];
  const fileName = cleanUrl.split("/").pop() || "";
  const extension = fileName.includes(".")
    ? fileName.split(".").pop() || ""
    : "";

  return extension.toLowerCase();
}

function getFileIconByUrl(url: string) {
  const extension = getFileExtension(url);

  if (extension === "pdf") return "file-pdf-box";
  if (extension === "doc" || extension === "docx") return "file-word-box";
  if (extension === "xls" || extension === "xlsx" || extension === "csv") {
    return "file-excel-box";
  }
  if (["jpg", "jpeg", "png", "webp", "gif", "bmp"].includes(extension)) {
    return "file-image";
  }

  return "file-outline";
}

function getDisplayName(fileName: string, fileUrl: string) {
  if (fileName?.trim()) {
    return decodeURIComponent(fileName);
  }

  const cleanUrl = fileUrl.split("?")[0].split("#")[0];
  return decodeURIComponent(cleanUrl.split("/").pop() || "Unknown file");
}

export default function Documents({ shipment }: Props) {
  const hasValidShipmentId = Number.isFinite(shipment) && shipment > 0;

  const { data, isLoading, isError } = useQuery<ShipmentDetailsWithFiles, Error>({
    queryKey: ["shipment-details", shipment],
    queryFn: () => fetchShipmentDetails(shipment),
    enabled: hasValidShipmentId,
  });

  const documents = [
    ...(Array.isArray(data?.documents) ? data.documents : []),
    ...(Array.isArray(data?.quotation_file) ? data.quotation_file : []),
  ];

  if (!hasValidShipmentId) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>No shipment selected.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.stateWrap}>
        <ActivityIndicator />
        <Text style={styles.stateText}>Fetching documents...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>Failed to fetch documents.</Text>
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>No documents available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={documents}
      keyExtractor={(item, index) => `${String(item.id)}-${index}`}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const extension = getFileExtension(item.file_url);

        return (
          <View style={styles.card}>
            <View style={styles.fileDetails}>
              <MaterialCommunityIcons
                name={getFileIconByUrl(item.file_url)}
                size={24}
                color="#6C6C6C"
              />

              <View style={styles.texts}>
                <Text style={styles.title} numberOfLines={1}>
                  {getDisplayName(item.file_name, item.file_url)}
                </Text>
                <Text style={styles.date}>
                  {extension ? `${extension.toUpperCase()} file` : "Unknown file type"}
                </Text>
              </View>
            </View>

            <IconButton
              icon="dots-vertical"
              size={18}
              iconColor="#8A8A8A"
              style={styles.actionButton}
              onPress={() => {}}
            />
          </View>
        );
      }}
    />
  );
}
 // <MaterialIcons name="receipt-long" color="#000" size={24} />
        // <MaterialCommunityIcons name="file" color="#000" size={24} />

        // <FontAwesome name="file-pdf-o" color="#000" size={24} />
        // <MaterialCommunityIcons name="file-word-outline" color="#000" size={24} />
        // <MaterialCommunityIcons name="file-image-outline" color="#000" size={24} />
        // <FontAwesome name="file-excel-o" color="#000" size={24} />
const styles = StyleSheet.create({
  listContainer: {
    gap: 10,
    width: "100%",
  },
  stateWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  stateText: {
    color: "#666666",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 6,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fileDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  texts: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333333",
    lineHeight: 16,
  },
  date: {
    fontSize: 10,
    color: "#7B7B7B",
    lineHeight: 14,
  },
  actionButton: {
    margin: 0,
  },
});
