import { ErrorBlock } from "antd-mobile";
import { useTranslation } from "react-i18next"; // Import de la traduction
import i18n from "../../i18n";

export default function Home() {
    const { t } = useTranslation(); // Récupération de la fonction t

    return (
        <>
            <h1>{t("home")}</h1> {/* Correction ici */}
            <ErrorBlock status="empty" />
        </>
    );
}
