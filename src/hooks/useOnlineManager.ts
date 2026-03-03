import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'
import * as React from 'react'
import { Platform } from 'react-native'

export function useOnlineManager() {
  React.useEffect(() => {
    if (Platform.OS === 'web') return

    onlineManager.setEventListener((setOnline) => {
      let initialised = false

      const subscription = Network.addNetworkStateListener((state) => {
        initialised = true
        setOnline(!!state.isConnected)
      })

      Network.getNetworkStateAsync()
        .then((state) => {
          if (!initialised) {
            setOnline(!!state.isConnected)
          }
        })
        .catch(() => {
          // getNetworkStateAsync can reject on some SDK versions
        })

      return () => {
        subscription.remove()
      }
    })
  }, [])
}