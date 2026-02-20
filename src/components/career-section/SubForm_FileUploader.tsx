import { OJTFormData } from "@/src/types/careers";
import { Image } from "expo-image";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { X } from "lucide-react-native";

type Props = {
  setFormData: Dispatch<SetStateAction<OJTFormData>>;
  formData: OJTFormData;
};

export default function SubForm_FileUploader({ setFormData, formData }: Props) {
  // Ensure array is initialized safely for our 2 slots
  const cvCoverArray = formData.cv_cover && formData.cv_cover.length > 0 
    ? formData.cv_cover 
    : ["", ""];

  const handlePickDocument = async (index: 0 | 1) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // You can change this to "application/pdf" to restrict file types
        copyToCacheDirectory: true,
        multiple: false, // Changed to false since we are targeting a specific slot
      });

      if (!result.canceled) {
        const fileUri = result.assets[0].uri;

        setFormData((prev) => {
          const newCvCover = prev.cv_cover && prev.cv_cover.length > 0 
            ? [...prev.cv_cover] 
            : ["", ""];
            
          newCvCover[index] = fileUri; // Update the specific slot
          
          return { ...prev, cv_cover: newCvCover };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => {
      const newCvCover = [...prev.cv_cover];
      newCvCover[index] = ""; // Clear the specific slot
      return { ...prev, cv_cover: newCvCover };
    });
  };

  // Helper to extract a readable file name from the URI string
  const getFileName = (uri: string) => uri ? uri.split('/').pop() : "";

  return (
    <>
      <Text variant="titleSmall" allowFontScaling={false} style={{ marginBottom: 8 }}>
        CV AND COVER LETTER
      </Text>

      {/* --- CV Slot (Index 0) --- */}
      <TouchableOpacity onPress={() => handlePickDocument(0)}>
        <Surface style={styles.surface}>
          <View style={styles.uploadBox}>
            <Text style={{ marginRight: 10, color: cvCoverArray[0] ? "#000" : "#888" }}>
              {cvCoverArray[0] ? "Change CV" : "Upload CV"}
            </Text>
            <Image
              source={require("../../../src/assets/careers/upload_icon.png")}
              style={styles.uploadImg}
            />
          </View>
        </Surface>
      </TouchableOpacity>

      {/* --- Cover Letter Slot (Index 1) --- */}
      <TouchableOpacity onPress={() => handlePickDocument(1)}>
        <Surface style={[styles.surface, { marginTop: 10 }]}>
          <View style={styles.uploadBox}>
             <Text style={{ marginRight: 10, color: cvCoverArray[1] ? "#000" : "#888" }}>
              {cvCoverArray[1] ? "Change Cover Letter" : "Upload Cover Letter"}
            </Text>
            <Image
              source={require("../../../src/assets/careers/upload_icon.png")}
              style={styles.uploadImg}
            />
          </View>
        </Surface>
      </TouchableOpacity>

      {/* --- UPLOADED FILES LIST --- */}
      {(cvCoverArray[0] !== "" || cvCoverArray[1] !== "") && (
        <View style={{ gap: 10, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, color: "#666" }}>
            UPLOADED FILES:
          </Text>
          
          {cvCoverArray.map((uri, index) => {
            if (!uri) return null; // Don't render if the slot is empty
            const label = index === 0 ? "CV" : "Cover Letter";

            return (
              <View
                key={index}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    flex: 1,
                    borderRadius: 10,
                    padding: 15,
                    borderWidth: 1,
                    borderColor: "#eee",
                    justifyContent: "center"
                  }}
                >
                  <Text numberOfLines={1} style={{ fontSize: 13, color: "#333" }}>
                    <Text style={{ fontWeight: "bold" }}>{label}:</Text> {getFileName(uri)}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={{
                    width: 50,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffeaea",
                  }}
                  onPress={() => handleRemoveFile(index)}
                >
                  <X size={20} color="red" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  surface: {
    elevation: 2, // Slightly lowered elevation for a cleaner modern look
    borderRadius: 10,
    marginVertical: 2,
  },
  uploadBox: {
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Added to align text and image
  },
  uploadImg: {
    aspectRatio: 19 / 25,
    height: 25,
    opacity: 0.6,
  },
});