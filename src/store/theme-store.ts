import { StateCreator } from "zustand";

export type Theme = "light" | "dark";

export interface ThemeSlice {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const createThemeStore: StateCreator<ThemeSlice> = (set) => ({
	theme: "light",
	setTheme: (theme: Theme) => {
		document.documentElement.setAttribute("data-prefers-color-scheme", theme);
		set(() => ({ theme }));
	},
});
