import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text, Surface, Checkbox } from "react-native-paper";
import { Dispatch, SetStateAction, useState } from "react";
import { OJTFormData } from "@/src/types/careers";
// import DocumentPicker from "react-native-document-picker";

type Props = {
  setFormData: Dispatch<SetStateAction<OJTFormData>>;
  formData: OJTFormData;
};

export default function SubForm_FileUploader({ setFormData, formData }: Props) {
  const [file, setFile] = useState<string>("");
  const [error, setError] = useState<string>("");
  //   const pickFile = async () => {
  //     try {
  //       const file = await DocumentPicker.pickSingle({
  //         type: [DocumentPicker.types.allFiles],
  //       });
  //       setFile(file.uri);
  //     } catch (err) {
  //         setError("Invalid Value of the File")
  //     }
  //   };

  return (
    <>
      <Text variant="titleSmall" allowFontScaling={false}>CV AND COVER LETTER</Text>
      <TouchableOpacity>
        <Surface style={{ elevation: 10, borderRadius: 10, marginVertical: 2 }}>
          <View
            style={{
              height: 80,
              backgroundColor: "#ffffff",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../src/assets/careers/upload_icon.png")}
            />
          </View>
        </Surface>
      </TouchableOpacity>
      <TouchableOpacity>
        <Surface
          style={{ elevation: 10, borderRadius: 10, marginVertical: 10 }}
        >
          <View
            style={{
              height: 80,
              backgroundColor: "#ffffff",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../src/assets/careers/upload_icon.png")}
            />
          </View>
        </Surface>
      </TouchableOpacity>
     
    </>
  );
}


