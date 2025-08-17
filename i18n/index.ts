import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './locales/en.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr }
};

// Détecteur de langue simplifié
const languageDetector = {
  type: 'languageDetector' as const,
  async: false,
  detect: () => {
    try {
      const locales = getLocales();
      const deviceLanguage = locales[0]?.languageCode || 'fr';
      return ['en', 'fr'].includes(deviceLanguage) ? deviceLanguage : 'fr';
    } catch {
      return 'fr';
    }
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;