import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n";

import { RouterProvider } from "react-router";
import { router } from "./router";

const root = document.getElementById("root")!;
createRoot(root).render(
	<StrictMode>
		<I18nextProvider i18n={i18n}>
			<RouterProvider router={router} />
		</I18nextProvider>
	</StrictMode>
);
