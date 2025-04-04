import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { i18n } from "./i18n";

import App from "./app";

const root = document.getElementById("root")!;
createRoot(root).render(
	<StrictMode>
		<I18nextProvider i18n={i18n}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</I18nextProvider>
	</StrictMode>
);
