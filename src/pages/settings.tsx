import { Form, Segmented } from "antd-mobile";
import { SegmentedLabeledOption } from "antd-mobile/es/components/segmented/segmented";
import { TbMoon, TbSun } from "react-icons/tb";
import { useAppStore } from "../store";
import { Theme } from "../store/theme-store";
import { useTranslation } from "react-i18next"; // Import i18n
import i18next from "i18next"; 

export default function Settings() {
    const { t, i18n } = useTranslation(); // Traduction et changement de langue
    const { theme, setTheme } = useAppStore();

    const themes: Record<Theme, SegmentedLabeledOption & { value: Theme }> = {
        light: {
            label: t("light"),
            value: "light",
            icon: <TbSun />,
        },
        dark: {
            label: t("dark"),
            value: "dark",
            icon: <TbMoon />,
        },
    };

    // Options pour la sélection de langue
    const languages = [
        { label: "Français", value: "fr" },
        { label: "English", value: "en" }
    ];

    return (
        <>
            <h1>{t("settings")}</h1>

            <Form layout="vertical">
                {/* Sélecteur de thème */}
                <Form.Item label={t("theme")}>
                    <Segmented
                        options={Object.values(themes)}
                        value={theme}
                        onChange={setTheme as any}
                        block
                    />
                </Form.Item>

                {/* Sélecteur de langue */}
				<Form.Item label={t("language")}>
					<Segmented
						options={languages}
						value={i18n.language}
						onChange={(lang) => i18next.changeLanguage(lang)} // Utilisation directe d'i18next
						block
					/>
				</Form.Item>
            </Form>
        </>
    );
}
