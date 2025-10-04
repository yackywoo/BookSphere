import { AuthProvider } from '../contexts/AuthContext';
import { AuthGuard } from '../components/AuthGuard';
import { Stack } from 'expo-router';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // Main app: show Tabs
        <>
          <Stack.Screen name="(tabs)/index" />
        </>
      ) : (
        // Auth flow: first screen is signIn
        <>
          <Stack.Screen name="(auth)/signIn" options={{ title: "Sign In" }} />
          <Stack.Screen name="(auth)/signUp" options={{ title: "Sign Up" }} />
        </>
      )}
    </Stack>
=======
    <AuthProvider>
      <AuthGuard>
        <Stack>{children}</Stack>
      </AuthGuard>
    </AuthProvider>
>>>>>>> 1eb93055114a9bc0f4f289f68542009ea1ebe754
  );
}
