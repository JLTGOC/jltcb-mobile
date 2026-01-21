import { View } from "react-native";
import {Divider, Text} from "react-native-paper"

export default function PrincipleList() {
  const datas = [
    {
      title: "Compliance and Accuracy",
      description:
        "Ensuring full adherence to customs laws andgovernment requirements.",
    },
    {
      title: "Speed and Reliability",
      description:
        "Minimizing downtime, avoiding costly delays, and keeping shipments moving 24/7.",
    },
    {
      title: "Partnership and Trust",
      description:
        "Working closely with government agencies, clients, and communities to shape a secure and globally competitive trade environment.",
    },
  ];

  return (
    <>
      {datas.map((data, i) => (
        <View key={i}>
          <Text style={{fontWeight:"bold", fontSize: 20, color: "#161F3C" }} allowFontScaling={false}>{data.title}</Text>
          <Text style={{fontSize: 15, color: "#161F3C" }}>{data.description} allowFontScaling={false}</Text>
          <Divider style={{marginVertical:10}}/>
        </View>
      ))}
    </>
  );
}
