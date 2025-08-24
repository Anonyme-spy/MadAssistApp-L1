import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, SafeAreaView, View, Pressable, FlatList } from 'react-native';
import { Text } from '@/components/Themed';
import ControlledSearchBar from "@/components/ControlledSearchBar";
import { ListAppel } from "@/components/list";
import { useLocalSearchParams } from 'expo-router';
import contactsDataFr from "@/DataBase/contact.json";
import contactsDataEn from "@/DataBase/contact-en.json";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/LanguageContext';
import { useThemeContext } from '@/components/ThemedContext';

// Composant CustomTabItem en dehors pour éviter les re-renders inutiles
const CustomTabItem = React.memo(({ title, isActive, onPress, theme }: {
  title: string;
  isActive: boolean;
  onPress: () => void;
  theme: string;
}) => (
    <Pressable
        onPress={onPress}
        style={[
          styles.customTabButton,
          {
            backgroundColor: isActive
                ? (theme === 'dark' ? '#4DABF7' : '#007BFF')
                : 'transparent',
            borderColor: theme === 'dark' ? '#404040' : '#E9ECEF',
          }
        ]}
    >
      <Text style={[
        styles.customTabTitle,
        {
          color: isActive
              ? '#FFFFFF'
              : (theme === 'dark' ? '#B0B0B0' : '#6C757D'),
          fontWeight: isActive ? '600' : '500'
        }
      ]}>
        {title}
      </Text>
    </Pressable>
));

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme } = useThemeContext();
  const { tabIndex } = useLocalSearchParams();
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);

  // Initialiser l'index une seule fois
  useEffect(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      if (!isNaN(parsedIndex) && parsedIndex < 5) {
        setIndex(parsedIndex);
      }
    }
  }, [tabIndex]);

  // Mémoriser les contacts pour éviter les re-renders inutiles
  const contacts = useMemo(() =>
          language === 'fr' ? contactsDataFr.emergencyContacts : contactsDataEn.emergencyContacts,
      [language]
  );

  // Mémoriser la fonction de filtrage pour optimisation
  const getFilteredContacts = useCallback((category: string) => {
    if (category === 'all') return contacts;

    const categoryMap: { [key: string]: string } = {
      'health': 'health',
      'security': 'security',
      'fire': 'fire',
      'insurance': 'insurance',
    };

    const jsonCategory = categoryMap[category];
    return contacts.filter(contact => contact.category === jsonCategory);
  }, [contacts]);

  // Mémoriser les données actuelles
  const currentData = useMemo(() => {
    switch (index) {
      case 1: return getFilteredContacts('health');
      case 2: return getFilteredContacts('security');
      case 3: return getFilteredContacts('fire');
      case 4: return getFilteredContacts('insurance');
      default: return getFilteredContacts('all');
    }
  }, [index, getFilteredContacts]);

  // Callback pour la recherche
  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  // Callback pour changer d'onglet
  const handleTabPress = useCallback((newIndex: number) => {
    setIndex(newIndex);
  }, []);

  // Mémoriser les données des onglets
  const tabData = useMemo(() => [
    { key: '0', title: t('contacts.categories.all'), index: 0 },
    { key: '1', title: t('contacts.categories.health'), index: 1 },
    { key: '2', title: t('contacts.categories.security'), index: 2 },
    { key: '3', title: t('contacts.categories.fire'), index: 3 },
    { key: '4', title: t('contacts.categories.insurance'), index: 4 },
  ], [t]);

  // Render function pour les onglets
  const renderTabItem = useCallback(({ item }: { item: any }) => (
      <CustomTabItem
          title={item.title}
          isActive={index === item.index}
          onPress={() => handleTabPress(item.index)}
          theme={theme}
      />
  ), [index, handleTabPress, theme]);

  return (
      <SafeAreaView style={[
        styles.safeArea,
        { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
      ]}>
        {/* Header séparé en dehors de ListAppel */}
        <View style={styles.searchContainer}>
          <ControlledSearchBar
              value={searchText}
              onChangeText={handleSearchChange}
              placeholder={t('contacts.searchPlaceholder')}
          />
        </View>

        <View style={[
          styles.tabContainer,
          { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
        ]}>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={tabData}
              renderItem={renderTabItem}
              contentContainerStyle={styles.tabBarContent}
              keyExtractor={(item) => item.key}
          />
        </View>

        {/* Liste principale sans header */}
        <ListAppel
            data={currentData}
            searchText={searchText}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  tabBarContent: {
    alignItems: 'center',
    paddingHorizontal: 0,
    gap: 0,
  },
  customTabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  customTabTitle: {
    fontSize: 11,
    textAlign: 'center',
  },
});