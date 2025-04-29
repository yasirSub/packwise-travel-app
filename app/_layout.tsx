import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@react-navigation/native';

const theme = {
  dark: false,
  colors: {
    primary: '#0099cc',
    background: '#ffffff',
    card: '#ffffff',
    text: '#333333',
    border: '#f0f0f0',
    notification: '#ff3b30',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="new-trip" 
            options={{ 
              headerShown: false,
              presentation: 'modal'
            }} 
          />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}