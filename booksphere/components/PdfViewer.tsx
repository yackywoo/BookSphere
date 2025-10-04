import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Text, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Pdf, { type PdfProps } from 'react-native-pdf';

interface PdfViewerProps {
  source: PdfProps['source'];
}

export default function PdfViewer({ source }: PdfViewerProps) {
  // Comment stuff
  const [comments, setComments] = useState<{id: string, user: string, text: string}[]>([]);
  const [newComment, setNewComment] = useState('')


  // Page stuff
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.pdfViewContainer}>
        <Pdf
          source={source}
          trustAllCerts={false}
          onLoadComplete={(numberOfPages: number) => {
            console.log(`Total pages loaded: ${numberOfPages}`)
            setTotalPages(numberOfPages);
            setIsLoading(false);
          }}
          onPageChanged={(page: number, numberOfPages: number) => {
            console.log(`Page turned: ${page}`)
            setCurrentPage(page);
          }}
          onError={(error: Error) => {
            console.log(error);
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

      {!isLoading && (
        <View style={styles.uiOverlay}>

          {/* Page count */}
          <View style={styles.pageCountContainer}>
            <Text style={styles.pageCountText}>
              Page {currentPage} of {totalPages}
            </Text>
          </View>

          {/* Comment section */}
          <View style={styles.commentSectionContainer}>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Share your thoughts..."
                placeholderTextColor="#999"
                value={newComment}
                onChangeText={setNewComment}
              />
              <Button title="Post"/>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  pdfViewContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  uiOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageCountContainer: {
    marginTop: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
  },
  pageCountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentSectionContainer: {
    width: '100%',
    maxHeight: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  commentList: {
    flex: 1,
  },
  comment: {
    padding: 8,
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#fff',
  },
  commentText: {
    color: '#ddd',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#555',
    paddingTop: 10,
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    color: '#fff',
  },
});