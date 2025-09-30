import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewer({ source }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {/* The PDF component will take up the full space and be scrollable by default */}
      <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={() => {
          setIsLoading(false); // Turn off the loader when the PDF is ready
        }}
        onError={(error) => {
          console.error(error);
          setIsLoading(false);
        }}
        style={styles.pdf}
      />

      {/* A simple loading indicator that overlays the view */}
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});