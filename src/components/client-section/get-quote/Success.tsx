import { Receipt } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
export default function Sucess() {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", width: 250 }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}></View>
      <Receipt size={100} />
      <Text>Congratulations.</Text>
      <Text style={{textAlign:"center"}}>Your Request For Quotation is Submitted</Text>
      <Text style={{textAlign:"center"}}>We will send your notification when the quotation is ready.</Text>
    </View>
  );
}
