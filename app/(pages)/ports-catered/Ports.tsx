import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import ports, { PortData, PortItem, Region } from "./portsPlace";

export default function Ports() {
  const [activeRegion, setActiveRegion] = useState<Region>("Luzon");
  const [expandedPorts, setExpandedPorts] = useState<string[]>([]);

  // helper to get ports for activeRegion
  const getRegionPorts = (item: PortItem): PortData[] | undefined => {
    if (activeRegion === "Luzon") return item.Luzon;
    if (activeRegion === "Visayas") return item.Visayas;
    if (activeRegion === "Mindanao") return item.Mindanao;
    return undefined;
  };

  function handleExpandCardPort(portName: string) {
    if (expandedPorts.includes(portName)) {
      setExpandedPorts((prevExpandedPorts) => {
        const nextExpandedPorts = prevExpandedPorts.filter(
          (port) => port !== portName,
        );
        return nextExpandedPorts;
      });
      return;
    }
    setExpandedPorts((e) => [...e, portName]);
  }

  const isExpanded = (portName: string) => expandedPorts.includes(portName);

  return (
    <View style={{ marginHorizontal: 10, gap: 10 }}>
      {/* Region Selector Buttons */}
      <FlatList
        data={ports}
        horizontal
        keyExtractor={(item) => item.region}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const isActive = activeRegion === item.region;
          return (
            <Button
              mode="outlined"
              style={{
                borderColor: isActive ? "#EE9034" : "#888888ff",
                backgroundColor: isActive ? "#EE9034" : "#ffffff",
                borderRadius: 2,
                height: 40,
                marginRight: 10,
              }}
              labelStyle={{
                color: isActive ? "#ffffff" : "#888888ff",
              }}
              onPress={() => setActiveRegion(item.region as Region)}
            >
              {item.region}
            </Button>
          );
        }}
      />

      {/* Ports List for Active Region */}
      {ports.map((region) => {
        const regionPorts = getRegionPorts(region);
        if (!regionPorts) return null;

        return (
          <FlatList
            style={{ paddingBlockEnd: 12 }}
            key={region.region} // FlatList needs a unique key
            data={regionPorts}
            keyExtractor={(port) => port.port}
            renderItem={({ item: portItem }) => (
              <Card
                onPress={() => handleExpandCardPort(portItem.port)}
                style={{ marginVertical: 4 }}
              >
                <Card.Content
                  style={{ paddingVertical: 8, paddingHorizontal: 12 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Ionicons name="boat" size={18} />
                      <Text allowFontScaling={false}>{portItem.port}</Text>
                    </View>
                    <Button
                      compact
                      contentStyle={{
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                      }}
                    >
                      {isExpanded(portItem.port) ? (
                        <Ionicons
                          name="arrow-up-circle"
                          size={22}
                          color="#EE9034"
                        />
                      ) : (
                        <Ionicons
                          name="arrow-down-circle"
                          size={22}
                          color="#EE9034"
                        />
                      )}
                    </Button>
                  </View>
                  {isExpanded(portItem.port) && (
                    <View
                      style={{
                        paddingBlock: 8,
                      }}
                    >
                      {portItem.subPorts.length > 0 ? (
                        <FlatList
                          data={portItem.subPorts}
                          renderItem={({ item }) => (
                            <Text key={item} allowFontScaling={false}>
                              • {item}
                            </Text>
                          )}
                        />
                      ) : (
                        <Text allowFontScaling={false}>No Sub-Ports!</Text>
                      )}
                    </View>
                  )}
                </Card.Content>
              </Card>
            )}
          />
        );
      })}
    </View>
  );
}
