import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, createAuthStore } from "./auth-store";
import { createI18nStore, I18nStore } from "./i18n-store";
import { createThemeStore, ThemeSlice } from "./theme-store";

export type AppState = ThemeSlice & AuthSlice & I18nStore;

export const useAppStore = create<AppState>()(persist((...a) => ({
	...createThemeStore(...a),
	...createAuthStore(...a),
	...createI18nStore(...a),
}), {
	name: "app",
	partialize: ({ theme }) => ({ theme }),
	onRehydrateStorage: () => (state?: AppState, error?: unknown) => {
		if(error) console.error(error);
		if(!state) return;
		state.setTheme(state.theme);
		state.setLocale(state.locale);
	},
}));
