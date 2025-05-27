import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, useColorScheme as _useSystemColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonGroup } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { baseThemedStyle } from "@/constants/baseThemedStyle";

const THEME_KEY = 'theme_preference';

export default function ParameterScreen() {
  const colorScheme = useColorScheme();
  const systemColorScheme = _useSystemColorScheme();
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(2); // Default to Auto

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme !== null) {
          setSelectedThemeIndex(parseInt(savedTheme));
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Apply theme function
  const applyTheme = async (index: number) => {
    let newTheme;
    if (index === 0) newTheme = 'light';
    else if (index === 1) newTheme = 'dark';
    else newTheme = systemColorScheme || 'light';

    // Force re-render with new theme
    return newTheme;
  };

  // Save theme preference when changed
  const updateTheme = async (index: number) => {
    setSelectedThemeIndex(index);
    try {
      await AsyncStorage.setItem(THEME_KEY, index.toString());

      // Apply the theme
      const theme = await applyTheme(index);

      // This is a global approach - you need to implement a proper theme context
      // that will re-render components using the theme
      if (index === 0) {
        await AsyncStorage.setItem('colorScheme', 'light');
      } else if (index === 1) {
        await AsyncStorage.setItem('colorScheme', 'dark');
      } else {
        await AsyncStorage.setItem('colorScheme', systemColorScheme || 'light');
      }

      // Force reload the app to apply changes
      // Note: In a production app, you'd use a context provider to avoid this
      setTimeout(() => {
        // This is a hack - ideally, you'd update a theme context
        if (Platform.OS === 'web') {
          window.location.reload();
        }
      }, 100);

    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const buttons = [
    { element: () => <FontAwesome name="sun-o" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} /> },
    { element: () => <FontAwesome name="moon-o" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} /> },
    { element: () => <FontAwesome name="magic" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} /> }
  ];

  return (
    <View style={{...baseThemedStyle, ...styles.container}}>
      <Text style={{...baseThemedStyle, ...styles.title}}>Paramètres</Text>

      <View style={{...baseThemedStyle, ...styles.section}}>
        <Text style={{...baseThemedStyle, ...styles.sectionTitle}}>Thème</Text>
        <Text style={{...baseThemedStyle, ...styles.description}}>
          Choisissez votre mode d'affichage préféré
        </Text>

        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedThemeIndex}
          onPress={updateTheme}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.selectedButton}
        />

        <View style={{
          ...baseThemedStyle,
          ...styles.themeLabels,
          padding: 0
        }}>
          <Text style={{...baseThemedStyle,...styles.themeLabel }}>Clair</Text>
          <Text style={{...baseThemedStyle,...styles.themeLabel }}>Sombre</Text>
          <Text style={{...baseThemedStyle,...styles.themeLabel }}>Auto</Text>
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