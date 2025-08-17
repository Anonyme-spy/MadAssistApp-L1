import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '@/components/ThemedContext';
import { useLanguage } from '@/components/LanguageContext';
import firstAidDataFr from '@/DataBase/FirstAid.json';
import firstAidDataEn from '@/DataBase/FirstAid-en.json';
import { useTranslation } from 'react-i18next';
import handleEmergencyCall from '@/constants/Calling';

interface FirstAidProcedure {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface EmergencyCardProps {
  category?: string;
  searchText?: string;
}

const getCategoryIcon = (category: string): keyof typeof Ionicons.glyphMap => {
  switch (category) {
    case 'Respiratory':
      return 'fitness-outline';
    case 'Cardiac':
      return 'heart-outline';
    case 'Emergency':
      return 'medical-outline';
    default:
      return 'medical-outline';
  }
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Respiratory':
      return '#3498db';
    case 'Cardiac':
      return '#e74c3c';
    case 'Emergency':
      return '#f39c12';
    default:
      return '#95a5a6';
  }
};

export const EmergencyCard = ({ category = 'all', searchText = '' }: EmergencyCardProps) => {
  const { theme } = useThemeContext();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const firstAidData = language === 'fr' ? firstAidDataFr : firstAidDataEn;

  const getFilteredProcedures = (): FirstAidProcedure[] => {
    let procedures = firstAidData.firstAidProcedures;

    if (category !== 'all') {
      procedures = procedures.filter(procedure => procedure.category === category);
    }

    if (searchText.trim()) {
      procedures = procedures.filter(procedure =>
        procedure.title.toLowerCase().includes(searchText.toLowerCase()) ||
        procedure.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return procedures;
  };

  const filteredProcedures = getFilteredProcedures();

  const formatDescription = (description: string): string[] => {
    return description.split(/\d+\./).filter(step => step.trim()).map(step => step.trim());
  };

  const getEmergencyNumber = (procedure: FirstAidProcedure): string => {
    // Déterminer le numéro d'urgence le plus approprié selon la catégorie
    switch (procedure.category) {
      case 'Cardiac':
        return firstAidData.emergencyNumbers.hospitalCHU;
      case 'Respiratory':
        return firstAidData.emergencyNumbers.medicalEmergency;
      case 'Emergency':
      default:
        return firstAidData.emergencyNumbers.police;
    }
  };

  const handleCallEmergency = (procedure: FirstAidProcedure) => {
    const emergencyNumber = getEmergencyNumber(procedure);
    handleEmergencyCall(emergencyNumber);
  };

  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F9FA' }
    ]}>
      {filteredProcedures.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Ionicons
            name="search-outline"
            size={48}
            color={theme === 'dark' ? '#6C757D' : '#ADB5BD'}
          />
          <Text style={[
            styles.noResultsText,
            { color: theme === 'dark' ? '#6C757D' : '#ADB5BD' }
          ]}>
            {t('firstAid.noResults')}
          </Text>
        </View>
      ) : (
        filteredProcedures.map((procedure) => (
          <View
            key={procedure.id}
            style={[
              styles.card,
              {
                backgroundColor: theme === 'dark' ? '#2D2D2D' : '#FFFFFF',
                shadowColor: theme === 'dark' ? '#000000' : '#000000',
              }
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: getCategoryColor(procedure.category) + '20' }
              ]}>
                <Ionicons
                  name={getCategoryIcon(procedure.category)}
                  size={24}
                  color={getCategoryColor(procedure.category)}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={[
                  styles.cardTitle,
                  { color: theme === 'dark' ? '#FFFFFF' : '#212529' }
                ]}>
                  {procedure.title}
                </Text>
                <View style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor(procedure.category) }
                ]}>
                  <Text style={styles.categoryText}>
                    {firstAidData.categories.find(cat => cat.id === procedure.category)?.name || procedure.category}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.stepsContainer}>
              {formatDescription(procedure.description).map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={[
                    styles.stepNumber,
                    { backgroundColor: getCategoryColor(procedure.category) }
                  ]}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={[
                    styles.stepText,
                    { color: theme === 'dark' ? '#E9ECEF' : '#495057' }
                  ]}>
                    {step}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.emergencyButton,
                { backgroundColor: getCategoryColor(procedure.category) }
              ]}
              onPress={() => handleCallEmergency(procedure)}
            >
              <Ionicons name="call-outline" size={20} color="#FFFFFF" />
              <Text style={styles.emergencyButtonText}>
                {t('firstAid.callEmergency')} - {getEmergencyNumber(procedure)}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    noResultsText: {
        fontSize: 16,
        marginTop: 16,
        fontWeight: '500',
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        padding: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    titleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 24,
    },
    categoryBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    categoryText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    stepsContainer: {
        marginBottom: 16,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
    },
    emergencyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    emergencyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});