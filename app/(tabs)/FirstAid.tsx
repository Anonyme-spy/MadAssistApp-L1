import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import Search from "@/components/SearchBar";
import { TabView } from '@rneui/themed';
import { useThemeContext } from '@/components/ThemedContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/LanguageContext';
import { EmergencyCard } from '@/components/EmergencyCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, ImageBackground } from 'react-native';

const { height } = Dimensions.get('window');

export default function FirstAidScreen() {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);

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
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground
              source={require('@/assets/images/FirstAidHero.jpg')}
              style={styles.heroBackground}
              resizeMode="cover"
          >
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                style={styles.overlay}
            />
            <View style={styles.heroContent}>
              <View style={styles.textContainer}>
                <Text style={styles.heroTitle}>
                  {t('firstAid.title')}
                </Text>
                <Text style={styles.heroSubtitle}>
                  {t('firstAid.subtitle')}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Search Bar */}
        <Search
            onSearchChange={handleSearchChange}
            Placeholder={t('firstAid.searchPlaceholder')}
        />

        {/* Tabs */}
        <View style={[
          styles.tabContainer,
          { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
        ]}>
          <View style={styles.customTabBar}>
            <CustomTabItem
                title={language === 'fr' ? 'Tout' : 'All'}
                isActive={index === 0}
                onPress={() => setIndex(0)}
            />
            <CustomTabItem
                title={language === 'fr' ? 'Respiratoire' : 'Respiratory'}
                isActive={index === 1}
                onPress={() => setIndex(1)}
            />
            <CustomTabItem
                title={language === 'fr' ? 'Cardiaque' : 'Cardiac'}
                isActive={index === 2}
                onPress={() => setIndex(2)}
            />
            <CustomTabItem
                title={language === 'fr' ? 'Urgences' : 'Emergency'}
                isActive={index === 3}
                onPress={() => setIndex(3)}
            />
          </View>
        </View>

        {/* Tab Content */}
        <View style={[
          styles.tabViewContainer,
          { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
        ]}>
          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={styles.tabViewItem}>
              <EmergencyCard category="all" searchText={searchText} />
            </TabView.Item>

            <TabView.Item style={styles.tabViewItem}>
              <EmergencyCard category="Respiratory" searchText={searchText} />
            </TabView.Item>

            <TabView.Item style={styles.tabViewItem}>
              <EmergencyCard category="Cardiac" searchText={searchText} />
            </TabView.Item>

            <TabView.Item style={styles.tabViewItem}>
              <EmergencyCard category="Emergency" searchText={searchText} />
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
  heroSection: {
    height: height * 0.2,
    width: '100%',
  },
  heroBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  textContainer: {
    backgroundColor: 'transparent',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: wp('20%'),
    alignItems: 'center',
  },
  customTabTitle: {
    fontSize: 11,
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