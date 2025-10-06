import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';
import { Text } from './Themed';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

export default function LoadingSpinner({ message, size = 'large' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    color: colors.textLight,
    fontSize: typography.sizes.md,
    marginTop: spacing.md,
    textAlign: 'center',
  },
}); 