import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './Themed';

interface NetworkStatusProps {
  showOnlyWhenOffline?: boolean;
}

export default function NetworkStatus({ showOnlyWhenOffline = true }: NetworkStatusProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
    });

    // Get initial state
    NetInfo.fetch().then((state: NetInfoState) => {
      setIsConnected(state.isConnected);
    });

    return unsubscribe;
  }, []);

  // Don't show anything if we're connected and showOnlyWhenOffline is true
  if (showOnlyWhenOffline && isConnected !== false) {
    return null;
  }

  // Don't show anything if we haven't determined connection status yet
  if (isConnected === null) {
    return null;
  }

  return (
    <View style={[styles.container, isConnected ? styles.online : styles.offline]}>
      <Text style={[styles.text, isConnected ? styles.onlineText : styles.offlineText]}>
        {isConnected ? 'Online' : 'Offline - Check your internet connection'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  offline: {
    backgroundColor: '#ffe8e8',
  },
  offlineText: {
    color: '#d32f2f',
  },
  online: {
    backgroundColor: '#e8f5e8',
  },
  onlineText: {
    color: '#2d5a2d',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 