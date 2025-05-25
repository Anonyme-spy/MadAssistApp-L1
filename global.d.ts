// This extends the React Native StyleSheet type definitions
declare namespace ReactNative {
  interface StyleSheetProperties {
    // This allows any property in style objects
    [key: string]: any;
  }
}

import { TextStyle, ViewStyle } from 'react-native';

// Extend the imported components' style types
declare module '@/components/Themed' {
  interface ViewProps {
    style?: ViewStyle | undefined;
  }

  interface TextProps {
    style?: TextStyle | undefined;
  }
}