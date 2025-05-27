import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { getThemePreference, setThemePreference, ThemePreference } from '@/components/utils/theme';

type ThemeContextType = {
  theme: 'light' | 'dark';
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  preference: 'auto',
  setPreference: () => {},
});

export const ThemeProviderCustom: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [preference, setPref] = useState<ThemePreference>('auto');
  const [theme, setTheme] = useState<'light' | 'dark'>(Appearance.getColorScheme() ?? 'light');

  useEffect(() => {
    getThemePreference().then(pref => setPref(pref));
  }, []);

  useEffect(() => {
    if (preference === 'auto') {
      setTheme(Appearance.getColorScheme() ?? 'light');
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(colorScheme ?? 'light');
      });
      return () => listener.remove();
    } else {
      setTheme(preference);
    }
  }, [preference]);

  const setPreference = (pref: ThemePreference) => {
    setPref(pref);
    setThemePreference(pref);
  };

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);