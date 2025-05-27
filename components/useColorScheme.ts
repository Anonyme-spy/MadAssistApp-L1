import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { getThemePreference, ThemePreference } from '@/components/utils/theme';

export function useColorScheme() {
  const [theme, setTheme] = useState<ThemePreference>('auto');
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    getThemePreference().then(pref => {
      setTheme(pref);
      if (pref === 'auto') {
        setColorScheme(Appearance.getColorScheme());
      } else {
        setColorScheme(pref);
      }
    });

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'auto') {
        setColorScheme(colorScheme);
      }
    });

    return () => listener.remove();
  }, [theme]);

  return colorScheme;
}