import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import PdfViewer from '../components/PdfViewer';

// const pdfSource = require('../assets/Syllabus.pdf');
export default function ViewerScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  if (!url) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text>No PDF URL provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const pdfSource = { uri : url, cache: true };
  return (
    <SafeAreaView style={styles.container}>
      <PdfViewer source={pdfSource} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});