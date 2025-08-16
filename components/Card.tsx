import { Text, View } from "@/components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "@rneui/themed";
import React from "react";
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { router } from 'expo-router';

// Composant CardBox qui affiche une carte de service d'urgence cliquable
export default function CardBox({ item }: { item: { id: string; title: string; icon: any; description: string; color1: string; color2: string; tabIndex: number } }) {
  // Fonction appelée lorsque l'utilisateur appuie sur une carte
  const handlePress = () => {
    // Navigation vers la page de contact avec l'index de l'onglet correspondant
    if (item.tabIndex !== undefined) {
      router.push({
        pathname: '/(tabs)/contact',
        params: { tabIndex: item.tabIndex }
      });
    } else {
      // Navigation par défaut si tabIndex n'est pas défini
      router.push('/(tabs)/contact');
    }
  };

  return (
    // Conteneur de carte avec styles personnalisés
    <Card
      containerStyle={styles.card}
      wrapperStyle={styles.cardWrapper}>
      {/* Zone tactile qui déclenche la navigation */}
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        {/* Arrière-plan avec dégradé de couleurs personnalisé pour chaque carte */}
        <LinearGradient
          colors={[item.color1, item.color2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          {/* En-tête de la carte avec icône et titre */}
          <View style={{
            ...baseThemedStyle,
            paddingTop: 15,
            paddingBottom: 0,
            gap: 0,
            marginBottom: 0
          }} lightColor="transparent" darkColor="transparent">
            {/* Icône représentative du service */}
            <FontAwesome name={item.icon} size={24} color="white" />
            {/* Titre du service */}
            <Text style={{
              ...baseThemedStyle,
              marginLeft: 0,
              color: 'white',
              fontWeight: 'bold',
              paddingTop: 0,
            }}>{item.title}</Text>
          </View>
          {/* Description du service */}
          <Text style={{
            ...baseThemedStyle,
            fontSize: 12,
            color: 'white',
            textAlign: 'center',
            paddingHorizontal: 0,
            marginBottom: 20,
            paddingTop: 0,
            marginTop: 0,
          }}>{item.description}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Card>
  );
}

// Styles pour le composant de carte
const styles = StyleSheet.create({
  // Style du conteneur principal de la carte
  card: {
    borderRadius: 15,
    width: '45%', // Prend environ la moitié de la largeur disponible
    margin: 5,
    padding: 0,
    overflow: 'hidden',
    elevation: 3, // Élévation pour Android
    shadowColor: '#4f4c4c', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  // Style pour le dégradé de couleurs en arrière-plan
  cardGradient: {
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '100%',
    height: 150, // Hauteur fixe pour toutes les cartes
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Style du wrapper interne de la carte
  cardWrapper: {
    padding: 0,
    backgroundColor: 'transparent',
  },
});