// components/StatsSection.tsx
import React from 'react';
import { View, Text } from '@/components/Themed';
import {StyleSheet} from "react-native";

interface StatsSectionProps {
    themeColors: any;
}

const StatsSection = React.memo(({ themeColors }: StatsSectionProps) => (
    <View style={[styles.statsSection, { backgroundColor: 'transparent' }]}>
        <View style={[styles.statsContainer, {
            backgroundColor: themeColors.cardBackground,
            shadowColor: themeColors.shadowColor
        }]}>
            <StatItem
                number="24/7"
                label="Disponible"
                textColor={themeColors.textPrimary}
                labelColor={themeColors.textSecondary}
            />
            <View style={[styles.statDivider, { backgroundColor: themeColors.dividerColor }]} />
            <StatItem
                number="4"
                label="Services"
                textColor={themeColors.textPrimary}
                labelColor={themeColors.textSecondary}
            />
            <View style={[styles.statDivider, { backgroundColor: themeColors.dividerColor }]} />
            <StatItem
                number="MDG"
                label="Madagascar"
                textColor={themeColors.textPrimary}
                labelColor={themeColors.textSecondary}
            />
        </View>
    </View>
));

const StatItem = React.memo(({ number, label, textColor, labelColor }: {
    number: string;
    label: string;
    textColor: string;
    labelColor: string;
}) => (
    <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: textColor }]}>{number}</Text>
        <Text style={[styles.statLabel, { color: labelColor }]}>{label}</Text>
    </View>
));

export default StatsSection;

const styles = StyleSheet.create({
    // STATS SECTION uniquement
    statsSection: {
        paddingHorizontal: 20,
        zIndex: 2,
        marginTop: -20,
    },

    statsContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        padding: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },

    statItem: {
        flex: 1,
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
    },

    statLabel: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    statDivider: {
        width: 1,
        height: '100%',
        marginHorizontal: 16,
    },
});