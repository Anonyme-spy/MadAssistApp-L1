import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as _useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useColorScheme() {
  const systemColorScheme = _useSystemColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemColorScheme);

  useEffect(() => {
    // Load theme preference from AsyncStorage
    const loadTheme = async () => {
      try {
        // Check for theme preference first
        const themePref = await AsyncStorage.getItem('theme_preference');

        if (themePref !== null) {
          const index = parseInt(themePref);
          if (index === 0) {
            setColorScheme('light');
          } else if (index === 1) {
            setColorScheme('dark');
          } else {
            setColorScheme(systemColorScheme || 'light');
          }
        } else {
          // Fallback to direct color scheme if available
          const savedColorScheme = await AsyncStorage.getItem('colorScheme');
          if (savedColorScheme === 'light' || savedColorScheme === 'dark') {
            setColorScheme(savedColorScheme as ColorSchemeName);
          }
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [systemColorScheme]);

  return colorScheme;
}