import React, { useState, Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { FileUp, X } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import { QuoteForm, ClientFile } from "../../../types/client";

type Props = {
  formData: QuoteForm;
  setFormData: Dispatch<SetStateAction<QuoteForm>>;
};

export default function Step_3({ formData, setFormData }: Props) {
  const [error, setError] = useState<string | null>("");

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled) {

        const mappedFiles: ClientFile[] = result.assets.map((asset) => ({
        id: Date.now() + Math.random(), // Generate the missing 'id' required by your type
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

  const handleRemoveFile = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents?.filter((document) => document.id !== id),
      remove_documents: prev.remove_documents 
      ? [...prev.remove_documents, id] 
      : [id],
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
        {formData.documents && formData.documents.length > 0 && (
          <View style={{ gap: 10, marginTop: 10 }}>
            <Text>UPLOADED FILES:</Text>
            {formData.documents.map((document) => (
              <View
                key={document.id}
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
                  onPress={() => {}}
                >
                  <Text numberOfLines={1}>File Name: {document.file_name} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "10%",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffeaea",
                  }}
                  onPress={() => handleRemoveFile(document.id)}
                >
                  <X size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>REMARKS</Text>
        <TextInput
          mode="flat"
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
});
