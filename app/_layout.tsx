import React from 'react';
import { View, Text } from '@/components/Themed';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { ThemeProviderCustom, useThemeContext } from '@/components/ThemedContext';
function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <View>
      <Text>Something went wrong!</Text>
      <Text>{error.message}</Text>
    </View>
  );
}

function RootLayoutNav() {
  const { theme } = useThemeContext();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme === 'dark' ? eva.dark : eva.light}>
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="parameter" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </ApplicationProvider>
    </>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Add other fonts here if needed
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) return null;

  return (
    <ThemeProviderCustom>
      <RootLayoutNav />
    </ThemeProviderCustom>
  );
}