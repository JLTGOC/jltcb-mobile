import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import SharedPdfScreen from "@/components/screens/SharedPdf";
import Button from "@/components/ui/Button";

import { THEMES } from "@/constants/themes";
import { useAuth } from "@/hooks/useAuth";
import { quotationQueryOptions } from "@/query-options/asLead-quotations/quotationQueryOptions";
import { useJobOrderFormStore } from "@/stores/useJobOrderFormStore";
import { downloadFile, handleSaveFile } from "@/utils/handleFileDownload";
import { print } from "@/utils/print";
import { showToast } from "@/utils/showToast";

export default function PdfScreen() {
  const { quotationId } = useLocalSearchParams<{ quotationId: string }>();
  const router = useRouter();
  const { token } = useAuth();
  const { setQuotationReference, reset } = useJobOrderFormStore(
    useShallow((state) => ({
      setQuotationReference: state.setQuotationReference,
      reset: state.reset,
    })),
  );

  const { data } = useQuery(quotationQueryOptions(quotationId));

  const quotationFile = data?.data.quotation_file[0];

  const handleDownload = () => {
    if (quotationFile && typeof quotationFile === "object") {
      const fileUrl = quotationFile.file_url;
      const fileName = quotationFile.file_name;
      handleSaveFile({
        url: fileUrl,
        fileName,
        cacheDir: `accepted-quotations/${quotationId}`,
        token: token!,
      });
    }
  };

  const handlePrint = async () => {
    if (!quotationFile || typeof quotationFile === "string") return;
    try {
      const file = await downloadFile({
        url: quotationFile.file_url,
        fileName: quotationFile.file_name,
        cacheDir: `accepted-quotations/${quotationId}`,
        token: token!,
      });
      print({ uri: file.uri });
    } catch (err) {
      showToast("Failed to print the document. Please try again.");
      console.error("Print error:", err);
    }
  };

  const handleMakeJobOrder = () => {
    if (!data) return;
    reset();
    setQuotationReference(data.data.reference_number);
    if (data.data.service) {
      router.push(
        "/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/shipment",
      );
    } else if (data.data.regulatory_service) {
      router.push(
        "/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/regulatory-services",
      );
    }
  };

  return (
    <SharedPdfScreen
      header={
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={THEMES.darkAccentColor}
            />
          </Pressable>

          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable onPress={handleDownload}>
              <MaterialIcons
                name="download"
                size={24}
                color={THEMES.darkAccentColor}
              />
            </Pressable>

            <Pressable onPress={handlePrint}>
              <MaterialCommunityIcons
                name="printer-outline"
                size={24}
                color={THEMES.darkAccentColor}
              />
            </Pressable>
          </View>
        </View>
      }
      footer={
        <Button onPress={handleMakeJobOrder} style={styles.button}>
          Make Job Order
        </Button>
      }
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  button: {
    width: "80%",
    marginHorizontal: "auto",
  },
});
