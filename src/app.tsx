import { ConfigProvider, SafeArea } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigation } from "react-router";

import PWABadge from "./PWABadge";
import LoadingLayout from "./layouts/loading-layout";

export default function App() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<>
			<ConfigProvider locale={enUS}>
				<HelmetProvider>
					<Head />
					<SafeArea position="top" />
					{isNavigating
						? <LoadingLayout />
						: <Outlet />}
					<PWABadge />
					<SafeArea position="bottom" />
				</HelmetProvider>
			</ConfigProvider>
		</>
	);
}

function Head() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<meta name="description" content={t("meta-description")} />
				<meta name="keywords" content={t("meta-keywords")} />
				<meta name="author" content={t("meta-author")} />
			</Helmet>
		</>
	);
}
