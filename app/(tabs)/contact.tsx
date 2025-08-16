import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { View, Text } from '@/components/Themed';
import Search from "@/components/SearchBar";
import { ListAppel } from "@/components/list";
import { Tab, TabView } from '@rneui/themed';
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useLocalSearchParams } from 'expo-router';
import contactsData from "@/DataBase/contact.json"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {TouchableWithoutFeedback } from 'react-native';

export default function TabTwoScreen() {
  const { tabIndex } = useLocalSearchParams();
  // Initialise l'index de l'onglet à partir des paramètres de navigation
  const [index, setIndex] = React.useState(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      return !isNaN(parsedIndex) ? parsedIndex : 0;
    }
    return 0;
  });

  // Met à jour l'index si le paramètre de navigation change
  useEffect(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      if (!isNaN(parsedIndex)) {
        setIndex(parsedIndex);
      }
    }
  }, [tabIndex]);

  // Liste des contacts d'urgence à afficher
  const contacts = contactsData.emergencyContacts;

  const getFilteredContacts = (category: string) => {
    if (category === 'All') return contacts;

    const categoryMap: { [key: string]: string } = {
      'Santé': 'santé',
      'Sécurité': 'sécurité',
      'Incendie': 'incendie',
    };

    const jsonCategory = categoryMap[category];
    return contacts.filter(contact => contact.category === jsonCategory);
  };

  // @ts-ignore
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barre de recherche en haut de l'écran */}
      <Search />

      {/* Conteneur pour les onglets de catégories */}
      <View style={styles.tabContainer}>
        <Tab value={index}
             onChange={(e) => setIndex(e)}
             variant="default"
             indicatorStyle={styles.indicator}
             containerStyle={styles.tabBar}
             disableIndicator={true}
        >
          <Tab.Item
              title={"All"}
              titleStyle={[
                styles.tabTitle,
                { fontSize: wp(3.5) },
                index === 0 && styles.activeTabTitle
              ]}
              buttonStyle={[
                styles.tabButton,
                index === 0 && styles.activeTabButton
              ]}
              activeOpacity={1}  // Supprime l'effet d'opacité
              // @ts-ignore
              TouchableComponent={({ onPress, children, ...props }) => (
                  <TouchableWithoutFeedback onPress={onPress}>
                    <View {...props}>{children}</View>
                  </TouchableWithoutFeedback>
              )}

          />
          <Tab.Item
              title={"Santé"}
              titleStyle={[
                styles.tabTitle,
                { fontSize: wp(3.5) },
                index === 1 && styles.activeTabTitle
              ]}
              buttonStyle={[
                styles.tabButton,
                index === 1 && styles.activeTabButton
              ]}
              activeOpacity={1}  // Supprime l'effet d'opacité
              // @ts-ignore
              TouchableComponent={({ onPress, children, ...props }) => (
                  <TouchableWithoutFeedback onPress={onPress}>
                    <View {...props}>{children}</View>
                  </TouchableWithoutFeedback>
              )}

          />
          <Tab.Item
              title={"Sécurité"}
              titleStyle={[
                styles.tabTitle,
                { fontSize: wp(3.5) },
                index === 2 && styles.activeTabTitle
              ]}
              buttonStyle={[
                styles.tabButton,
                index === 2 && styles.activeTabButton
              ]}
              activeOpacity={1}  // Supprime l'effet d'opacité
              // @ts-ignore
              TouchableComponent={({ onPress, children, ...props }) => (
                  <TouchableWithoutFeedback onPress={onPress}>
                    <View {...props}>{children}</View>
                  </TouchableWithoutFeedback>
              )}
          />
          <Tab.Item
              title={"Incendie"}
              titleStyle={[
                styles.tabTitle,
                { fontSize: wp(3.5) },
                index === 3 && styles.activeTabTitle
              ]}
              buttonStyle={[
                styles.tabButton,
                index === 3 && styles.activeTabButton
              ]}
              activeOpacity={1}  // Supprime l'effet d'opacité
              // @ts-ignore
              TouchableComponent={({ onPress, children, ...props }) => (
                  <TouchableWithoutFeedback onPress={onPress}>
                    <View {...props}>{children}</View>
                  </TouchableWithoutFeedback>
              )}
          />

        </Tab>
      </View>

      {/* Conteneur pour le contenu des onglets */}
      <View style={styles.tabViewContainer}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          {/* Contenu de l'onglet "All" - affiche tous les contacts */}
          <TabView.Item style={styles.tabViewItem}>
            <ListAppel data={contacts} />
          </TabView.Item>

          {/* Contenu de l'onglet "Santé" */}
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.centerContent}>
              <ListAppel data={getFilteredContacts('Santé')} />
            </View>
          </TabView.Item>

          {/* Contenu de l'onglet "Sécurité" */}
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.centerContent}>
              <ListAppel data={getFilteredContacts('Sécurité')} />
            </View>
          </TabView.Item>

          {/* Contenu de l'onglet "Incendie" */}
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.centerContent}>
              <ListAppel data={getFilteredContacts('Incendie')} />
            </View>
          </TabView.Item>

        </TabView>
      </View>
    </SafeAreaView>
  );
}

// Styles pour les composants de l'interface
const styles = StyleSheet.create({
  // Zone sécurisée pour éviter les encoches et barres système
  safeArea: {
    flex: 1,
    width: '100%',
  },
  // Conteneur des onglets de catégories
  tabContainer: {
    ...baseThemedStyle,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    gap: 0,
    paddingTop: 0,
  },
  // Style de la barre d'onglets
  tabBar: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  // Supprime l'indicateur de tab par défaut
  indicator: {
    backgroundColor: 'transparent',
    height: 0,
  },
  // Style des boutons d'onglets
  tabButton: {
    borderRadius: 20,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    padding: 0,
    opacity:1,
  },
  // Style spécifique pour l'onglet actif
  activeTabButton: {
    borderWidth: 1,
    borderColor: '#334ec4',
  },
  // Style du texte des onglets
  tabTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#595858',
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'nowrap',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  // Style du texte pour l'onglet actif
  activeTabTitle: {
    fontSize: 14,
    padding: 0
  },
  // Conteneur pour la vue des onglets
  tabViewContainer: {
    ...baseThemedStyle,
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    gap: 0,
  },
  // Style de chaque élément de la vue d'onglet
  tabViewItem: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  // Style pour centrer le contenu dans les onglets
  centerContent: {
    ...baseThemedStyle,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});