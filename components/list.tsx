import React, { useMemo } from 'react';
import { List, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import handleEmergencyCall from "@/constants/Calling";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '@/components/ThemedContext';

interface IListItem {
  title: string;
  description: string;
  tel: string;
  category?: string;
}

interface ListAppelProps {
  data?: IListItem[];
  searchText?: string;
}

export const ListAppel = ({ data = [], searchText = '' }: ListAppelProps): React.ReactElement => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  // Supprimer les données factices - utiliser seulement les vraies données
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    if (!searchText.trim()) {
      return data;
    }

    const searchLower = searchText.toLowerCase();
    return data.filter(item =>
        item.title?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.tel?.includes(searchText)
    );
  }, [data, searchText]);

  const getCategoryIcon = (category?: string): keyof typeof Ionicons.glyphMap => {
    switch (category) {
      case 'health': return 'heart-outline';
      case 'security': return 'shield-outline';
      case 'fire': return 'flame-outline';
      case 'social': return 'people-outline';
      default: return 'person-outline';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'health': return '#FF6B6B';
      case 'security': return '#4DABF7';
      case 'fire': return '#FF922B';
      case 'social': return '#8CE99A';
      default: return '#6C757D';
    }
  };

  const renderItemAccessory = (tel: string): React.ReactElement => (
      <TouchableOpacity
          style={[
            styles.callButton,
            { backgroundColor: theme === 'dark' ? '#4DABF7' : '#007BFF' }
          ]}
          onPress={() => handleEmergencyCall(tel)}
          activeOpacity={0.8}
      >
        <Ionicons
            name="call"
            size={16}
            color="#FFFFFF"
            style={styles.phoneIcon}
        />
        <Text style={styles.callButtonText}>{t('contacts.call') || 'Appeler'}</Text>
      </TouchableOpacity>
  );

  const renderItemIcon = (category?: string): React.ReactElement => (
      <View style={styles.iconContainer}>
        <Ionicons
            name={getCategoryIcon(category)}
            size={28}
            color={getCategoryColor(category)}
        />
      </View>
  );

  const renderTitle = (title: string): React.ReactElement => (
      <Text style={[
        styles.title,
        { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
      ]}>
        {title}
      </Text>
  );

  const renderDescription = (description: string): React.ReactElement => (
      <Text style={[
        styles.description,
        { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
      ]}>
        {description}
      </Text>
  );

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
      <ListItem
          title={() => renderTitle(item.title)}
          description={() => renderDescription(item.description)}
          accessoryLeft={() => renderItemIcon(item.category)}
          accessoryRight={() => renderItemAccessory(item.tel)}
          style={[
            styles.listItem,
            {
              backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#404040' : '#E9ECEF',
            }
          ]}
          key={`contact-${index}-${item.tel}`}
      />
  );

  // Affichage si aucune donnée
  if (!data || data.length === 0) {
    return (
        <View style={styles.emptyContainer}>
          <Ionicons
              name="information-circle-outline"
              size={48}
              color={theme === 'dark' ? '#666' : '#CCC'}
          />
          <Text style={[
            styles.noResults,
            { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
          ]}>
            Aucun contact disponible
          </Text>
        </View>
    );
  }

  // Affichage si aucun résultat de recherche
  if (filteredData.length === 0 && searchText.trim()) {
    return (
        <View style={styles.emptyContainer}>
          <Ionicons
              name="search-outline"
              size={48}
              color={theme === 'dark' ? '#666' : '#CCC'}
          />
          <Text style={[
            styles.noResults,
            { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
          ]}>
            {t('contacts.noResults') || 'Aucun contact trouvé'}
          </Text>
        </View>
    );
  }

  return (
      <List
          style={styles.container}
          data={filteredData}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
      />
  );
};

// Les styles restent identiques...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  listItem: {
    marginVertical: 8,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    minHeight: 120,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    minWidth: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  phoneIcon: {
    marginRight: 6,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontStyle: 'italic',
  },
});