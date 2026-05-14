import { PdfView, PdfViewProps } from "@kishannareshpal/expo-pdf";
import { useQuery } from "@tanstack/react-query";
import type { File } from "expo-file-system";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { type ReactNode, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { THEMES } from "@/src/constants/themes";
import { useAuth } from "@/src/hooks/useAuth";
import { quotationQueryOptions } from "@/src/query-options/asLead-quotations/quotationQueryOptions";
import { downloadFile } from "@/src/utils/handleFileDownload";
import { showToast } from "@/src/utils/showToast";

interface Props extends Omit<PdfViewProps, "uri"> {
  header?: ReactNode;
  footer?: ReactNode;
}

export default function SharedPdfScreen({
  header,
  footer,
  style,
  contentPadding,
  ...props
}: Props) {
  const { quotationId } = useLocalSearchParams<{ quotationId: string }>();
  const insets = useSafeAreaInsets();
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);

  const { data, isPending } = useQuery(quotationQueryOptions(quotationId));

  useFocusEffect(
    useCallback(() => {
      setFile(null);
      let cancelled = false;

      const loadFile = async () => {
        if (!data) return;

        if (typeof data.data.quotation_file === "string") {
          showToast(data.data.quotation_file);
          return;
        }

        try {
          const downloaded = await downloadFile({
            fileName: data.data.quotation_file[0].file_name,
            url: data.data.quotation_file[0].file_url,
            cacheDir: `pdfs/${quotationId}`,
            token: token!,
          });
          if (!cancelled) setFile(downloaded);
        } catch (err) {
          if (!cancelled) {
            showToast("Failed to load PDF file.");
            console.error(err);
          }
        }
      };

      loadFile();

      return () => {
        cancelled = true;
      };
    }, [data, quotationId, token]),
  );

  if (isPending || !file) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PdfView
        uri={file.uri}
        style={[styles.pdf, style]}
        contentPadding={{ top: insets.top + 10, ...contentPadding }}
        {...props}
      />

      <View style={styles.footer}>{footer}</View>

      <View style={[styles.absoulte, { top: 0 }]}>{header}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.pageBackgroundColor,
    justifyContent: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  pdf: {
    flex: 1,
    backgroundColor: THEMES.pageBackgroundColor,
  },
  absoulte: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  footer: {
    marginVertical: 16,
  },
});
