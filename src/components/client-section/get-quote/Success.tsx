import { Receipt } from "lucide-react-native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

type Props = {
  onAddAnotherQuotation?: () => void;
  show?: boolean;
};

export default function Sucess({ onAddAnotherQuotation, show }: Props) {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", width: 250 }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}></View>
      <Receipt size={100} />
      <Text>Congratulations.</Text>
      <Text style={{textAlign:"center"}}>Your Request For Quotation is Submitted</Text>
      <Text style={{textAlign:"center"}}>We will send your notification when the quotation is ready.</Text>
      {show && (
        <Button
        mode="contained"
        onPress={onAddAnotherQuotation}
        style={{ marginTop: 20, backgroundColor: "#161F3C" }}
      >
        Add Another Quotation
      </Button>
      )}
     
    </View>
  );
}
