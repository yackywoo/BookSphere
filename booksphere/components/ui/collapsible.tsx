import React, { useState, type PropsWithChildren } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text'; // This path assumes themed-text.tsx is in the parent 'components' folder

export function Collapsible({ children, title }: PropsWithChildren<{ title: string }>) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <ThemedText type="subtitle">{title}</ThemedText>
        <Text>{isExpanded ? '−' : '+'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#eee',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
  },
  content: {
    padding: 16,
    backgroundColor: '#f6f6f6',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});