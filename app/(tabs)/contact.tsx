import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text } from '@/components/Themed';
import Search from "@/components/SearchBar";
import { ListAppel } from "@/components/list";
import { Tab, TabView } from '@rneui/themed';
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useLocalSearchParams } from 'expo-router';
import contactsDataFr from "@/DataBase/contact.json";
import contactsDataEn from "@/DataBase/contact-en.json";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TouchableWithoutFeedback, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/LanguageContext';
import { useThemeContext } from '@/components/ThemedContext';

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme } = useThemeContext();
  const { tabIndex } = useLocalSearchParams();
  const [searchText, setSearchText] = useState('');

  const [index, setIndex] = React.useState(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      return !isNaN(parsedIndex) ? parsedIndex : 0;
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

  // Debug pour vérifier les données
  console.log('Total contacts:', contacts.length);
  console.log('First contact:', contacts[0]);

  const getFilteredContacts = (category: string) => {
    if (category === 'all') return contacts;

    const categoryMap: { [key: string]: string } = {
      'health': 'health',
      'security': 'security',
      'fire': 'fire',
    };

    const jsonCategory = categoryMap[category];
    const filtered = contacts.filter(contact => contact.category === jsonCategory);
    console.log(`${category} contacts:`, filtered.length);
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

  return (
      <SafeAreaView style={[
        styles.safeArea,
        { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
      ]}>
        <Search onSearchChange={handleSearchChange} />

        <View style={[
          styles.tabContainer,
          { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
        ]}>
          <View style={styles.customTabBar}>
            <CustomTabItem
                title={t('contacts.categories.all')}
                isActive={index === 0}
                onPress={() => setIndex(0)}
            />
            <CustomTabItem
                title={t('contacts.categories.health')}
                isActive={index === 1}
                onPress={() => setIndex(1)}
            />
            <CustomTabItem
                title={t('contacts.categories.security')}
                isActive={index === 2}
                onPress={() => setIndex(2)}
            />
            <CustomTabItem
                title={t('contacts.categories.fire')}
                isActive={index === 3}
                onPress={() => setIndex(3)}
            />
          </View>
        </View>

        <View style={[
          styles.tabViewContainer,
          { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
        ]}>
          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={styles.tabViewItem}>
              <ListAppel data={getFilteredContacts('all')} searchText={searchText} />
            </TabView.Item>

            <TabView.Item style={styles.tabViewItem}>
              <ListAppel data={getFilteredContacts('health')} searchText={searchText} />
            </TabView.Item>

            <TabView.Item style={styles.tabViewItem}>
              <ListAppel data={getFilteredContacts('security')} searchText={searchText} />
            </TabView.Item>

            <TabView.Item style={styles.tabViewItem}>
              <ListAppel data={getFilteredContacts('fire')} searchText={searchText} />
            </TabView.Item>
          </TabView>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  customTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  customTabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: wp('20%'),
    alignItems: 'center',
  },
  customTabTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  tabViewContainer: {
    flex: 1,
    width: '100%',
  },
  tabViewItem: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
});