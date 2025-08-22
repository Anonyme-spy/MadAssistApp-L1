// constants/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Constantes pour éviter la duplication
const BORDER_RADIUS = {
    small: 15,
    medium: 20,
    large: 28,
    xlarge: 32,
    circle: 36,
};

const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

const COLORS = {
    white: '#FFFFFF',
    whiteTransparent: 'rgba(255,255,255,0.9)',
    whiteTransparent2: 'rgba(255,255,255,0.2)',
    whiteTransparent3: 'rgba(255,255,255,0.3)',
    whiteTransparent1: 'rgba(255,255,255,0.1)',
};

export const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    // ... autres styles optimisés
});