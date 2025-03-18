import i18next from "i18next";
import { StateCreator } from "zustand";
import { AppState } from ".";

export interface I18nStore {
	locale: string;
	setLocale: (locale: string) => void;
}

export const createI18nStore: StateCreator<AppState, [], [], I18nStore> = (set) => ({
	locale: "fr",
	setLocale: locale => {
		i18next.changeLanguage(locale);
		set(() => ({ locale }));
	},
});
