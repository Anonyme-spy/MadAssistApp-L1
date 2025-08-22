// components/HeroSection.tsx
import React from 'react';
import { View, Text } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import {StyleSheet} from "react-native";

interface HeroSectionProps {
    themeColors: any;
    t: (key: string) => string;
}

const HeroSection = React.memo(({ themeColors, t }: HeroSectionProps) => (
    <View style={styles.heroWrapper}>
        <LinearGradient
            colors={themeColors.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
        >
            <View style={styles.heroDecorations}>
                <View style={[styles.decoration, styles.decoration1]} />
                <View style={[styles.decoration, styles.decoration2]} />
                <View style={[styles.decoration, styles.decoration3]} />
            </View>

            <View style={styles.heroContent}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <FontAwesome name="shield" size={32} color="#FFFFFF" />
                    </View>
                </View>

                <Text style={styles.heroTitle}>
                    {t('home.heroTitle')}
                </Text>
                <Text style={styles.heroSubtitle}>
                    {t('home.heroSubtitle')}
                </Text>

                <View style={styles.urgencyBadge}>
                    <FontAwesome name="clock-o" size={14} color="#FFFFFF" />
                    <Text style={styles.urgencyText}>Assistance 24/7</Text>
                </View>
            </View>
        </LinearGradient>
    </View>
));

export default HeroSection;

const styles = StyleSheet.create({
    // HERO SECTION uniquement
    heroWrapper: {
        marginBottom: -30,
        zIndex: 1,
    },

    hero: {
        height: 320,
        width: '100%',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
    },

    heroDecorations: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    decoration: {
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },

    decoration1: {
        width: 120,
        height: 120,
        top: -30,
        right: -20,
    },

    decoration2: {
        width: 80,
        height: 80,
        top: 100,
        left: -20,
    },

    decoration3: {
        width: 60,
        height: 60,
        bottom: 50,
        right: 30,
    },

    heroContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
        zIndex: 2,
    },

    logoContainer: {
        marginBottom: 24,
    },

    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },

    heroTitle: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 12,
        lineHeight: 34,
        letterSpacing: -0.5,
    },

    heroSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 22,
        marginBottom: 20,
        fontWeight: '500',
    },

    urgencyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },

    urgencyText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
});