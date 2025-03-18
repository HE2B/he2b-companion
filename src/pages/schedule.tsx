import { ErrorBlock } from "antd-mobile";
import { useTranslation } from "react-i18next"; // Import de la traduction
import i18n from "../../i18n";

export default function Shedule() {
	const { t } = useTranslation(); // Récupération de la fonction t

	return (
		<>
			<h1>{t("calendar")}</h1> {/* Correction ici */}
			<ErrorBlock status="empty" />
		</>
	);
}
