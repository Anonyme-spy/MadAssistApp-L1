import { Alert, Linking, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const handleEmergencyCall = async (phoneNumber: string) => {
  // Nettoyer le numéro de téléphone pour assurer un format correct
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  const phoneUrl = `tel:${cleanedNumber}`;

  try {
    // Vérifier si l'appareil peut gérer les appels téléphoniques
    const supported = await Linking.canOpenURL(phoneUrl);

    if (supported) {
      // Ouvrir l'application téléphone avec le numéro d'urgence
      await Linking.openURL(phoneUrl);
    } else {
      // L'appareil ne prend pas en charge les appels directs - afficher une alerte informative avec option de copie
      Alert.alert(
        'Appel non pris en charge',
        'Votre appareil ne peut pas passer d\'appels téléphoniques. Veuillez utiliser un autre appareil pour appeler ce numéro d\'urgence.',
        [
          {
            text: 'Copier le numéro',
            onPress: async () => {
              await Clipboard.setStringAsync(phoneNumber);
              Alert.alert('Numéro copié', `${phoneNumber} copié dans le presse-papiers`);
            }
          },
          { text: 'OK' }
        ]
      );
    }
  } catch (error) {
    console.error('Erreur d\'appel d\'urgence:', error);
    // Solution de secours pour copier le numéro en cas d'échec de l'appel
    Alert.alert(
      'Erreur d\'appel d\'urgence',
      'Impossible de passer l\'appel. Veuillez composer manuellement le numéro d\'urgence.',
      [
        {
          text: 'Copier le numéro',
          onPress: async () => {
            await Clipboard.setStringAsync(phoneNumber);
            Alert.alert('Numéro copié', `${phoneNumber} copié dans le presse-papiers`);
          }
        },
        { text: 'OK' }
      ]
    );
  }
};

export default handleEmergencyCall;