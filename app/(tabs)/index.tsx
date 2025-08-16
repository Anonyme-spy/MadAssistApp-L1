import { StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '@/components/Themed';
import CardBox from "@/components/Card";
import {Button} from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import handleEmergencyCall from "@/constants/Calling";
import React from "react";
import { baseThemedStyle } from "@/constants/baseThemedStyle";

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
  // Données des services d'urgence - CHANGEMENT : Organisation plus claire des données
  const serviceData: ServiceItem[] = [
    {
      id: '1',
      title: 'Santé',
      icon: 'phone',
      description: 'Contactez les services de santé rapidement.',
      color1: '#FD1D1D',
      color2: '#C72222',
      tabIndex: 1
    },
    {
      id: '2',
      title: 'Sécurité',
      icon: 'shield',
      description: "Appelez les forces de l'ordre en un click.",
      color1:'#06063D',
      color2:'#090979',
      tabIndex:2
    },
    {
      id: '3',
      title: 'Incendie',
      icon: 'fire',
      description: 'Accédez rapidement aux pompiers.',
      color1: '#FCB045',
      color2: '#FD1D1D',
      tabIndex: 3
    },
    {
      id: '4',
      title: 'Autres',
      icon: 'info',
      description: "Autres services d'urgence importants.",
      color1: '#22063D',
      color2: '#610979',
      tabIndex: 0
    },
  ];

  // @ts-ignore
  // @ts-ignore
  return (
    // Conteneur principal avec style thématique
    <View style={styles.container}>
      {/* ScrollView pour permettre le défilement vertical - AMÉLIORATION: Masquage de l'indicateur de scroll */}
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
          {/* CHANGEMENT : Ajout d'un conteneur pour le contenu hero avec meilleur centrage */}
          {/* @ts-ignore */}
          <View style={styles.heroContent}>
            {/* @ts-ignore */}
            <Text style={styles.heroTitle}>
              Accéder facilement aux Services d'urgence à Madagascar
            </Text>
            {/* @ts-ignore */}
            <Text style={styles.heroSubtitle}>
              Votre guide rapide pour les services d'urgence à Madagascar
            </Text>
          </View>
        </LinearGradient>

        {/* SECTION CONTENU PRINCIPAL - AMÉLIORATION : Structure plus organisée */}
        {/* @ts-ignore */}
        <View style={styles.content}>
          {/* SECTION SERVICES - Grille des services d'urgence */}
          <View style={styles.servicesSection}>
            {/* AJOUT : Titre de section pour une meilleure hiérarchie visuelle */}
            <Text style={styles.sectionTitle}>Services d'urgence</Text>

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

          {/* SECTION SOS - Bouton d'urgence principal
          */}
          {/* @ts-ignore */}
          <View style={styles.sosSection}>
            {/* AMÉLIORATION : Bouton SOS avec gradient et ombre plus prononcée */}
            <Button
              ViewComponent={LinearGradient as any} // Utilisation du gradient comme composant de vue
              linearGradientProps={{
                colors: ["#FF9800", "#F44336"], // Gradient orange vers rouge pour l'urgence
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              buttonStyle={styles.sosButton}
              titleStyle={styles.sosButtonText}
              onPress={() => handleEmergencyCall('017')} // Appel d'urgence au 017
            >
              {/* Icône téléphone avec espacement amélioré */}
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
    ...baseThemedStyle, // Application du style thématique de base
  },

  // CHANGEMENT : Style pour le contenu du ScrollView
  scrollViewContent: {
    flexGrow: 1, // Permet au contenu de s'étendre sur toute la hauteur

  },

  // SECTION HERO - AMÉLIORATION : Hauteur et bordures arrondies optimisées
  hero: {
    height: 280, // Hauteur fixe pour un aspect visuel cohérent
    width: '100%',
    borderBottomLeftRadius: 25, // Bordures arrondies en bas
    borderBottomRightRadius: 25,


  },

  // AJOUT : Conteneur pour le contenu de la section hero
  heroContent: {
    flex: 1,
    justifyContent: 'center', // Centrage vertical
    alignItems: 'center', // Centrage horizontal
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  // AMÉLIORATION : Titre principal avec meilleure lisibilité
  heroTitle: {
    fontSize: 28, // Taille augmentée pour plus d'impact
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 15,
    lineHeight: 34, // Espacement entre les lignes
  },

  // AMÉLIORATION : Sous-titre avec transparence pour hiérarchie visuelle
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)', // Blanc avec 90% d'opacité
    lineHeight: 22,
  },

  // AJOUT : Conteneur pour le contenu principal
  content: {
    flex: 1,
    paddingTop: 20, // Espacement depuis la section hero
  },

  // AJOUT : Section dédiée aux services
  servicesSection: {
    paddingHorizontal: 15,
    marginBottom: 30, // Espacement avant la section SOS
    ...baseThemedStyle,
  },

  // AJOUT : Style pour le titre de section
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600', // Poids semi-gras
   // marginBottom: 20,
    textAlign: 'center',
    ...baseThemedStyle, // Application du style thématique
  },

  // AMÉLIORATION : Style pour les lignes de la grille
  gridRow: {
    justifyContent: 'space-between', // Espacement uniforme entre les colonnes
    marginBottom: 15, // Espacement entre les lignes
  },

  // Style pour le contenu de la grille
  gridContent: {
    paddingBottom: 10,
  },

  // AJOUT: Section dédiée au bouton SOS
  sosSection: {

    paddingHorizontal: 20,
    paddingBottom: 30, // Espacement en bas de l'écran
  },

  // AMÉLIORATION : Bouton SOS avec ombre et dimensions optimisées
  sosButton: {
    padding: 18, // Padding généreux pour faciliter l'interaction
    borderRadius: 25, // Bordures très arrondies
    width: '100%', // Largeur complète
    minHeight: 60, // Hauteur minimale pour accessibilité

    // AJOUT : Ombre pour effet de profondeur (Android)
    elevation: 8,

    // AJOUT: Ombre pour iOS
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
    letterSpacing: 2, // Espacement entre les lettres pour effet dramatique
  },

  // AJOUT : Style pour l'icône du bouton SOS
  sosIcon: {
    marginRight: 10, // Espacement entre l'icône et le texte
  },
});