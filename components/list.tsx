import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem, Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import handleEmergencyCall from "@/constants/Calling";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '@/components/ThemedContext';
import ContactModal from './ContactModal';

interface IListItem {
  id?: number;
  title: string;
  description: string;
  tel?: string;
  alternativeTel?: string;
  emergencyTel?: string;
  thirdTel?: string;
  fourthTel?: string;
  category?: string;
  subcategory?: string;
  location?: string;
  availability?: string;
  email?: string;
}

interface ListAppelProps {
  data?: IListItem[];
  searchText?: string;
  ListHeaderComponent?: () => React.ReactElement;
}

export const ListAppel = ({ data = [], searchText = '', ListHeaderComponent }: ListAppelProps): React.ReactElement => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const [selectedContact, setSelectedContact] = useState<IListItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }


    if (!searchText.trim()) {
      return data;
    }

    const searchLower = searchText.toLowerCase().trim();
    const searchTerms = searchLower.split(' ').filter(term => term.length > 0);

    return data.filter(item => {
      const titleMatch = item.title?.toLowerCase().includes(searchLower);
      const descriptionMatch = item.description?.toLowerCase().includes(searchLower);

      const telMatch = [item.tel, item.alternativeTel, item.emergencyTel, item.thirdTel, item.fourthTel]
          .some(phone => phone?.replace(/[\s\-\(\)]/g, '').includes(searchText.replace(/[\s\-\(\)]/g, '')));

      const locationMatch = item.location?.toLowerCase().includes(searchLower);
      const categoryMatch = item.category?.toLowerCase().includes(searchLower);
      const subcategoryMatch = item.subcategory?.toLowerCase().includes(searchLower);

      const multiWordMatch = searchTerms.every(term =>
          item.title?.toLowerCase().includes(term) ||
          item.description?.toLowerCase().includes(term) ||
          item.location?.toLowerCase().includes(term)
      );

      return titleMatch || descriptionMatch || telMatch || locationMatch ||
          categoryMatch || subcategoryMatch || multiWordMatch;
    }).sort((a, b) => {
      const aTitle = a.title?.toLowerCase() || '';
      const bTitle = b.title?.toLowerCase() || '';

      if (aTitle.startsWith(searchLower) && !bTitle.startsWith(searchLower)) return -1;
      if (!aTitle.startsWith(searchLower) && bTitle.startsWith(searchLower)) return 1;

      return aTitle.localeCompare(bTitle);
    });
  }, [data, searchText]);

  const getCategoryIcon = (category?: string): keyof typeof Ionicons.glyphMap => {
    switch (category) {
      case 'health': return 'heart-outline';
      case 'security': return 'shield-outline';
      case 'fire': return 'flame-outline';
      case 'insurance': return 'document-text-outline';
      case 'consular': return 'flag-outline';
      case 'social': return 'people-outline';
      default: return 'person-outline';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'health': return '#FF6B6B';
      case 'security': return '#4DABF7';
      case 'fire': return '#FF922B';
      case 'insurance': return '#9775FA';
      case 'consular': return '#51CF66';
      default: return '#6C757D';
    }
  };

  const renderItemAccessory = (item: IListItem): React.ReactElement => {
    const phoneNumber = item.tel || item.emergencyTel || item.alternativeTel || item.thirdTel || item.fourthTel;

    if (!phoneNumber) {
      return <View/>;
    }

    return (
        <TouchableOpacity
            style={[
              styles.callButton,
              {backgroundColor: theme === 'dark' ? '#4DABF7' : '#007BFF'}
            ]}
            onPress={() => handleEmergencyCall(phoneNumber)}
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
  }

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

  const handleContactPress = (item: IListItem) => {
    setSelectedContact(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedContact(null);
  };

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
      <TouchableOpacity
          onPress={() => handleContactPress(item)}
          activeOpacity={0.7}
          style={[
            styles.listItem,
            {
              backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#404040' : '#E9ECEF',
            }
          ]}
      >
        <View style={styles.itemContent}>
          <View style={styles.leftContent}>
            {renderItemIcon(item.category)}
            <View style={styles.textContent}>
              {renderTitle(item.title)}
              {renderDescription(item.description)}
            </View>
          </View>
          <View style={styles.rightContent}>
            {renderItemAccessory(item)}
          </View>
        </View>
      </TouchableOpacity>
  );

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

  return (<>
      <FlatList
          style={[styles.container, { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }]}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `contact-${index}-${item.id || item.tel || Math.random()}`}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
      />

        <ContactModal
            isVisible={isModalVisible}
            contact={selectedContact}
            onClose={closeModal}
            />
    </>
  );
};

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
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContent: {
    flex: 1,
    marginLeft: 12,
  },
  rightContent: {
    marginLeft: 12,
  },
});