import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Explore BookSphere</Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
          <Text style={[styles.description, { color: colors.icon }]}>
            Discover books, manage your reading list, and connect with other readers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Authentication</Text>
          <Text style={[styles.description, { color: colors.icon }]}>
            Sign up or sign in to access your personalized book collection and reading progress.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Coming Soon</Text>
          <Text style={[styles.description, { color: colors.icon }]}>
            • Book recommendations{'\n'}
            • Reading progress tracking{'\n'}
            • Social features{'\n'}
            • Book reviews and ratings
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={() => Linking.openURL('https://docs.expo.dev/router/introduction')}
        >
          <Ionicons name="book" size={20} color="white" />
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
