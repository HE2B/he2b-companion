import { Space } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store";
import { motion } from "framer-motion";
import { events } from "./schedule";

export default function Home() {
	const { t } = useTranslation();
	const { getFirstName } = useAppStore();
	const now = new Date();

	const getNextCourse = () => {
		// Convertir les événements en objets Date exploitables
		const upcomingEvents = events
			.map(event => ({
				...event,
				eventDate: new Date(`${event.date}T${event.starthour}`) // Fusionner la date et l'heure de début
			}))
			.filter(event => event.eventDate.getTime() > now.getTime()) // Comparaison correcte
			.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime()); // Trier du plus proche au plus lointain

		return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
	};

	const nextCourse = getNextCourse();

	return (
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

			<h1>{t("NextCours")} :</h1>
			{nextCourse ? (
				<div style={{ padding: "10px", background: "var(--adm-color-fill)", borderRadius: "8px", textAlign: "left", border: "1px solid var(--adm-color-border)" }}>
					<h2 style={{ borderBottom:"2px solid var(--adm-color-border)", paddingBottom: "15px" }}>
						📚 {nextCourse.cours} ({nextCourse.tag.toUpperCase()})
					</h2>
					<p>👨‍🏫 {nextCourse.prof}</p>
					<p>⏰ {nextCourse.starthour} - {nextCourse.endhour}</p>
					<p>🏫 Local: {nextCourse.local}</p>
				</div>
			) : (
				<p>✅ Aucun cours à venir.</p>
			)}
		</Space>
	);
}
