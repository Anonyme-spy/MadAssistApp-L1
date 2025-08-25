import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useTranslation} from "react-i18next";

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
  const { t } = useTranslation();

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
            name="index"
            options={{
                title: t('tabs.home'),
                // Icône de maison pour l'onglet d'accueil
                tabBarIcon: ({ color }) => (
                    <Image
                        source={require('@/assets/icons/ISPM-removebg-preview2.png')}
                        style={{ width: 28, height: 28 }}
                    />
                ),
                headerRight: () => (
                    <Image
                        source={require('@/assets/icons/ISPM-removebg-preview2.png')}
                        style={{ width: 28, height: 28, marginRight: 15 }}
                    />

                )
            }}
        />
        <Tabs.Screen
        name="contact"

        options={{
          title: t('tabs.contacts'),
          headerTitleAlign: 'center',
          // Icône de téléphone pour l'onglet des contacts
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
        }}
      />
      <Tabs.Screen
        name="FirstAid"
        options={{
          title: t('tabs.firstAid'),
          headerTitleAlign: 'center',
          // Icône de trousse de secours pour l'onglet des premiers secours
          tabBarIcon: ({ color }) => <FontAwesome name="heartbeat" size={22} color={color} />,
        }}
      />
        <Tabs.Screen
            name="parameter"
            options={{
              title: t('tabs.settings'),
              headerTitleAlign: 'center',
              // Icône d'engrenage pour l'onglet des paramètres
              tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            }}
        />
    </Tabs>
  );
}