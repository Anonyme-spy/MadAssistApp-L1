import AsyncStorage from '@react-native-async-storage/async-storage';

// Type définissant les options de thème possibles dans l'application
export type ThemePreference = 'light' | 'dark' | 'auto';

// Clé utilisée pour stocker la préférence de thème dans AsyncStorage
const THEME_KEY = 'theme_preference';

/**
 * Enregistre la préférence de thème de l'utilisateur dans le stockage local
 * @param theme - Le thème choisi par l'utilisateur ('light', 'dark' ou 'auto')
 */
export async function setThemePreference(theme: ThemePreference) {
  await AsyncStorage.setItem(THEME_KEY, theme);
}

/**
 * Récupère la préférence de thème de l'utilisateur depuis le stockage local
 * @returns La préférence de thème ('light', 'dark' ou 'auto')
 * @default 'light' - Retourne le thème clair par défaut si aucune préférence n'est trouvée
 */
export async function getThemePreference(): Promise<ThemePreference> {
  const value = await AsyncStorage.getItem(THEME_KEY);
  if (value === 'light' || value === 'dark' || value === 'auto') {
    return value;
  }
  // Par défaut, utilise le thème clair si aucune préférence n'est enregistrée
  return 'light';
}