import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { View } from "@/components/Themed";
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useTranslation } from 'react-i18next';

// Props pour le composant Search
interface SearchProps {
  onSearchChange?: (searchText: string) => void;
  Placeholder?: string; // Texte de l'espace réservé pour la barre de recherche
}

export default function Search({ onSearchChange, Placeholder }: SearchProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const updateSearch = (searchText: string) => {
    setSearch(searchText);
    // Appel de la fonction de callback pour transmettre le texte de recherche au parent
    if (onSearchChange) {
      onSearchChange(searchText);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
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
        <SearchBar
          placeholder={Placeholder}
          onChangeText={updateSearch}
          value={search}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          showCancel={isFocused}
          cancelButtonTitle={t('contacts.cancel')}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    width: '100%',
  },
  searchBarInputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
  },
});