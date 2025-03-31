import { Button, ErrorBlock, Space } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Marks() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<>
			<Space
				direction="vertical"
				block>

				<h1>{t("marks")}</h1>


				<ErrorBlock status="empty" />

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
