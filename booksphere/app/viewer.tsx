import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PdfViewer from '../components/PdfViewer';

const pdfSource = require('../assets/Syllabus.pdf');

export default function ViewerScreen() {
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
});