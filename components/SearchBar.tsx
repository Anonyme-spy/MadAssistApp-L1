import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

import { View } from "@/components/Themed";
import { baseThemedStyle } from "@/constants/baseThemedStyle";

// Composant de barre de recherche pour filtrer les contacts
export default function Search() {
  // État pour stocker la valeur de recherche saisie par l'utilisateur
  const [search, setSearch] = useState('');
  // État pour suivre si la barre de recherche est actuellement active (focus)
  const [isFocused, setIsFocused] = useState(false);

  // Fonction mise à jour de la recherche quand l'utilisateur tape du texte
  const updateSearch = (searchText: string) => {
    setSearch(searchText);
  };

  // Fonction pour masquer le clavier et retirer le focus de la barre de recherche
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    // Composant tactile qui détecte les touches en dehors de la barre de recherche pour masquer le clavier
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{
        ...baseThemedStyle,
        alignItems: 'center',
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 0,
        marginBottom: 0,
        gap: 0,
      }}>
        {/* Composant SearchBar de React Native Elements */}
        <SearchBar
          placeholder="Search contacts..."  // Texte d'indication quand aucune recherche n'est saisie
          onChangeText={updateSearch}       // Fonction appelée à chaque modification du texte
          value={search}                    // Valeur actuelle de la recherche
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}  // Adaptation de l'apparence selon la plateforme
          containerStyle={styles.searchBarContainer}            // Style du conteneur extérieur
          inputContainerStyle={styles.searchBarInputContainer}  // Style du conteneur du champ de saisie

          showCancel={isFocused}           // Affiche le bouton d'annulation uniquement quand la barre est active
          cancelButtonTitle="Cancel"       // Texte du bouton d'annulation (pour iOS)
          onFocus={() => setIsFocused(true)}   // Marque la barre comme active quand elle reçoit le focus
          onBlur={() => setIsFocused(false)}   // Marque la barre comme inactive quand elle perd le focus
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

// Styles pour personnaliser l'apparence de la barre de recherche
const styles = StyleSheet.create({
  // Style du conteneur principal de la barre de recherche
  searchBarContainer: {
    backgroundColor: 'transparent',       // Fond transparent pour s'adapter au thème
    borderBottomColor: 'transparent',     // Supprime la bordure inférieure par défaut
    borderTopColor: 'transparent',        // Supprime la bordure supérieure par défaut
    width: '100%',                        // Prend toute la largeur disponible
  },
  // Style du conteneur interne où l'utilisateur tape le texte
  searchBarInputContainer: {
    backgroundColor: '#f2f2f2',           // Couleur de fond légère pour le champ de saisie
    borderRadius: 25,                     // Coins très arrondis pour un aspect moderne
  },
});