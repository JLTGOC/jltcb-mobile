import { useState } from "react";
import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import ports from "./ports";

export default function Ports() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <FlatList
      data={ports}
      horizontal
      keyExtractor={(item) => item.region}
      renderItem={({ item }) => {
        const isActive = activeRegion === item.region;

        return (
          <View style={{padding:10}}>
            <View>
              <Button
                mode="outlined"
                style={{
                  borderColor: isActive ? "#EE9034" : "#888888ff",
                  backgroundColor: isActive ? "#EE9034" : "#ffffff",
                  borderRadius: 2,
                  marginRight: 8,
                }}
                labelStyle={{
                  color: isActive ? "#ffffff" : "#888888ff",
                }}
                onPress={() =>
                  setActiveRegion(
                    activeRegion === item.region ? null : item.region
                  )
                }
              >
                {item.region}
              </Button>
            </View>
            <View>
                
            </View>
          </View>
        );
      }}
    />
  );
}
