import React, { useCallback } from 'react';
import { Text, View } from "@/components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "@rneui/themed";
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { router } from 'expo-router';

interface CardBoxProps {
  item: {
    id: string;
    title: string;
    icon: any;
    description: string;
    color1: string;
    color2: string;
    tabIndex: number;
  };
}

const CardBox = React.memo(({ item }: CardBoxProps) => {
  const handlePress = useCallback(() => {
    if (item.tabIndex !== undefined) {
      router.push({
        pathname: '/(tabs)/contact',
        params: { tabIndex: item.tabIndex }
      });
    } else {
      router.push('/(tabs)/contact');
    }
  }, [item.tabIndex]);

  const gradientColors = [item.color1, item.color2] as const;

  return (
      <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
          <LinearGradient
              colors={gradientColors as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
          >
            <View style={cardContentStyle} lightColor="transparent" darkColor="transparent">
              <FontAwesome name={item.icon} size={24} color="white" />
              <Text style={cardTitleStyle}>{item.title}</Text>
            </View>
            <Text style={cardDescriptionStyle}>{item.description}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Card>
  );
});

// Styles statiques extraits
const cardContentStyle = {
  ...baseThemedStyle,
  paddingTop: 15,
  paddingBottom: 0,
  gap: 0,
  marginBottom: 0
};

const cardTitleStyle = {
  ...baseThemedStyle,
  marginLeft: 0,
  color: 'white',
  fontWeight: 'bold' as const,
  paddingTop: 0,
};

const cardDescriptionStyle = {
  ...baseThemedStyle,
  fontSize: 12,
  color: 'white',
  textAlign: 'center' as const,
  paddingHorizontal: 0,
  marginBottom: 20,
  paddingTop: 0,
  marginTop: 0,
};

export default CardBox;

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