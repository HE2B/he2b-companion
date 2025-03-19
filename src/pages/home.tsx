import { Space } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store";

export default function Home() {
	const { t } = useTranslation();
	const { getFirstName } = useAppStore();

	return (
		<>
			<Space
				direction="vertical"
				block>

				<h1>{t("home")}</h1>

				<h2>
					<center>
						{t("hello", { firstName: getFirstName() })}&nbsp;👋
						{/* <motion.span
							animate={{ rotate: [0, 15, 0] }}
							transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
							style={{ display: "inline-block" }}
						>👋</motion.span> */}
					</center>
				</h2>

			</Space>
		</>
	);
}
