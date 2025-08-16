import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ButtonGroup } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useThemeContext } from '@/components/ThemedContext';
import { ThemePreference } from '@/components/utils/theme';
import React, { useEffect, useState, useMemo } from 'react';

const themeIndexMap: Record<ThemePreference, number> = {
  light: 0,
  dark: 1,
  auto: 2,
};
const indexThemeMap: Record<number, ThemePreference> = {
  0: 'light',
  1: 'dark',
  2: 'auto',
};

export default function ParameterScreen() {
  const { preference, setPreference, theme } = useThemeContext();
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(themeIndexMap[preference]);

  useEffect(() => {
    setSelectedThemeIndex(themeIndexMap[preference]);

  }, [preference]);

  const handleThemeChange = (index: number) => {
    setSelectedThemeIndex(index);
    setPreference(indexThemeMap[index]);
  };



// Dans le composant, remplacez la définition de buttons par :
  const buttons = useMemo(() => [
    { element: () => <FontAwesome name="sun-o" size={20} color={theme === 'dark' ? 'white' : 'black'} /> },
    { element: () => <FontAwesome name="moon-o" size={20} color={theme === 'dark' ? 'white' : 'black'} /> },
    { element: () => <FontAwesome name="magic" size={20} color={theme === 'dark' ? 'white' : 'black'} /> }
  ], [theme]);

  return (
      <View style={{...baseThemedStyle, ...styles.container}}>
        <Text style={{
          ...baseThemedStyle,
          ...styles.title,
          color: theme === 'dark' ? 'white' : 'black'
        }}>Paramètres</Text>

        <View style={{...baseThemedStyle, ...styles.section}}>
          <Text style={{
            ...baseThemedStyle,
            ...styles.sectionTitle,
            color: theme === 'dark' ? 'white' : 'black'
          }}>Thème</Text>
          <Text style={{
            ...baseThemedStyle,
            ...styles.description,
            color: theme === 'dark' ? 'white' : 'black'
          }}>
            Choisissez votre mode d'affichage préféré
          </Text>

          <ButtonGroup
              buttons={buttons}
              selectedIndex={selectedThemeIndex}
              onPress={handleThemeChange}
              containerStyle={styles.buttonGroupContainer}
              selectedButtonStyle={styles.selectedButton}
          />

          <View style={{
            ...baseThemedStyle,
            ...styles.themeLabels,
            padding: 0
          }}>
            <Text style={{
              ...baseThemedStyle,
              ...styles.themeLabel,
              color: theme === 'dark' ? 'white' : 'black'
            }}>Clair</Text>
            <Text style={{
              ...baseThemedStyle,
              ...styles.themeLabel,
              color: theme === 'dark' ? 'white' : 'black'
            }}>Sombre</Text>
            <Text style={{
              ...baseThemedStyle,
              ...styles.themeLabel,
              color: theme === 'dark' ? 'white' : 'black'
            }}>Auto</Text>
          </View>
        </View>

        <View style={{
          ...baseThemedStyle,
          ...styles.separator
        }} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    opacity: 0.8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonGroupContainer: {
    borderRadius: 12,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: '#334ec4',
  },
  themeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  themeLabel: {
    fontSize: 14,
  }
});