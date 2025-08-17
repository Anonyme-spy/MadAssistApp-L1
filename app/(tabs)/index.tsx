import { StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '@/components/Themed';
import CardBox from "@/components/Card";
import {Button} from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import handleEmergencyCall from "@/constants/Calling";
import React, { useMemo } from "react";
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useTranslation } from 'react-i18next';

// Récupération des dimensions de l'écran pour un design responsive
const { width } = Dimensions.get('window');

// Type définissant la structure des éléments de service d'urgence
type ServiceItem = {
  id: string;
  title: string;
  icon: any;
  description: string;
  color1: string; // Première couleur du gradient
  color2: string; // Deuxième couleur du gradient
  tabIndex: number; // Index pour la navigation
};

export default function TabOneScreen() {
  const { t } = useTranslation();

  // Données des services d'urgence avec traductions dynamiques
  const serviceData: ServiceItem[] = useMemo(() => [
    {
      id: '1',
      title: t('home.services.health.title'),
      icon: 'phone',
      description: t('home.services.health.description'),
      color1: '#FD1D1D',
      color2: '#C72222',
      tabIndex: 1
    },
    {
      id: '2',
      title: t('home.services.security.title'),
      icon: 'shield',
      description: t('home.services.security.description'),
      color1:'#06063D',
      color2:'#090979',
      tabIndex:2
    },
    {
      id: '3',
      title: t('home.services.fire.title'),
      icon: 'fire',
      description: t('home.services.fire.description'),
      color1: '#FCB045',
      color2: '#FD1D1D',
      tabIndex: 3
    },
    {
      id: '4',
      title: t('home.services.other.title'),
      icon: 'info',
      description: t('home.services.other.description'),
      color1: '#22063D',
      color2: '#610979',
      tabIndex: 0
    },
  ], [t]);

  return (
    // Conteneur principal avec style thématique
    <View style={styles.container}>
      {/* ScrollView pour permettre le défilement vertical */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION HERO - Bannière principale avec gradient */}
        <LinearGradient
          colors={['#334ec4', '#5ebaf2']} // Gradient bleu moderne
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.hero}
        >
          {/* Conteneur pour le contenu hero avec meilleur centrage */}
          {/* @ts-ignore */}
          <View style={styles.heroContent}>
            {/* @ts-ignore */}
            <Text style={styles.heroTitle}>
              {t('home.heroTitle')}
            </Text>
            {/* @ts-ignore */}
            <Text style={styles.heroSubtitle}>
              {t('home.heroSubtitle')}
            </Text>
          </View>
        </LinearGradient>

        {/* SECTION CONTENU PRINCIPAL */}
        {/* @ts-ignore */}
        <View style={styles.content}>
          {/* SECTION SERVICES - Grille des services d'urgence */}
          <View style={styles.servicesSection}>
            {/* Titre de section traduit */}
            <Text style={styles.sectionTitle}>{t('home.emergencyServices')}</Text>

            {/* FlatList pour afficher les cartes de service en grille 2x2 */}
            <FlatList
              data={serviceData}
              renderItem={({ item }) => <CardBox item={item} />}
              keyExtractor={item => item.id}
              numColumns={2} // Affichage en 2 colonnes
              columnWrapperStyle={styles.gridRow} // Style pour les lignes
              contentContainerStyle={styles.gridContent}
              scrollEnabled={false} // Désactivation du scroll interne
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* SECTION SOS - Bouton d'urgence principal */}
          {/* @ts-ignore */}
          <View style={styles.sosSection}>
            {/* Bouton SOS avec gradient et ombre */}
            <Button
              ViewComponent={LinearGradient as any}
              linearGradientProps={{
                colors: ["#FF9800", "#F44336"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              buttonStyle={styles.sosButton}
              titleStyle={styles.sosButtonText}
              onPress={() => handleEmergencyCall('017')}
            >
              {/* Icône téléphone avec espacement */}
              <FontAwesome name="phone" size={24} color="white" style={styles.sosIcon} />
              S O S
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTENEUR PRINCIPAL
  container: {
    flex: 1,
    ...baseThemedStyle,
  },

  // Style pour le contenu du ScrollView
  scrollViewContent: {
    flexGrow: 1,
  },

  // SECTION HERO
  hero: {
    height: 280,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  // Conteneur pour le contenu de la section hero
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'transparent',
  },

  // Titre principal
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 15,
    lineHeight: 34,
  },

  // Sous-titre
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },

  // Conteneur pour le contenu principal
  content: {
    flex: 1,
    paddingTop: 20,
  },

  // Section dédiée aux services
  servicesSection: {
    paddingHorizontal: 15,
    marginBottom: 30,
    ...baseThemedStyle,
  },

  // Style pour le titre de section
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    ...baseThemedStyle,
  },

  // Style pour les lignes de la grille
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  // Style pour le contenu de la grille
  gridContent: {
    paddingBottom: 10,
  },

  // Section dédiée au bouton SOS
  sosSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Bouton SOS
  sosButton: {
    padding: 18,
    borderRadius: 25,
    width: '100%',
    minHeight: 60,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  // Style pour le texte du bouton SOS
  sosButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  // Style pour l'icône du bouton SOS
  sosIcon: {
    marginRight: 10,
  },
});