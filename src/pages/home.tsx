import { ErrorBlock } from "antd-mobile";
import { useTranslation } from "react-i18next"; // Import de la traduction
import i18n from "../../i18n";
import { useAppStore } from "../store";

export default function Home() {
    const { t } = useTranslation(); // Récupération de la fonction t
        const { user } = useAppStore();
    const firstName = user?.displayName?.split(' ')[0] || '';

    return (
        <>
            <h1>{t("home")}</h1> {/* Correction ici */}
            {/*<ErrorBlock status="empty" />*/}
            <h2>Bonjour {firstName} ! <span className="wave">👋</span></h2>
        </>
    );
}
