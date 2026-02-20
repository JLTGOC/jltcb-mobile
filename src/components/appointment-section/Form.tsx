import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, TextInput, List, Button } from "react-native-paper";

const LOCATIONS = [
  "sample Location 1",
  "sample Location 2",
  "sample Location 3",
  "sample Location 4",
  "sample Location 5",
  "sample Location 6",
  "sample Location 7",
  "sample Location 8",
] as const;

type MeetingLocation = (typeof LOCATIONS)[number];

type FormData = {
  meeting_location: MeetingLocation | null;
  full_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  message: string;
  service: string;
};

export default function Form() {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    meeting_location: null,
    full_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    message: "",
    service: "",
  });

  return (
    <ScrollView 
      contentContainerStyle={{ paddingBottom: 40 }} 
      keyboardShouldPersistTaps="handled" // Prevents the keyboard from closing when tapping the accordion
    >
      <View style={styles.container}>
        {/* Meeting Location */}
        <Text style={styles.label} allowFontScaling={false}>
          Meeting Location
        </Text>
        <List.Section style={{ padding: 0 }}>
          <List.Accordion
            title={formData.meeting_location ?? "Select Location"}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            left={() => null} 
          >
            {LOCATIONS.map((loc) => (
              <List.Item
                key={loc}
                title={loc}
                onPress={() => {
                  setFormData((prev) => ({
                    ...prev,
                    meeting_location: loc,
                  }));
                  setExpanded(false); 
                }}
                style={styles.accordionItem}
                titleStyle={styles.accordionItemTitle}
              />
            ))}
          </List.Accordion>
        </List.Section>

        {/* Full Name */}
        <Text style={styles.label} allowFontScaling={false}>
          Full Name
        </Text>
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="blue"
          mode="flat"
          style={styles.input}
          theme={{ roundness: 10 }}
          value={formData.full_name}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, full_name: text }))
          }
          allowFontScaling={false}
        />

        <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
          <View style={{ flex: 1 }}>
            {/* Email */}
            <Text style={styles.label} allowFontScaling={false}>
              Email
            </Text>
            <TextInput
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              selectionColor="blue"
              mode="flat"
              style={styles.input}
              theme={{ roundness: 10 }}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              allowFontScaling={false}
            />
          </View>
          <View style={{ flex: 1 }}>
            {/* Phone */}
            <Text style={styles.label} allowFontScaling={false}>
              Phone No.
            </Text>
            <TextInput
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              selectionColor="blue"
              mode="flat"
              style={styles.input}
              theme={{ roundness: 10 }}
              keyboardType="numeric"
              value={formData.phone_number}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, phone_number: text }))
              }
              allowFontScaling={false}
            />
          </View>
        </View>

        {/* Company */}
        <Text style={styles.label} allowFontScaling={false}>
          Company Name
        </Text>
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="blue"
          mode="flat"
          style={styles.input}
          theme={{ roundness: 10 }}
          value={formData.company_name}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, company_name: text }))
          }
          allowFontScaling={false}
        />

        {/* Message */}
        <Text style={styles.label} allowFontScaling={false}>
          Message
        </Text>
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="blue"
          mode="flat"
          style={[styles.input, { height: 100 }]} // Taller height for multiline
          theme={{ roundness: 10 }}
          multiline
          value={formData.message}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, message: text }))
          }
          allowFontScaling={false}
        />
      </View>

      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Button
          mode="contained"
          style={{
            borderRadius: 10,
            marginBottom: 30,
            width: 150,
          }}
          buttonColor={"#161F3C"}
          onPress={() => {
            setFormData({
              meeting_location: null,
              full_name: "",
              email: "",
              phone_number: "",
              company_name: "",
              message: "",
              service: "",
            });
          }}
        >
          SUBMIT
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
    gap: 1,
  },
  input: {
    borderRadius: 10,
    height: 40,
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 5,
    fontWeight: "400",
    fontSize: 14,
  },
  accordion: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  accordionTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
  },
  accordionItem: {
    backgroundColor: "#f9f9f9",
  },
  accordionItemTitle: {
    fontSize: 14,
    paddingVertical: 8,
  },
});