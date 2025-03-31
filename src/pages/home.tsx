import { Space } from "antd-mobile";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScheduledClass from "../components/scheduled-class";
import { useAppStore } from "../store";

export default function Home() {
	const { t } = useTranslation();
	const { getFirstName, getNextClass } = useAppStore();

	const nextClass = getNextClass();

	return (
		<>
			<Space direction="vertical" block>
				<h1>{t("home")}</h1>

				<h2>
					<center>
						{t("hello", { firstName: getFirstName() })}
						<motion.span
							animate={{ rotate: [0, 30, 0] }}
							transition={{ duration: 3, ease: "easeInOut" }}
							style={{ display: "inline-block" }}
						>👋</motion.span>
					</center>
				</h2>

				<h1>{t("next_class")} :</h1>
				{!nextClass && <p>✅ Aucun cours à venir.</p>}
				{nextClass && <ScheduledClass {...nextClass} />}
			</Space>
		</>
	);
}
