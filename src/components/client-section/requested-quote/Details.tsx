import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet, } from "react-native";
import { Text, Card, Divider, ActivityIndicator, Button } from "react-native-paper";
import { Building2 } from "lucide-react-native";

import { fetchClientQuote } from "@/src/services/ClientQuote";
import { ClientQuoteResponse } from "@/src/types/client";
import { useNavigate } from "@/src/hooks/useNavigate";
import { routes } from "@/src/constants/routes";

type Props = {
  id?: string
  mode?: string
}
export default function Details({id, mode} : Props) {
  const {navigate} = useNavigate()

  const { data, isLoading, error } = useQuery<ClientQuoteResponse>({
    queryKey: [id],
    queryFn: () => fetchClientQuote(id as any),
    enabled: !!id,
  });

  const copyData = [
    {
      title: "CONSIGNEE DETAILS",
      details: [
        { label: "COMPANY NAME", info: data?.consignee_details?.company_name },
        {
          label: "COMPANY ADDRESS",
          info: data?.consignee_details?.company_address,
        },
        {
          label: "CONTACT PERSON",
          info: data?.consignee_details?.contact_person,
        },
        {
          label: "CONTACT NUMBER",
          info: data?.consignee_details?.contact_number,
        },
        { label: "EMAIL", info: data?.consignee_details?.contact_person },
      ],
    },
    {
      title: "SHIPMENT DETAILS",
      details: [
        { label: "SERVICE TYPE", info: data?.shipment_details?.service_type },
        {
          label: "FREIGHT TRANSPORT MODE",
          info: data?.shipment_details?.transport_mode,
        },
        { label: "SERVICE", info: data?.shipment_details?.commodity },
        { label: "COMMODITY", info: data?.shipment_details?.commodity },
        { label: "VOLUME (DIMENSION)", info: data?.shipment_details?.volume },
        { label: "ORIGIN", info: data?.shipment_details?.origin },
      ],
    },
    {
      title: "PERSON IN CHARGE",
      details: [
        { label: "ACCOUNT SPECIALIST", info: data?.shipment_details?.volume },
      ],
    },
  ];

  if (isLoading) {
    return (
      <View style={{flex: 1,}}>
        <ActivityIndicator animating={true} />
        <Text style={{ marginTop: 10, textAlign:"center" }}>Fetching quote details...</Text>
      </View>
    );
  }

  return (
    <>
      {copyData.map((datas, index) => (
        <View style={styles.container} key={index}>
          <Card style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
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
        </View>
      ))}
        {mode === "edit" ? (
        <Button
          mode="contained"
          buttonColor="#161F3C"
          textColor="white"
          style={{ borderRadius: 4 }}
          onPress={() => {
            navigate({
              pathname: routes.CLIENT_QUOTE_EDIT,
              params: { id: id },
            });
          }}
        >
          EDIT
        </Button>
      ) : (
        <Button>VIEW QUOTATION</Button>
      )}
    </>
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
