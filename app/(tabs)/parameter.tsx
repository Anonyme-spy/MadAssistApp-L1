import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeContext } from '@/components/ThemedContext';
import { useLanguage } from '@/components/LanguageContext';
import { ThemePreference } from '@/components/utils/theme';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useMemo } from 'react';
import { AboutCard } from "@/components/AboutCard";
import { TermsModal } from '@/components/TermsModal';

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

const languageIndexMap = { fr: 0, en: 1 };
const indexLanguageMap = { 0: 'fr' as const, 1: 'en' as const };

export default function ParameterScreen() {
  const { preference, setPreference, theme } = useThemeContext();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [showTerms, setShowTerms] = useState(false);

  const [selectedThemeIndex, setSelectedThemeIndex] = useState(themeIndexMap[preference]);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(languageIndexMap[language]);

  useEffect(() => {
    setSelectedThemeIndex(themeIndexMap[preference]);
  }, [preference]);

  useEffect(() => {
    setSelectedLanguageIndex(languageIndexMap[language]);
  }, [language]);

  const handleThemeChange = (index: number) => {
    setSelectedThemeIndex(index);
    setPreference(indexThemeMap[index]);
  };

  const handleLanguageChange = (index: number) => {
    setSelectedLanguageIndex(index);
    setLanguage(indexLanguageMap[index]);
  };

  const themeButtons = useMemo(() => [
    { element: () => <FontAwesome name="sun-o" size={20} color={theme === 'dark' ? 'white' : 'black'} /> },
    { element: () => <FontAwesome name="moon-o" size={20} color={theme === 'dark' ? 'white' : 'black'} /> },
    { element: () => <FontAwesome name="magic" size={20} color={theme === 'dark' ? 'white' : 'black'} /> }
  ], [theme]);

  const languageButtons = useMemo(() => [
    { element: () => <Text style={{ fontSize: 20 }}>🇫🇷</Text> },
    { element: () => <Text style={{ fontSize: 20 }}>🇬🇧</Text> }
  ], []);

  return (
      <ScrollView
          style={[
            styles.scrollView,
            { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5' }
          ]}
          showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.container,
          { backgroundColor: 'transparent' }
        ]}>
          {/* Header */}
          <View style={[
            styles.header,
            { backgroundColor: 'transparent' }
          ]}>
            <Text style={[
              styles.title,
              { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              {t('settings.title')}
            </Text>
          </View>

          {/* AboutCard en première position */}
          <View style={styles.cardContainer}>
            <AboutCard />
          </View>

          {/* Section Configuration */}
          <Text style={[
            styles.sectionHeader,
            { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
          ]}>
            {t('settings.configuration')}
          </Text>

          {/* Section Thème */}
          <View style={[
            styles.settingCard,
            {
              backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#404040' : '#E9ECEF'
            }
          ]}>
            <View style={styles.settingHeader}>
              <FontAwesome
                  name="paint-brush"
                  size={20}
                  color={theme === 'dark' ? '#4DABF7' : '#007BFF'}
                  style={styles.settingIcon}
              />
              <View style={styles.settingInfo}>
                <Text style={[
                  styles.settingTitle,
                  { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {t('settings.theme')}
                </Text>
                <Text style={[
                  styles.settingDescription,
                  { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
                ]}>
                  {t('settings.themeDescription')}
                </Text>
              </View>
            </View>

            <ButtonGroup
                buttons={themeButtons}
                selectedIndex={selectedThemeIndex}
                onPress={handleThemeChange}
                containerStyle={[
                  styles.buttonGroup,
                  {
                    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA',
                    borderColor: theme === 'dark' ? '#404040' : '#E9ECEF'
                  }
                ]}
                selectedButtonStyle={[
                  styles.selectedButton,
                  { backgroundColor: theme === 'dark' ? '#4DABF7' : '#007BFF' }
                ]}
            />

            <View style={styles.buttonLabels}>
              <Text style={[styles.buttonLabel, { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }]}>
                {t('settings.light')}
              </Text>
              <Text style={[styles.buttonLabel, { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }]}>
                {t('settings.dark')}
              </Text>
              <Text style={[styles.buttonLabel, { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }]}>
                {t('settings.auto')}
              </Text>
            </View>
          </View>

          {/* Section Langue */}
          <View style={[
            styles.settingCard,
            {
              backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#404040' : '#E9ECEF'
            }
          ]}>
            <View style={styles.settingHeader}>
              <FontAwesome
                  name="globe"
                  size={20}
                  color={theme === 'dark' ? '#8CE99A' : '#28A745'}
                  style={styles.settingIcon}
              />
              <View style={styles.settingInfo}>
                <Text style={[
                  styles.settingTitle,
                  { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {t('settings.language')}
                </Text>
                <Text style={[
                  styles.settingDescription,
                  { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
                ]}>
                  {t('settings.languageDescription')}
                </Text>
              </View>
            </View>

            <ButtonGroup
                buttons={languageButtons}
                selectedIndex={selectedLanguageIndex}
                onPress={handleLanguageChange}
                containerStyle={[
                  styles.buttonGroup,
                  {
                    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA',
                    borderColor: theme === 'dark' ? '#404040' : '#E9ECEF'
                  }
                ]}
                selectedButtonStyle={[
                  styles.selectedButton,
                  { backgroundColor: theme === 'dark' ? '#8CE99A' : '#28A745' }
                ]}
            />

            <View style={styles.buttonLabels}>
              <Text style={[styles.buttonLabel, { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }]}>
                {t('settings.french')}
              </Text>
              <Text style={[styles.buttonLabel, { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }]}>
                {t('settings.english')}
              </Text>
            </View>
          </View>

          {/* Section Légal */}
          <Text style={[
            styles.sectionHeader,
            { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
          ]}>
            {t('settings.legal')}
          </Text>

          {/* Conditions d'utilisation */}
          <TouchableOpacity
              style={[
                styles.legalButton,
                {
                  backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#404040' : '#E9ECEF'
                }
              ]}
              onPress={() => setShowTerms(true)}
          >
            <FontAwesome
                name="file-text-o"
                size={20}
                color={theme === 'dark' ? '#FFD43B' : '#FFC107'}
            />
            <View style={styles.legalButtonContent}>
              <Text style={[
                styles.legalButtonTitle,
                { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
              ]}>
                {t('settings.termsTitle')}
              </Text>
              <Text style={[
                styles.legalButtonSubtitle,
                { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
              ]}>
                {t('settings.termsDescription')}
              </Text>
            </View>
            <FontAwesome
                name="chevron-right"
                size={16}
                color={theme === 'dark' ? '#B0B0B0' : '#6C757D'}
            />
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>

        <TermsModal
            visible={showTerms}
            onClose={() => setShowTerms(false)}
        />

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 24,
  },
  settingCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  settingIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonGroup: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  selectedButton: {
    borderRadius: 8,
  },
  buttonLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  legalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  legalButtonContent: {
    flex: 1,
    marginLeft: 16,
  },
  legalButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  legalButtonSubtitle: {
    fontSize: 14,
  },
});