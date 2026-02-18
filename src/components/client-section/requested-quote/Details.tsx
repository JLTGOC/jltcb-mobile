import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Card,
  Divider,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import { Building2 } from "lucide-react-native";

import { fetchClientQuote } from "@/src/services/ClientQuote";
import { ClientQuoteResponse, QuoteForm } from "@/src/types/client";
import { useNavigate } from "@/src/hooks/useNavigate";
import { routes } from "@/src/constants/routes";

type Props = {
  id?: string;
  mode?: string;
};
export default function Details({ id, mode }: Props) {
  const { navigate } = useNavigate();

  const { data, isLoading, error } = useQuery<QuoteForm>({
    queryKey: [id],
    queryFn: () => fetchClientQuote(id as any),
    enabled: !!id,
  });

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
          info: data?.company?.contact_person,
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
        { label: "COMMODITY", info: data?.commodity?.container_size },
        { label: "VOLUME (DIMENSION)", info: data?.commodity?.cargo_volume },
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
      {mode === "edit" ? (
        <Button
          mode="contained"
          buttonColor="#161F3C"
          textColor="white"
          style={{ borderRadius: 4 }}
          onPress={() => {
            navigate({
              pathname: "/(client)/quotations",
              params: {
                id: id,
                mode: mode,
              },
            });
          }}
        >
          EDIT
        </Button>
      ) : (
        <Button>VIEW QUOTATION</Button>
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
