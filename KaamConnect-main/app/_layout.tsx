import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FAFAFA" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="request" options={{ presentation: 'modal' }} />
        <Stack.Screen name="providers" options={{ title: 'Matching Providers' }} />
        <Stack.Screen name="provider/[id]" options={{ title: 'Provider Details' }} />
        <Stack.Screen name="booking/[id]" options={{ title: 'Booking Confirmed' }} />
        <Stack.Screen name="trace/[id]" options={{ title: 'Agent Trace' }} />
        <Stack.Screen name="history" options={{ title: 'Booking History' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="demo" options={{ title: 'Demo Mode' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
