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

// Empêche l'écran de démarrage de se cacher automatiquement avant que le chargement des ressources soit terminé
SplashScreen.preventAutoHideAsync();

import { ThemeProviderCustom, useThemeContext } from '@/components/ThemedContext';

// Composant pour gérer et afficher les erreurs dans l'application
function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <View>
      <Text>Something went wrong!</Text>
      <Text>{error.message}</Text>
    </View>
  );
}

// Composant principal de navigation qui configure les thèmes et les routes
function RootLayoutNav() {
  // Récupère le thème actuel depuis le contexte personnalisé
  const { theme } = useThemeContext();

  return (
    <>
      {/* Configuration du registre d'icônes pour UI Kitten */}
      <IconRegistry icons={EvaIconsPack} />

      {/* Fournisseur de thème pour les composants UI Kitten */}
      <ApplicationProvider {...eva} theme={theme === 'dark' ? eva.dark : eva.light}>

        {/* Fournisseur de thème pour React Navigation */}
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>

          {/* Configuration des écrans de navigation principaux */}
          <Stack>
            {/* Écran des onglets principaux (sans en-tête) */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </ApplicationProvider>
    </>
  );
}

// Point d'entrée principal de l'application
export default function RootLayout() {
  // Chargement des polices personnalisées pour l'application
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Ajoutez d'autres polices ici si nécessaire
  });

  // Masque l'écran de démarrage une fois les polices chargées ou en cas d'erreur
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Affiche rien pendant le chargement des polices
  if (!loaded) return null;

  // Retourne l'application avec le fournisseur de thème personnalisé
  return (
    <ThemeProviderCustom>
      <RootLayoutNav />
    </ThemeProviderCustom>
  );
}