import { useQuery } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import { Building2 } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Text,
} from "react-native-paper";

import { fetchClientQuote } from "@/src/services/clientQuotation";
import { QuoteForm } from "@/src/types/client-type";
import { useRouter } from "expo-router";

type Props = {
  quotationId?: string;
};
export default function Details({ quotationId }: Props) {
  const router = useRouter();

  //fetch the single quotation details
  const { data, isLoading, error } = useQuery<QuoteForm>({
    queryKey: [quotationId],
    queryFn: () => fetchClientQuote(quotationId as any),
    enabled: !!quotationId,
  });

  console.log("details.tsx", data);

  const handleOnPress = async (status: string, url?: string) => {
    if (status === "REQUESTED") {
      router.push({
        pathname: "/(client)/(tabs)/dashboard/quotations/[id]/update",
        params: { id: String(quotationId), mode: "EDIT" },
      });
    } else if (status === "RESPONDED" && url) {
      await WebBrowser.openBrowserAsync(url);
    }
  };

  const copyData = [
    {
      title: "CONSIGNEE DETAILS",
      details: [
        { label: "COMPANY NAME", info: data?.company?.name },
        {
          label: "COMPANY ADDRESS",
          info: data?.company?.address,
        },
        {
          label: "CONTACT PERSON",
          info: data?.company?.contact_person,
        },
        {
          label: "CONTACT NUMBER",
          info: data?.company?.contact_number,
        },
        { label: "EMAIL", info: data?.company?.email },
      ],
    },
    {
      title: "SHIPMENT DETAILS",
      details: [
        { label: "SERVICE TYPE", info: data?.service?.type },
        {
          label: "FREIGHT TRANSPORT MODE",
          info: data?.service?.transport_mode,
        },
        { label: "SERVICE", info: data?.service?.options },
        { label: "COMMODITY", info: data?.commodity?.commodity },
        {
          label: "VOLUME (DIMENSION)",
          info: `${data?.commodity?.cargo_type} - ${data?.commodity?.cargo_type}`,
        },
        { label: "ORIGIN", info: data?.shipment?.origin },
      ],
    },
    {
      title: "PERSON IN CHARGE",
      details: [
        { label: "ACCOUNT SPECIALIST", info: data?.account_specialist },
      ],
    },
  ];

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator animating={true} />
        <Text style={{ marginTop: 10, textAlign: "center" }}>
          Fetching quote details...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {copyData.map((datas, index) => (
        <Card
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 10,
          }}
          key={index}
        >
          <View style={{ gap: 10 }}>
            <View style={styles.titleContainer}>
              <Building2 size={20} />
              <Text style={styles.textTitle}>{datas.title}</Text>
            </View>
            <Divider />
            {datas.details.map((detail, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.labelColumn}>
                  <Text style={[styles.content, { color: "#d1d1d1" }]}>
                    {detail.label}
                  </Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={[styles.content, { color: "#000000" }]}>
                    {detail.info}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      ))}
      {data?.status === "REQUESTED" && (
        <Button
          mode="contained"
          buttonColor="#161F3C"
          textColor="white"
          style={{ borderRadius: 4 }}
          onPress={() => {
            handleOnPress(data?.status);
          }}
        >
          EDIT
        </Button>
      )}
      {data?.status === "RESPONDED" && (
        <Button
          mode="contained"
          buttonColor="#161F3C"
          textColor="white"
          style={{ borderRadius: 4 }}
          onPress={() => {
            handleOnPress(
              data?.status,
              data?.quotation_file?.[0]?.file_url
            );
          }}
        >
          VIEW QUOTATION
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  titleContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  textTitle: { fontWeight: 700, fontSize: 16 },
  content: { fontSize: 12, fontWeight: "600" },
  row: {
    flexDirection: "row",
    paddingVertical: 4,
    alignItems: "flex-start",
  },
  labelColumn: {
    width: "50%",
  },
  infoColumn: {
    flex: 1,
  },
});
