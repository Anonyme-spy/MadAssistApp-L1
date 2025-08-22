import React, { useMemo, useCallback } from 'react';
import { StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '@/components/Themed';
import CardBox from "@/components/Card";
import { FontAwesome } from '@expo/vector-icons';
import handleEmergencyCall from "@/constants/Calling";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '@/components/ThemedContext';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';

const { width } = Dimensions.get('window');

type ServiceItem = {
  id: string;
  title: string;
  icon: any;
  description: string;
  color1: string;
  color2: string;
  tabIndex: number;
};

export default function TabOneScreen() {
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  // Mémorisation des couleurs de thème
  const themeColors = useMemo(() => ({
    backgroundColor: theme === 'dark' ? '#121212' : '#F8F9FA',
    textPrimary: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
    textSecondary: theme === 'dark' ? '#B0B0B0' : '#666',
    cardBackground: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
    dividerColor: theme === 'dark' ? '#333' : '#E0E0E0',
    shadowColor: theme === 'dark' ? '#000' : '#000',
    heroGradient: theme === 'dark'
        ? ['#1A237E', '#3949AB', '#5C6BC0']
        : ['#667eea', '#764ba2', '#f093fb']
  }), [theme]);

  // Données des services mémorisées
  const serviceData: ServiceItem[] = useMemo(() => [
    {
      id: '1',
      title: t('home.services.health.title'),
      icon: 'plus-circle',
      description: t('home.services.health.description'),
      color1: '#FF6B6B',
      color2: '#FF5252',
      tabIndex: 1
    },
    {
      id: '2',
      title: t('home.services.security.title'),
      icon: 'shield',
      description: t('home.services.security.description'),
      color1: '#4FC3F7',
      color2: '#29B6F6',
      tabIndex: 2
    },
    {
      id: '3',
      title: t('home.services.fire.title'),
      icon: 'fire',
      description: t('home.services.fire.description'),
      color1: '#FFB74D',
      color2: '#FF9800',
      tabIndex: 3
    },
    {
      id: '4',
      title: t('home.services.other.title'),
      icon: 'ellipsis-h',
      description: t('home.services.other.description'),
      color1: '#BA68C8',
      color2: '#9C27B0',
      tabIndex: 0
    },
  ], [t]);

  // Callbacks mémorisés
  const handleSOSPress = useCallback(() => {
    handleEmergencyCall('117');
  }, []);

  const renderServiceCard = useCallback(({ item }: { item: ServiceItem }) => (
      <CardBox item={item} />
  ), []);

  const keyExtractor = useCallback((item: ServiceItem) => item.id, []);

  return (
      <View style={[styles.container, { backgroundColor: themeColors.backgroundColor }]}>
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
        >
          <HeroSection themeColors={themeColors} t={t} />

          <StatsSection themeColors={themeColors} />

          <ServicesSection
              serviceData={serviceData}
              renderServiceCard={renderServiceCard}
              keyExtractor={keyExtractor}
              themeColors={themeColors}
              t={t}
          />

          <SOSSection
              onSOSPress={handleSOSPress}
              themeColors={themeColors}
          />
        </ScrollView>
      </View>
  );
}

// Composant Services Section optimisé
const ServicesSection = React.memo(({
                                      serviceData,
                                      renderServiceCard,
                                      keyExtractor,
                                      themeColors,
                                      t
                                    }: {
  serviceData: ServiceItem[];
  renderServiceCard: ({ item }: { item: ServiceItem }) => React.ReactElement;
  keyExtractor: (item: ServiceItem) => string;
  themeColors: any;
  t: (key: string) => string;
}) => (
    <View style={[styles.content, { backgroundColor: 'transparent' }]}>
      <View style={[styles.servicesSection, { backgroundColor: 'transparent' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
            {t('home.emergencyServices')}
          </Text>
          <Text style={[styles.sectionSubtitle, { color: themeColors.textSecondary }]}>
            Accès rapide aux services essentiels
          </Text>
        </View>

        <FlatList
            data={serviceData}
            renderItem={renderServiceCard}
            keyExtractor={keyExtractor}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridContent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={4}
            windowSize={2}
        />
      </View>
    </View>
));

// Composant SOS Section optimisé
const SOSSection = React.memo(({
                                 onSOSPress,
                                 themeColors
                               }: {
  onSOSPress: () => void;
  themeColors: any;
}) => {
  // Définition locale du gradient pour éviter l'erreur TypeScript
  const sosColors = ['#FF6B6B', '#FF5252', '#D32F2F'] as const;

  return (
      <View style={[styles.sosSection, { backgroundColor: 'transparent' }]}>
        <View style={styles.sosContainer}>
          <Text style={[styles.sosLabel, { color: themeColors.textSecondary }]}>
            Urgence absolue ?
          </Text>

          <TouchableOpacity
              style={styles.sosButtonContainer}
              onPress={onSOSPress}
              activeOpacity={0.8}
          >
            <LinearGradient
                colors={sosColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sosButton}
            >
              <View style={styles.sosButtonContent}>
                <View style={styles.sosIconContainer}>
                  <FontAwesome name="phone" size={28} color="white" />
                </View>
                <View style={styles.sosTextContainer}>
                  <Text style={styles.sosButtonText}>SOS</Text>
                  <Text style={styles.sosButtonSubtext}>Appel d'urgence</Text>
                </View>
              </View>
              <View style={styles.pulseEffect} />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={[styles.sosDescription, { color: themeColors.textSecondary }]}>
            Appuyez pour contacter les services d'urgence
          </Text>
        </View>
      </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 32,
  },
  servicesSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridContent: {
    paddingBottom: 10,
  },
  sosSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sosContainer: {
    alignItems: 'center',
  },
  sosLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  sosButtonContainer: {
    marginBottom: 16,
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  sosButton: {
    borderRadius: 28,
    padding: 24,
    width: width * 0.85,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  sosButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sosIconContainer: {
    marginRight: 20,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  sosTextContainer: {
    alignItems: 'flex-start',
  },
  sosButtonText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  sosButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginTop: 2,
  },
  pulseEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 28,
  },
  sosDescription: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});