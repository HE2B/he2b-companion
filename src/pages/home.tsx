import { useTranslation } from "react-i18next";
import { useAppStore } from "../store";

export default function Home() {
	const { t } = useTranslation();
	const { user } = useAppStore();

	const firstName = user?.displayName?.split(" ")[0] || "";

	return (
		<>
			<h1>{t("home")}</h1>
			<h2>Bonjour {firstName} ! <span className="wave">👋</span></h2>
		</>
	);
}
