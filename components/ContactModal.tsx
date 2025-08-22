import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '@/components/ThemedContext';
import handleEmergencyCall from '@/constants/Calling';

interface Contact {
    id?: number;
    title: string;
    description: string;
    tel?: string;
    alternativeTel?: string;
    thirdTel?: string;
    fourthTel?: string;
    emergencyTel?: string;
    email?: string;
    category?: string;
    subcategory?: string;
    location?: string;
    availability?: string;
}

interface ContactModalProps {
    contact: Contact | null;
    isVisible: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ contact, isVisible, onClose }) => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();

    if (!contact) return null;

    const phoneNumbers = [
        { label: t('contacts.primary') || 'Principal', number: contact.tel },
        { label: t('contacts.alternative') || 'Alternatif', number: contact.alternativeTel },
        { label: t('contacts.third') || 'Troisième', number: contact.thirdTel },
        { label: t('contacts.fourth') || 'Quatrième', number: contact.fourthTel },
        { label: t('contacts.emergency') || 'Urgence', number: contact.emergencyTel }
    ].filter(phone => phone.number);

    const getCategoryColor = (category?: string) => {
        switch (category) {
            case 'health': return '#FF6B6B';
            case 'security': return '#4DABF7';
            case 'fire': return '#FF922B';
            case 'consular': return '#51CF66';
            case 'insurance': return '#9775FA';
            default: return '#6C757D';
        }
    };

    const getCategoryIcon = (category?: string): keyof typeof Ionicons.glyphMap => {
        switch (category) {
            case 'health': return 'heart-outline';
            case 'security': return 'shield-outline';
            case 'fire': return 'flame-outline';
            case 'insurance': return 'document-text-outline';
            case 'consular': return 'flag-outline';
            default: return 'person-outline';
        }
    };

    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        },
        modalContainer: {
            backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFFFFF',
            borderRadius: 20,
            maxHeight: '90%',
            width: '100%',
            maxWidth: 400,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
        },
        header: {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme === 'dark' ? '#404040' : '#E9ECEF',
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        titleContainer: {
            flex: 1,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
            marginBottom: 8,
        },
        categoryContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        categoryBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            gap: 4,
        },
        categoryText: {
            fontSize: 12,
            fontWeight: '600',
            color: '#FFFFFF',
        },
        closeButton: {
            padding: 8,
            marginLeft: 12,
        },
        content: {
            maxHeight: 400,
        },
        section: {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme === 'dark' ? '#404040' : '#F1F3F4',
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            gap: 8,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
        },
        sectionContent: {
            color: theme === 'dark' ? '#B0B0B0' : '#6C757D',
            fontSize: 14,
            lineHeight: 20,
        },
        phoneContainer: {
            gap: 12,
        },
        phoneItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            backgroundColor: theme === 'dark' ? '#3A3A3A' : '#F8F9FA',
            borderRadius: 12,
        },
        phoneInfo: {
            flex: 1,
        },
        phoneLabel: {
            fontSize: 12,
            color: theme === 'dark' ? '#B0B0B0' : '#6C757D',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: 4,
        },
        phoneNumber: {
            fontSize: 16,
            fontFamily: 'monospace',
            fontWeight: '600',
            color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
        },
        callButton: {
            backgroundColor: '#51CF66',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        callButtonText: {
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
        },
        availabilityBadge: {
            backgroundColor: '#51CF66',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            alignSelf: 'flex-start',
        },
        availabilityText: {
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: theme === 'dark' ? '#3A3A3A' : '#F8F9FA',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        },
        idText: {
            fontSize: 12,
            color: theme === 'dark' ? '#B0B0B0' : '#6C757D',
        },
        closeFooterButton: {
            backgroundColor: theme === 'dark' ? '#404040' : '#E9ECEF',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 12,
        },
        closeFooterButtonText: {
            color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
            fontSize: 14,
            fontWeight: '600',
        },
    });

    return (
        <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerRow}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{contact.title}</Text>
                                <View style={styles.categoryContainer}>
                                    <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(contact.category) }]}>
                                        <Ionicons name={getCategoryIcon(contact.category)} size={12} color="#FFFFFF" />
                                        <Text style={styles.categoryText}>{contact.category}</Text>
                                    </View>
                                    {contact.subcategory && (
                                        <View style={[styles.categoryBadge, { backgroundColor: '#6C757D' }]}>
                                            <Text style={styles.categoryText}>{contact.subcategory}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Ionicons name="close" size={24} color={theme === 'dark' ? '#B0B0B0' : '#6C757D'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={styles.content}>
                        {/* Description */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Ionicons name="information-circle-outline" size={20} color="#4DABF7" />
                                <Text style={styles.sectionTitle}>{t('contacts.description') || 'Description'}</Text>
                            </View>
                            <Text style={styles.sectionContent}>{contact.description}</Text>
                        </View>

                        {/* Phone Numbers */}
                        {phoneNumbers.length > 0 && (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="call-outline" size={20} color="#51CF66" />
                                    <Text style={styles.sectionTitle}>{t('contacts.phoneNumbers') || 'Numéros de téléphone'}</Text>
                                </View>
                                <View style={styles.phoneContainer}>
                                    {phoneNumbers.map((phone, index) => (
                                        <View key={index} style={styles.phoneItem}>
                                            <View style={styles.phoneInfo}>
                                                <Text style={styles.phoneLabel}>{phone.label}</Text>
                                                <Text style={styles.phoneNumber}>{phone.number}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.callButton}
                                                onPress={() => handleEmergencyCall(phone.number)}
                                            >
                                                <Ionicons name="call" size={14} color="#FFFFFF" />
                                                <Text style={styles.callButtonText}>{t('contacts.call') || 'Appeler'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Email */}
                        {contact.email && (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="mail-outline" size={20} color="#4DABF7" />
                                    <Text style={styles.sectionTitle}>{t('contacts.email') || 'Email'}</Text>
                                </View>
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
                                    <Text style={[styles.sectionContent, { color: '#4DABF7', textDecorationLine: 'underline' }]}>
                                        {contact.email}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Location */}
                        {contact.location && (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="location-outline" size={20} color="#FF6B6B" />
                                    <Text style={styles.sectionTitle}>{t('contacts.location') || 'Localisation'}</Text>
                                </View>
                                <Text style={styles.sectionContent}>{contact.location}</Text>
                            </View>
                        )}

                        {/* Availability */}
                        {contact.availability && (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="time-outline" size={20} color="#9775FA" />
                                    <Text style={styles.sectionTitle}>{t('contacts.availability') || 'Disponibilité'}</Text>
                                </View>
                                <View style={styles.availabilityBadge}>
                                    <Text style={styles.availabilityText}>{contact.availability}</Text>
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.idText}>ID: {contact.id}</Text>
                        <TouchableOpacity style={styles.closeFooterButton} onPress={onClose}>
                            <Text style={styles.closeFooterButtonText}>{t('contacts.close') || 'Fermer'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ContactModal;