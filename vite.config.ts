import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			strategies: "injectManifest",
			srcDir: "src",
			filename: "sw.ts",
			registerType: "autoUpdate",
			injectRegister: false,
			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: "HE2B Companion",
				short_name: "HE2B",
				description: "he2b-companion",
				theme_color: "#E9B4CC",
			},

			injectManifest: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
			},

			devOptions: {
				enabled: false,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
	],
});
