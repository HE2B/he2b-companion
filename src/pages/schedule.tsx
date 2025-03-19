import { ErrorBlock, Space } from "antd-mobile";
import { useTranslation } from "react-i18next";

export default function Shedule() {
	const { t } = useTranslation();

	return (
		<>
			<Space
				direction="vertical"
				block>

				<h1>{t("calendar")}</h1>

				<ErrorBlock status="empty" />

			</Space>
		</>
	);
}
