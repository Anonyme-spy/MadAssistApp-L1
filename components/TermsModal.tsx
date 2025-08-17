import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '@/components/ThemedContext';
import { useTranslation } from 'react-i18next';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TermsModal = ({ visible, onClose }: TermsModalProps): React.ReactElement => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF' }
      ]}>
        {/* Header */}
        <View style={[
          styles.header,
          { borderBottomColor: theme === 'dark' ? '#404040' : '#E9ECEF' }
        ]}>
          <Text style={[
            styles.headerTitle,
            { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
          ]}>
            {t('terms.title')}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons
              name="close"
              size={24}
              color={theme === 'dark' ? '#FFFFFF' : '#1A1A1A'}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Section 1: Introduction */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              {t('terms.introduction.title')}
            </Text>
            <Text style={[
              styles.sectionContent,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('terms.introduction.content')}
            </Text>
          </View>

          {/* Section 2: Utilisation */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              {t('terms.usage.title')}
            </Text>
            <Text style={[
              styles.sectionContent,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('terms.usage.content')}
            </Text>
          </View>

          {/* Section 3: Responsabilité */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              {t('terms.liability.title')}
            </Text>
            <Text style={[
              styles.sectionContent,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('terms.liability.content')}
            </Text>
          </View>

          {/* Section 4: Données personnelles */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              {t('terms.privacy.title')}
            </Text>
            <Text style={[
              styles.sectionContent,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('terms.privacy.content')}
            </Text>
          </View>

          {/* Section 5: Contact */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              {t('terms.contact.title')}
            </Text>
            <Text style={[
              styles.sectionContent,
              { color: theme === 'dark' ? '#B0B0B0' : '#6C757D' }
            ]}>
              {t('terms.contact.content')}
            </Text>
          </View>

          {/* Dernière mise à jour */}
          <View style={[styles.footer, { marginBottom: 20 }]}>
            <Text style={[
              styles.footerText,
              { color: theme === 'dark' ? '#666' : '#999' }
            ]}>
              {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});