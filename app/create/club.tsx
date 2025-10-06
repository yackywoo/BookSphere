import { Text } from '@/components/Themed';
import { db } from '@/config/firebase';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Firestore, addDoc, collection, runTransaction, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export default function CreateClubScreen() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCoverUrl, setBookCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateClub = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a club');
      return;
    }

    if (!name || !description || !bookTitle || !bookAuthor) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!db) {
      Alert.alert('Error', 'Database is not initialized');
      return;
    }

    try {
      setLoading(true);

      await runTransaction(db as Firestore, async (transaction) => {
        // Create the book document
        const booksRef = collection(db as Firestore, 'books');
        const bookDoc = await addDoc(booksRef, {
          title: bookTitle,
          author: bookAuthor,
          coverUrl: bookCoverUrl || null,
          createdAt: serverTimestamp(),
          createdBy: user.uid,
        });

        // Create the club document
        const clubsRef = collection(db as Firestore, 'clubs');
        const clubDoc = await addDoc(clubsRef, {
          name: name.trim(),
          description: description.trim(),
          bookId: bookDoc.id,
          createdBy: user.uid,
          memberCount: 1,
          createdAt: serverTimestamp(),
          imageUrl: bookCoverUrl || null,
        });

        // Add the creator as the first member
        const membersRef = collection(db as Firestore, 'club_members');
        await addDoc(membersRef, {
          clubId: clubDoc.id,
          userId: user.uid,
          role: 'admin',
          joinedAt: serverTimestamp(),
        });

        return { clubId: clubDoc.id };
      });

      const { clubId } = await runTransaction(db as Firestore, async (transaction) => {
        // Create the book document
        const booksRef = collection(db as Firestore, 'books');
        const bookDoc = await addDoc(booksRef, {
          title: bookTitle,
          author: bookAuthor,
          coverUrl: bookCoverUrl || null,
          createdAt: serverTimestamp(),
          createdBy: user.uid,
        });

        // Create the club document
        const clubsRef = collection(db as Firestore, 'clubs');
        const clubDoc = await addDoc(clubsRef, {
          name: name.trim(),
          description: description.trim(),
          bookId: bookDoc.id,
          createdBy: user.uid,
          memberCount: 1,
          createdAt: serverTimestamp(),
          imageUrl: bookCoverUrl || null,
        });

        // Add the creator as the first member
        const membersRef = collection(db as Firestore, 'club_members');
        await addDoc(membersRef, {
          clubId: clubDoc.id,
          userId: user.uid,
          role: 'admin',
          joinedAt: serverTimestamp(),
        });

        return { clubId: clubDoc.id };
      });

      Alert.alert('Success', 'Club created successfully', [
        {
          text: 'OK',
          onPress: () => router.push({
            pathname: '/clubs/[id]',
            params: { id: clubId }
          }),
        },
      ]);
    } catch (err) {
      console.error('Error creating club:', err);
      if (err instanceof Error) {
        Alert.alert('Error', err.message || 'Failed to create club');
      } else {
        Alert.alert('Error', 'An unexpected error occurred while creating the club');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={24} color="#0a7ea4" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Club Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter club name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your club"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Book Title *</Text>
            <TextInput
              style={styles.input}
              value={bookTitle}
              onChangeText={setBookTitle}
              placeholder="Enter book title"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Book Author *</Text>
            <TextInput
              style={styles.input}
              value={bookAuthor}
              onChangeText={setBookAuthor}
              placeholder="Enter book author"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Book Cover URL</Text>
            <TextInput
              style={styles.input}
              value={bookCoverUrl}
              onChangeText={setBookCoverUrl}
              placeholder="Enter book cover image URL"
              placeholderTextColor="#999"
            />
          </View>

          {bookTitle && bookAuthor && (
            <View style={styles.bookPreview}>
              <Text style={styles.previewTitle}>Book Preview</Text>
              {/* <BookInfo
                title={bookTitle}
                author={bookAuthor}
                coverUrl={bookCoverUrl}
              /> */}
            </View>
          )}

          <TouchableOpacity
            style={[styles.createButton, loading && styles.createButtonDisabled]}
            onPress={handleCreateClub}
            disabled={loading}
          >
            <FontAwesome name="plus" size={20} color="#fff" />
            <Text style={styles.createButtonText}>
              {loading ? 'Creating...' : 'Create Club'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  bookPreview: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 24,
    marginTop: 24,
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 16,
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  input: {
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    padding: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
}); 