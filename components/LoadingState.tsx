import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';
import { Text } from './Themed';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color: colors.textLight,
    fontSize: typography.sizes.md,
    marginTop: spacing.md,
  },
}); 