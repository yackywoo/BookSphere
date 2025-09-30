import { View, Button, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign In"
          onPress={() => router.push('/(auth)/signIn')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="PDF Viewer"
          onPress={() => router.push('/viewer')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '60%',
  },
});