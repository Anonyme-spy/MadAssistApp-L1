import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Pressable, FlatList } from 'react-native';
import { Text } from '@/components/Themed';
import Search from "@/components/SearchBar";
import { ListAppel } from "@/components/list";
import { useLocalSearchParams } from 'expo-router';
import contactsDataFr from "@/DataBase/contact.json";
import contactsDataEn from "@/DataBase/contact-en.json";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/LanguageContext';
import { useThemeContext } from '@/components/ThemedContext';

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme } = useThemeContext();
  const { tabIndex } = useLocalSearchParams();
  const [searchText, setSearchText] = useState('');

  const [index, setIndex] = useState(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      return !isNaN(parsedIndex) && parsedIndex < 5 ? parsedIndex : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      if (!isNaN(parsedIndex)) {
        setIndex(parsedIndex);
      }
    }
  }, [tabIndex]);

  const contacts = language === 'fr' ? contactsDataFr.emergencyContacts : contactsDataEn.emergencyContacts;

  const getFilteredContacts = (category: string) => {
    if (category === 'all') return contacts;

    const categoryMap: { [key: string]: string } = {
      'health': 'health',
      'security': 'security',
      'fire': 'fire',
      'insurance': 'insurance',
    };

    const jsonCategory = categoryMap[category];
    const filtered = contacts.filter(contact => contact.category === jsonCategory);
    return filtered;
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const CustomTabItem = ({ title, isActive, onPress }: {
    title: string;
    isActive: boolean;
    onPress: () => void
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
  );

  const ListHeader = () => (
      <>
        <View style={styles.searchContainer}>
          <Search
              onSearchChange={handleSearchChange}
              Placeholder={t('contacts.searchPlaceholder')}
          />
        </View>

        <View style={[
          styles.tabContainer,
          { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
        ]}>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[
                { key: '0', title: t('contacts.categories.all'), index: 0 },
                { key: '1', title: t('contacts.categories.health'), index: 1 },
                { key: '2', title: t('contacts.categories.security'), index: 2 },
                { key: '3', title: t('contacts.categories.fire'), index: 3 },
                { key: '4', title: t('contacts.categories.insurance'), index: 4 },
              ]}
              renderItem={({ item }) => (
                  <CustomTabItem
                      title={item.title}
                      isActive={index === item.index}
                      onPress={() => setIndex(item.index)}
                  />
              )}
              contentContainerStyle={styles.tabBarContent}
          />
        </View>
      </>
  );

  const getCurrentData = () => {
    switch (index) {
      case 1: return getFilteredContacts('health');
      case 2: return getFilteredContacts('security');
      case 3: return getFilteredContacts('fire');
      case 4: return getFilteredContacts('insurance');
      default: return getFilteredContacts('all');
    }
  };

  return (
      <SafeAreaView style={[
        styles.safeArea,
        { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
      ]}>
        <ListAppel
            data={getCurrentData()}
            searchText={searchText}
            ListHeaderComponent={ListHeader}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: 'transparent',
  },
  tabContainer: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  tabBarContent: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  customTabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    minWidth: wp('16%'),
  },
  customTabTitle: {
    fontSize: 10,
    textAlign: 'center',
  },
});