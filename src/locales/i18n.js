import * as RNLocalize from 'react-native-localize';
import I18n from 'react-native-i18n';

import en from '../locales/languages/en.json';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageCode;
}

I18n.fallbacks = true;

I18n.translations = {
  default: en,
  en: en,
  en_US: en,
};

export function strings(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
