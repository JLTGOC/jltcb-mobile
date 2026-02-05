import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { FileUp, X } from "lucide-react-native";

import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import { DocumentPickerAsset } from "expo-document-picker";
import * as IntentLauncher from "expo-intent-launcher";
import * as FileSystem from "expo-file-system";

export default function Step_3() {
  const [fileData, setFileData] = useState<DocumentPickerAsset | null>(null);
  const [error, setError] = useState<string | null>("");

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const pickedFile = result.assets[0];
        setFileData(pickedFile);
        setError(null);
      } else {
        setError("User cancelled the selection");
      }
    } catch (err) {
      setError("Error: " + err);
      console.error(err);
    }
  };

  const openFile = async () => {
    if (!fileData) return;

    try {
      if (Platform.OS === "android") {
        // 1. Generate a "Content URI" that other apps are allowed to read
        const contentUri = await FileSystem.getContentUriAsync(fileData.uri);

        // 2. Launch the Intent
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1, // This flag grants 'Read' permission to the receiving app
          type: fileData.mimeType || "application/pdf",
        });
      } else {
        // On iOS, sharing actually opens a full-screen preview (Quick Look)
        await Sharing.shareAsync(fileData.uri);
      }
    } catch (err) {
      console.error("Failed to open file:", err);
      alert("Could not open file. Make sure you have a PDF viewer installed.");
    }
  };

  return (
    <View style={{ gap: 10 }}>
      {/* Upload File */}
      <View style={{ gap: 10 }}>
        {fileData === null ? (
          <>
            {/* Upload */}
            <Text>UPLOAD DOCUMENTS (bill of ladding/airway bill)</Text>
            <View style={styles.container}>
              {error && <Text style={styles.errorText}>{error}</Text>}
              <TouchableOpacity
                style={styles.fileInput}
                onPress={handlePickDocument}
              >
                <FileUp size={40} fill={"#b2b2b2"} color={"white"} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Uploaded */}
            <View style={{ gap: 10 }}>
              <Text>FILE UPLOADED</Text>
              <View
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
                    padding: 5,
                  }}
                  onPress={() => openFile()}
                >
                  <Text>File Name: {fileData?.name} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "10%",
                    borderRadius: 10,
                    padding: 5,
                  }}
                  onPress={() => setFileData(null)}
                >
                  <X size={15} style={{ alignSelf: "center" }} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>

      <View>
        <Text>REMARKS</Text>
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="blue"
          mode="flat"
          multiline={true}
          numberOfLines={4}
          style={{
            borderRadius: 10,
            height: 80,
            backgroundColor: "#fff",
          }}
          theme={{
            roundness: 10,
          }}
        />
      </View>
    </View>
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
