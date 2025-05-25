import { Alert, Linking } from 'react-native';

const handleEmergencyCall = async ( phoneNumber: string ) => {
  const phoneUrl = `tel:${phoneNumber}`;

  try {
    const supported = await Linking.canOpenURL(phoneUrl);

    if (supported) {
      // Ouvrir l'application de téléphone avec le numéro d'urgence
      await Linking.openURL(phoneUrl);
    } else {
      Alert.alert(
        'Phone not supported',
        'Your device cannot make phone calls',
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'Could not initiate the emergency call',
      [{ text: 'OK' }]
    );
  }
};

export default handleEmergencyCall;