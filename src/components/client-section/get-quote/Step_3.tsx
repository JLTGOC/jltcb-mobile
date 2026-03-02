import { useNavigate } from "@/src/hooks/useNavigate";
import * as DocumentPicker from "expo-document-picker";
import { FileUp, X } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { ClientFile, QuoteForm } from "../../../types/client-type";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};

export default function Step_3({ formData, setFormData }: Props) {
  const { navigate } = useNavigate();
  const [error, setError] = useState<string | null>("");

  console.log("step_3.tsx", formData)

  const uploadedDocuments = Array.isArray(formData.documents)
    ? formData.documents.filter(
        (document): document is ClientFile =>
          !!document &&
          typeof document.file_name === "string" &&
          document.file_name.trim().length > 0 &&
          typeof document.file_url === "string" &&
          document.file_url.trim().length > 0,
      )
    : [];

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled) {
        const mappedFiles: ClientFile[] = result.assets.map((asset) => ({
          id: Date.now() + Math.random(),
          file_name: asset.name,
          file_url: asset.uri,
          mimeType: asset.mimeType || "application/octet-stream",
        }));

        setFormData((prev) => ({
          ...prev,
          documents: [...(prev.documents || []), ...mappedFiles],
        }));

        setError(null);
      }
    } catch (err) {
      setError("Error: " + err);
    }
  };

  const handleRemoveFile = (id: number, fileUrl: string) => {
    const isLocalFile =
      fileUrl.startsWith("file://") || fileUrl.startsWith("content://");
    const shouldTrackRemovedDocument =
      Number.isInteger(id) && id > 0 && !isLocalFile;

    setFormData((prev) => ({
      ...prev,
      documents: Array.isArray(prev.documents)
        ? prev.documents.filter(
            (document) => document.id !== id && document.file_url !== fileUrl,
          )
        : [],
      removed_documents: shouldTrackRemovedDocument
        ? prev.removed_documents
          ? [...prev.removed_documents, id]
          : [id]
        : prev.removed_documents,
    }));
  };

  return (
    <ScrollView
      style={{ gap: 10, padding: 10 }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View style={{ gap: 10 }}>
        <Text>UPLOAD DOCUMENTS (bill of lading/airway bill)</Text>

        {/* Upload Button */}
        <View style={styles.container}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity
            style={styles.fileInput}
            onPress={handlePickDocument}
          >
            <FileUp size={40} fill={"#b2b2b2"} color={"white"} />
          </TouchableOpacity>
        </View>

        {/* List of Uploaded Files */}
        {uploadedDocuments.length > 0 ? (
          <View style={{ gap: 10, marginTop: 10 }}>
            <Text>UPLOADED FILES:</Text>
            {uploadedDocuments.map((document, index) => (
              <View
                key={`${document.id}-${document.file_url}-${index}`}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#ffffff",
                    width: "85%",
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onPress={() => {
                    navigate({
                      pathname: "/(client)/quotations/viewer",
                      params: {
                        fileUrl: encodeURIComponent(document.file_url),
                        fileName: encodeURIComponent(document.file_name),
                      },
                    });
                  }}
                >
                  <Text numberOfLines={1}>File Name: {document.file_name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "10%",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffeaea",
                  }}
                  onPress={() =>
                    handleRemoveFile(document.id, document.file_url)
                  }
                >
                  <X size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text
              style={[styles.content, { color: "#666", fontStyle: "italic" }]}
            >
              No documents available.
            </Text>
          </View>
        )}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>REMARKS</Text>
        <TextInput
          mode="flat"
          value={formData.remarks || ""}
          onChangeText={(text) => {setFormData((prev) => ({...prev, remarks: text}))}}
          multiline={true}
          numberOfLines={4}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="blue"
          style={{
            borderRadius: 10,
            height: 80,
            backgroundColor: "#fff",
          }}
          theme={{ roundness: 10 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
  },
  fileInput: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "red", marginTop: 10 },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "100%",
    maxHeight: 300,
  },
  resultTitle: { fontWeight: "bold", marginBottom: 5, color: "green" },
  info: { fontSize: 12, marginBottom: 5, fontFamily: "monospace" },
  content: {
    fontSize: 12,
    fontWeight: "600",
  },
});
