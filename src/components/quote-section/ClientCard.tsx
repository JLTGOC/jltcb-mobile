import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useAuth } from "@/hooks/useAuth";
import { useUserQuery } from "@/hooks/useUserQuery";

export interface ClientCardProps {
  clientId: string;
  conversationId: string | null;
}

export default function ClientCard({
  clientId,
  conversationId,
}: ClientCardProps) {
  const router = useRouter();
  const { role } = useAuth();
  const { data: clientData, isPending } = useUserQuery(clientId);

  const handleConversationPress = async () => {
    if (conversationId) {
      router.navigate({
        pathname: "/messages/[id]",
        params: { id: conversationId },
      });
    }
  };

  if (isPending) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!clientData?.data) {
    return null;
  }

  const { full_name, image_path, company_name, contact_number, email } =
    clientData.data;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image_path} />
        </View>
        <Text style={styles.headerText}>{full_name}</Text>
        {role !== "Lead Account Specialist" && conversationId && (
          <Pressable onPress={handleConversationPress}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="black"
            />
          </Pressable>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.contentRow}>
          <Text style={styles.label}>Company Name</Text>
          <Text style={[styles.value, styles.blue]}>{company_name}</Text>
        </View>

        <View style={styles.contentRow}>
          <Text style={styles.label}>Contact No.</Text>
          <Text style={[styles.value, styles.blue]}>{contact_number}</Text>
        </View>

        <View style={styles.contentRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#D4DAE0",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  imageContainer: {
    borderRadius: 42,
    width: 42,
    height: 42,
    backgroundColor: "#4E6174",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 36,
    width: 36,
    height: 36,
  },
  headerText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    flex: 1,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 4,
  },
  contentRow: {
    flexDirection: "row",
  },
  label: {
    textTransform: "uppercase",
    width: "40%",
  },
  value: {
    textTransform: "uppercase",
    flex: 1,
  },
  blue: {
    color: "#1D274E",
  },
  loader: {
    marginVertical: 8,
  },
});
