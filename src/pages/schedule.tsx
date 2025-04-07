import { ConfigProvider, Space } from "antd-mobile";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScheduledClass from "../components/scheduled-class";
import { useAppStore } from "../store";

// Fonction pour obtenir la couleur associée au classCode
export const getClassColor = (classCode: string, isActive: boolean): string => {
	switch (classCode) {
	  case "FRA":
		return isActive ? "#D72638" : "#B12B34"; // Rouge pour le Français (plus foncé si inactif)
	  case "MATH":
		return isActive ? "#3A0CA3" : "#1D2D9A"; // Bleu pour les Maths (plus foncé si inactif)
	  case "PHY":
		return isActive ? "#4361EE" : "#3547B3"; // Bleu électrique pour la Physique (plus foncé si inactif)
	  case "CHI":
		return isActive ? "#2EC4B6" : "#2A8B7C"; // Turquoise pour la Chimie (plus foncé si inactif)
	  case "HIS":
		return isActive ? "#F4A261" : "#9c4500"; // Orange pour l'Histoire (plus foncé si inactif)
	  case "GEO":
		return isActive ? "#2E8B57" : "#106113"; // Vert pour la Géographie (plus foncé si inactif)
	  case "BIO":
		return isActive ? "#28A745" : "#1E7B34"; // Vert pour la Biologie (plus foncé si inactif)
	  case "ART":
		return isActive ? "#FF6F61" : "#D64B3F"; // Rouge doux pour l'Art (plus foncé si inactif)
	  case "CS":
		return isActive ? "#17A2B8" : "#128C98"; // Bleu clair pour l'informatique (plus foncé si inactif)
	  case "PE":
		return isActive ? "#FFC107" : "#D39E00"; // Jaune pour l'EPS (plus foncé si inactif)
	  case "conge":
		return "#cccccc"; // Gris pour les congés
	  default:
		return "#CCCCCC"; // Gris par défaut
	}
  };
  

export default function Schedule() {
  const { t } = useTranslation();
  const { getNext30Days, getClassesOfDay } = useAppStore();

  const next30Days = getNext30Days();
  const [selectedDate, setSelectedDate] = useState(next30Days[0]);

  const classesForDay = getClassesOfDay(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

  const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const displayDay = (date: Date) => new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date);
  const displayMonth = (date: Date) => new Intl.DateTimeFormat(undefined, { month: "short" }).format(date);

  return (
    <>
      <ConfigProvider>
        <Space direction="vertical" block>
          <h1>{t("calendar")}</h1>

          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "10px",
              padding: "10px",
              background: "var(--adm-color-background)",
              whiteSpace: "nowrap",
              borderBottom: "4px solid var(--adm-color-border)",
            }}
          >
            {next30Days.map(date => (
              <div
                key={date.getTime()}
                style={{
                  padding: "5px",
                  background: isSameDay(date, selectedDate) ? "var(--adm-color-primary)" : "var(--adm-color-background)",
                  color: isSameDay(date, selectedDate) ? "#fff" : "var(--adm-color-text)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  minWidth: "60px",
                  transition: "0.3s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "1rem",
                  border: "1px solid var(--adm-color-border)",
                }}
                onClick={() => setSelectedDate(date)}
              >
                <span style={{ fontSize: "12px" }}><b>{displayDay(date)}</b></span>
                <span style={{ fontSize: "15px" }}>{date.getDate()}</span>
                <span style={{ fontSize: "12px" }}>{displayMonth(date)}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {!classesForDay.length && <p>❌ {t("no_class_on_that_day")}</p>}

            {classesForDay.map(classForDay => (
              <ScheduledClass
                {...classForDay}
                key={classForDay.id}
                style={{
					borderLeft: `5px solid ${getClassColor(classForDay.classCode)}`, // Appel de la fonction avec classCode
                }}
              />
            ))}
          </div>
        </Space>
      </ConfigProvider>
    </>
  );
}
