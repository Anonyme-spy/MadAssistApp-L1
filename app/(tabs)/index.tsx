import { StyleSheet, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '@/components/Themed';
import CardBox from "@/components/Card";
import {Button} from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import handleEmergencyCall from "@/constants/Calling";
import React from "react";
import { baseThemedStyle } from "@/constants/baseThemedStyle";// Define base styles that match the expected structure of Themed components


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

  const serviceData: ServiceItem[] = [
    { id: '1', title: 'Santé', icon: 'phone', description: 'Contactez les services de santé rapidement.', color1: '#FD1D1D', color2: '#C72222', tabIndex: 0 },
    { id: '2', title: 'Sécurité', icon: 'shield', description: "Appelez les forces de l'ordre en un click.",color1:'#06063D', color2:'#090979', tabIndex:1},
    { id: '3', title: 'Incendie', icon: 'fire', description: ']Accédez rapidement aux pompiers.', color1: '#FCB045', color2: '#FD1D1D', tabIndex: 2 },
    { id: '4', title: 'Autres', icon: 'info', description: "Autres services d'urgence importants.", color1: '#22063D', color2: '#610979', tabIndex: 3 },
  ];

  // Pour le SOS emergency

  return (
    /*Homme */
      <View style={{
        ...baseThemedStyle,
        flex: 1,
        justifyContent: 'space-evenly',
        width: '100%',

      }}>
        <LinearGradient colors={['#334ec4', '#5ebaf2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.hero}>
          <Text lightColor="#ffffff" style={{
            ...baseThemedStyle,
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>Accéder facilement aux Services d'urgence à Madagascar</Text>

          <Text
              style={{
                ...baseThemedStyle,
                fontSize: 15,
                textAlign: 'center',
                marginHorizontal: 20,
              }}
              lightColor="rgba(255,255,255,0.8)"
              darkColor="rgba(255,255,255,1)">
            Votre guide rapide pour les services d'urgence à Madagascar
          </Text>
        </LinearGradient>
        {/* utilise card en grid de 2 ligne*/}
        <FlatList
            data={serviceData}
            renderItem={({ item }) =>  <CardBox item={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            style={styles.grid}
            contentContainerStyle={styles.gridContentStyle}
            scrollEnabled={false}
        />

        <Button
          ViewComponent={LinearGradient as any}// Don't forget this!
          linearGradientProps={{
            colors: ["#FF9800", "#F44336"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          buttonStyle={{ padding: 15, borderRadius: 30, width: '100%', alignSelf: 'center' }}
          onPress={() => handleEmergencyCall('911')}
        >
         <FontAwesome name={'phone'} size={24} color="white"/>   S O S
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  grid: {
    width: '100%',
    flex: 1,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  gridContentStyle: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
});