import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from "../locales/en.json";
import fr from "../locales/fr.json";

i18n
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en satisfies typeof en },
			fr: { translation: fr satisfies typeof en },
		},
		lng: "fr",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		}
	});

export { i18n };
