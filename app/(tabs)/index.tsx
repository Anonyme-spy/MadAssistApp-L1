import { StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '@/components/Themed';
import CardBox from "@/components/Card";
import { Button } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import handleEmergencyCall from "@/constants/Calling";
import React, { useMemo } from "react";
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '@/components/ThemedContext';

const { width, height } = Dimensions.get('window');

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

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#121212' : '#F8F9FA' }]}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* SECTION HERO REDESIGNÉE */}
        <View style={styles.heroWrapper}>
          <LinearGradient
            colors={theme === 'dark'
              ? ['#1A237E', '#3949AB', '#5C6BC0']
              : ['#667eea', '#764ba2', '#f093fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            {/* Effet de fond décoratif */}
            <View style={styles.heroDecorations}>
              <View style={[styles.decoration, styles.decoration1]} />
              <View style={[styles.decoration, styles.decoration2]} />
              <View style={[styles.decoration, styles.decoration3]} />
            </View>

            <View style={styles.heroContent}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <FontAwesome name="shield" size={32} color="#FFFFFF" />
                </View>
              </View>

              <Text style={styles.heroTitle}>
                {t('home.heroTitle')}
              </Text>
              <Text style={styles.heroSubtitle}>
                {t('home.heroSubtitle')}
              </Text>

              {/* Badge d'urgence */}
              <View style={styles.urgencyBadge}>
                <FontAwesome name="clock-o" size={14} color="#FFFFFF" />
                <Text style={styles.urgencyText}>Assistance 24/7</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* SECTION STATS RAPIDES */}
        <View style={[styles.statsSection, { backgroundColor: 'transparent' }]}>
          <View style={[styles.statsContainer, {
            backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
            shadowColor: theme === 'dark' ? '#000' : '#000'
          }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }]}>24/7</Text>
              <Text style={[styles.statLabel, { color: theme === 'dark' ? '#B0B0B0' : '#666' }]}>Disponible</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme === 'dark' ? '#333' : '#E0E0E0' }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }]}>4</Text>
              <Text style={[styles.statLabel, { color: theme === 'dark' ? '#B0B0B0' : '#666' }]}>Services</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme === 'dark' ? '#333' : '#E0E0E0' }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }]}>MDG</Text>
              <Text style={[styles.statLabel, { color: theme === 'dark' ? '#B0B0B0' : '#666' }]}>Madagascar</Text>
            </View>
          </View>
        </View>

        {/* SECTION SERVICES AMÉLIORÉE */}
        <View style={[styles.content, { backgroundColor: 'transparent' }]}>
          <View style={[styles.servicesSection, { backgroundColor: 'transparent' }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }]}>
                {t('home.emergencyServices')}
              </Text>
              <Text style={[styles.sectionSubtitle, { color: theme === 'dark' ? '#B0B0B0' : '#666' }]}>
                Accès rapide aux services essentiels
              </Text>
            </View>

            <FlatList
              data={serviceData}
              renderItem={({ item }) => <CardBox item={item} />}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={styles.gridRow}
              contentContainerStyle={styles.gridContent}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* SECTION SOS REDESIGNÉE */}
          <View style={[styles.sosSection, { backgroundColor: 'transparent' }]}>
            <View style={styles.sosContainer}>
              <Text style={[styles.sosLabel, { color: theme === 'dark' ? '#B0B0B0' : '#666' }]}>
                Urgence absolue ?
              </Text>

              <TouchableOpacity
                style={styles.sosButtonContainer}
                onPress={() => handleEmergencyCall('117')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FF5252', '#D32F2F']}
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

                  {/* Effet de pulsation */}
                  <View style={styles.pulseEffect} />
                </LinearGradient>
              </TouchableOpacity>

              <Text style={[styles.sosDescription, { color: theme === 'dark' ? '#B0B0B0' : '#666' }]}>
                Appuyez pour contacter les services d'urgence
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollViewContent: {
    flexGrow: 1,
  },

  // HERO SECTION
  heroWrapper: {
    marginBottom: -30,
    zIndex: 1,
  },

  hero: {
    height: 320,
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },

  heroDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  decoration: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  decoration1: {
    width: 120,
    height: 120,
    top: -30,
    right: -20,
  },

  decoration2: {
    width: 80,
    height: 80,
    top: 100,
    left: -20,
  },

  decoration3: {
    width: 60,
    height: 60,
    bottom: 50,
    right: 30,
  },

  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 2,
  },

  logoContainer: {
    marginBottom: 24,
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 34,
    letterSpacing: -0.5,
  },

  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: 20,
    fontWeight: '500',
  },

  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  urgencyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },

  // STATS SECTION
  statsSection: {
    paddingHorizontal: 20,
    zIndex: 2,
    marginTop: -20,
  },

  statsContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  statDivider: {
    width: 1,
    height: '100%',
    marginHorizontal: 16,
  },

  // CONTENT SECTION
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

  // SOS SECTION
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