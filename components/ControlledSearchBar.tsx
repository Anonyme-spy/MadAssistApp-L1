import { SearchBar } from "@rneui/themed";
import React from "react";
import { StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { View } from "@/components/Themed";
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useTranslation } from 'react-i18next';

interface ControlledSearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function ControlledSearchBar({ value, onChangeText, placeholder }: ControlledSearchBarProps) {
    const { t } = useTranslation();
    const [isFocused, setIsFocused] = React.useState(false);

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
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
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
    );
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