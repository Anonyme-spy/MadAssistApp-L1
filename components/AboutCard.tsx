import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '@/components/ThemedContext';
import { useTranslation } from 'react-i18next';

export const AboutCard = (): React.ReactElement => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <Card style={[
      styles.card,
      {
        backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
        borderColor: theme === 'dark' ? '#404040' : '#E9ECEF',
      }
    ]}>
      <View style={[
        styles.cardContent,
        { backgroundColor: 'transparent' }
      ]}>
        {/* Icône de l'application */}
        <View style={[
          styles.iconContainer,
          { backgroundColor: theme === 'dark' ? '#334ec4' : '#5ebaf2' }
        ]}>
          <Ionicons
            name="shield-checkmark"
            size={32}
            color="#FFFFFF"
          />
        </View>

        {/* Titre principal */}
        <Text style={[
          styles.title,
          { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
        ]}>
          {t('about.title') || 'MadAssistant'}
        </Text>

        {/* Sous-titre */}
        <Text style={[
          styles.subtitle,
          { color: theme === 'dark' ? '#4DABF7' : '#007BFF' }
        ]}>
          {t('about.subtitle') || 'Assistant d\'urgence intelligent'}
        </Text>

        {/* Description */}
        <Text style={[
          styles.description,
          { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
        ]}>
          {t('about.description') || 'MadAssistant est votre compagnon de sécurité personnel. Accédez rapidement aux services d\'urgence, trouvez les contacts essentiels et obtenez l\'aide dont vous avez besoin en cas de situation critique. Conçu pour Madagascar, adapté à vos besoins.'}
        </Text>

        {/* Fonctionnalités clés */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons
              name="call"
              size={16}
              color={theme === 'dark' ? '#8CE99A' : '#28A745'}
              style={styles.featureIcon}
            />
            <Text style={[
              styles.featureText,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('about.features.quickCall') || 'Appels d\'urgence rapides'}
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons
              name="people"
              size={16}
              color={theme === 'dark' ? '#8CE99A' : '#28A745'}
              style={styles.featureIcon}
            />
            <Text style={[
              styles.featureText,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('about.features.contacts') || 'Contacts d\'urgence organisés'}
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons
              name="language"
              size={16}
              color={theme === 'dark' ? '#8CE99A' : '#28A745'}
              style={styles.featureIcon}
            />
            <Text style={[
              styles.featureText,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('about.features.multilingual') || 'Interface multilingue'}
            </Text>
          </View>
        </View>

        {/* Version de l'app */}
        <Text style={[
          styles.version,
          { color: theme === 'dark' ? '#666' : '#999' }
        ]}>
          {t('about.version') || 'Version'} 0.2.1
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  version: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});