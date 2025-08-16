import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Fonction pour créer les icônes de la barre d'onglets
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // Récupère le schéma de couleur actuel (clair ou sombre)
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        // Configuration de la couleur active des onglets en fonction du thème
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Désactive le rendu statique de l'en-tête sur le web
        // pour éviter une erreur d'hydratation dans React Navigation v6
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/* Onglet d'accueil - MadAssistant */}

      {/* Onglet des contacts d'urgence */}
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contacts',
          // Icône de téléphone pour l'onglet des contacts
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'MadAssistant of ISPM',
          // Icône de maison pour l'onglet d'accueil
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/icons/ISPM-removebg-preview2.png')}
              style={{ width: 28, height: 28 }}
            />
          ),
          // Bouton de paramètres dans le coin supérieur droit
          /*
          // Pour ajouter un bouton de paramètres dans l'en-tête, décommentez le code suivant
          // A ete commenté Car juger inutile pour l'instant
          headerRight: () => (
            <Link href="/parameter" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="gear"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),*/
        }}
      />
        <Tabs.Screen
            name="parameter"
            options={{
              title: 'Paramètres',
              // Icône d'engrenage pour l'onglet des paramètres
              tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            }}
        />
    </Tabs>
  );
}