import { useState } from "react";
import { Space, ConfigProvider } from "antd-mobile";
import { useTranslation } from "react-i18next";

export const events = [
	{ id: 1, date: "2025-03-31", cours: "Français", prof: "ABS", tag: "fr", starthour: "08:00", endhour: "10:00", local: "101" },
	{ id: 2, date: "2025-03-31", cours: "Maths", prof: "XYZ", tag: "math", starthour: "10:30", endhour: "12:00", local: "102" },
	{ id: 3, date: "2025-03-31", cours: "Anglais", prof: "ABC", tag: "en", starthour: "14:00", endhour: "16:00", local:"103" },
	{ id: 4, date: "2025-03-31", cours: "Physique", prof: "XYZ", tag: "phy", starthour: "16:00", endhour: "18:30", local:"104" },
	{ id: 5, date: "2025-03-31", cours: "Chimie", prof: "XYZ", tag: "che", starthour: "18:30", endhour: "19:30", local:"105" },
	{ id: 6, date: "2025-04-02", cours: "Histoire", prof: "DEF", tag: "hist", starthour: "14:00", endhour: "16:00", local:"201" },
];

export default function Schedule() {
	const { t } = useTranslation();
	const today = new Date();

	// Génération des 30 prochains jours
	const joursAffiches = Array.from({ length: 32 }, (_, i) => {
		const date = new Date();
		date.setDate(today.getDate() + i);
		return {
			jour: date.toLocaleDateString("fr-FR", { weekday: "short" }),
			numero: date.getDate(),
			mois: date.toLocaleDateString("fr-FR", { month: "short" }),
			fullDate: date.toISOString().split("T")[0],
		};
	});

	const [selectedDate, setSelectedDate] = useState(joursAffiches[0]);


	// Vérifier si un événement est passé
	const isPastEvent = (event) => {
		const now = new Date();
		const eventDate = new Date(event.date);
		const [endHour, endMinute] = event.endhour.split(":").map(Number);

		// Ajouter l'heure de fin à la date de l'événement
		eventDate.setHours(endHour, endMinute, 0, 0);

		return now > eventDate; // True si l'événement est passé
	};

	// Filtrer les événements pour le jour sélectionné
	const filteredEvents = events.filter(event => event.date === selectedDate.fullDate);

	return (
		<ConfigProvider>
			<Space direction="vertical" block>
				<h1>{t("calendar")}</h1>

				<div style={{ display: "flex", overflowX: "auto", gap: "10px", padding: "10px", background: "var(--adm-color-background)", whiteSpace: "nowrap", borderBottom: "4px solid var(--adm-color-border)" }}>
					{joursAffiches.map((item, index) => (
						<div 
							key={index} 
							style={{ 
								padding: "10px",
								background: selectedDate.numero === item.numero ? "var(--adm-color-primary)" : "var(--adm-color-background)",
								color: selectedDate.numero === item.numero ? "#fff" : "var(--adm-color-text)",
								borderRadius: "8px",
								cursor: "pointer",
								textAlign: "center",
								minWidth: "60px",
								transition: "0.3s",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								fontSize: "14px",
								border: "1px solid var(--adm-color-border)"
							}}
							onClick={() => {
								setSelectedDate(item);
							}}
						>
							<span style={{ fontWeight: "bold" }}>{item.jour}</span>
							<span style={{ fontSize: "18px" }}>{item.numero}</span>
							<span>{item.mois}</span>
						</div>
					))}
				</div>

				<div style={{ padding: "20px", background: "var(--adm-color-background)", marginTop: "10px", borderRadius: "8px", color: "var(--adm-color-text)" }}>
					<h2>{selectedDate.jour} {selectedDate.numero} {selectedDate.mois}</h2>
					<p>📅 Contenu du jour sélectionné</p>
					
					{filteredEvents.length > 0 ? (
						filteredEvents.map(event => {
							const past = isPastEvent(event);

							return (
								<div key={event.id} style={{ 
									padding: "10px", 
									margin: "10px 0", 
									background: "var(--adm-color-fill)", 
									borderRadius: "5px", 
									border: "1px solid var(--adm-color-border)",
									opacity: past ? 0.5 : 1, // Rend le cours plus transparent si passé
									textDecoration: past ? "line-through" : "none" // Barre le texte si passé
								}}>
									<h3>{event.cours} ({event.tag.toUpperCase()})</h3>
									<p>👨‍🏫 {event.prof}</p>
									<p>⏰ {event.starthour} - {event.endhour}</p>
									<p>🏫 Local: {event.local}</p>
								</div>
							);
						})
					) : (
						<p>❌ Aucun cours ce jour-là.</p>
					)}
				</div>
			</Space>
		</ConfigProvider>
	);
}
