import { Button, Form, Segmented, Space } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { TbMoon, TbSun } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useAppStore } from "../store";

export default function Settings() {
	const { t, i18n } = useTranslation();
	const { theme, setTheme, setLocale } = useAppStore();
	const navigate = useNavigate();

	const themes = [
		{ value: "light", label: t("light"), icon: <TbSun />, },
		{ value: "dark", label: t("dark"), icon: <TbMoon />, },
	];

	const languages = [
		{ value: "fr", label: t("french"), },
		{ value: "en", label: t("english"), },
	];

	return (
		<>
			<Space
				direction="vertical"
				block>

				<h1>{t("settings")}</h1>

				<Form layout="vertical">

					<Form.Item label={t("theme")}>
						<Segmented
							options={themes}
							value={theme}
							onChange={setTheme as any}
							block />
					</Form.Item>

					<Form.Item label={t("language")}>
						<Segmented
							options={languages}
							value={i18n.language}
							onChange={setLocale as any}
							block />
					</Form.Item>

				</Form>

				<br />
				<br />

				<Button
					block
					color="primary"
					onClick={() => navigate("/profile")}>
					{t("back")}
				</Button>

			</Space>
		</>
	);
}
