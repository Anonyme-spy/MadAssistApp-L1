import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark' | 'auto';

const THEME_KEY = 'theme_preference';

export async function setThemePreference(theme: ThemePreference) {
  await AsyncStorage.setItem(THEME_KEY, theme);
}

export async function getThemePreference(): Promise<ThemePreference> {
  const value = await AsyncStorage.getItem(THEME_KEY);
  if (value === 'light' || value === 'dark' || value === 'auto') {
    return value;
  }
  return 'auto';
}