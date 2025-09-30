import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewer({ source }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={() => {
          setIsLoading(false); 
        }}
        onError={(error) => {
          console.error(error);
          setIsLoading(false);
        }}
        style={styles.pdf}
      />

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
