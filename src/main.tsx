import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Corrige l'importation
import { I18nextProvider } from "react-i18next"; // Ajoute ceci
import i18n from "../i18n"; // Import correct de la config

import App from "./app";

const root = document.getElementById("root")!;
createRoot(root).render(
	<StrictMode>
		<I18nextProvider i18n={i18n}> {/* Ajout du provider */}
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</I18nextProvider>
	</StrictMode>
);
