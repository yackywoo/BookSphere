// just in case, do no route to this file directly!!

import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text as ThemedText } from '../components/Themed';

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.content}>
        <ThemedText style={styles.title}>This screen doesn&apos;t exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText style={styles.linkText}>Go to home screen!</ThemedText>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: '#0a7ea4',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
