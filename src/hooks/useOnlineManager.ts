import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import * as React from "react";
import { Platform } from "react-native";

export function useOnlineManager() {
  React.useEffect(() => {
    if (Platform.OS === "web") return;

    let initialised = false;

    const eventSubscription = Network.addNetworkStateListener((state) => {
      initialised = true;
      onlineManager.setOnline(!!state.isConnected);
    });

    Network.getNetworkStateAsync()
      .then((state) => {
        if (!initialised) {
          onlineManager.setOnline(!!state.isConnected);
        }
      })
      .catch(() => {
        // getNetworkStateAsync can reject on some SDK versions
      });

    return eventSubscription.remove;
  }, []);
}
