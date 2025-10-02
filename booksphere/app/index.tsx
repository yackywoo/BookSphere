import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput , ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchBookPdfUrl } from '../services/api';

export default function Index() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      Alert.alert("Please enter book title");
      return;
    }
    setIsLoading(true);
    try {
      const pdfUrl = await fetchBookPdfUrl(searchText);
      router.push({ pathname: '/viewer', params: { url: pdfUrl }});
    } catch (error: any) {
      Alert.alert("Search Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign In"
          onPress={() => router.push('/(auth)/signIn')}
        />
      </View>

      {/* -- Search section -- */}
      <TextInput
        style={styles.input}
        placeholder="Search for a public domain book"
        value={searchText}
        onChangeText={setSearchText}
      />
      {isLoading ? (
        <ActivityIndicator size="large" style={{ marginVertical: 10 }}/>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Search and View"
            onPress={handleSearch}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: '60%',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});
