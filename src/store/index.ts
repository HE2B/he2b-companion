import { create } from "zustand";
import { AuthSlice, createAuthStore } from "./auth-store";
import { createThemeStore, ThemeSlice } from "./theme-store";

export type AppState = ThemeSlice & AuthSlice;

export const useAppStore = create<AppState>()((...a) => ({
	...createThemeStore(...a),
	...createAuthStore(...a),
}));
