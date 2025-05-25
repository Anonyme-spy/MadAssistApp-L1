import { Text, View } from "@/components/Themed";
import { StyleSheet , TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "@rneui/themed";
import React from "react";
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { router } from 'expo-router';


export default function CardBox({ item }: { item: { id: string; title: string; icon: any; description: string; color1: string; color2: string; tabIndex: number } }) {
  const handlePress = () => {
    // Navigation vers la page de contact avec l'index de l'onglet
    if (item.tabIndex !== undefined) {
      router.push({
        pathname: '/(tabs)/contact',
        params: { tabIndex: item.tabIndex }
      });
    } else {
      // Default navigation si tabIndex n'est pas défini
      router.push('/(tabs)/contact');
    }
  };

  return (

    <Card
    containerStyle={styles.card}
    wrapperStyle={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
    <LinearGradient
      colors={[item.color1, item.color2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardGradient}
    >

      <View style={{
        ...baseThemedStyle, paddingTop: 15, paddingBottom: 0, gap: 0, marginBottom: 0
        // Additional styles for cardHeader
      }} lightColor="transparent" darkColor="transparent">
        <FontAwesome name={item.icon} size={24} color="white" />
        <Text style={{
          ...baseThemedStyle,
          marginLeft: 0,
          color: 'white',
          fontWeight: 'bold',
          paddingTop: 0,
        }}>{item.title}</Text>
      </View>
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

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    width: '45%',
    margin: 5,
    padding: 0,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#4f4c4c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  cardGradient: {
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardWrapper: {
    padding: 0,
    backgroundColor: 'transparent',
  },

});