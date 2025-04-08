import { useEffect, useState } from "react";
import { seedCalendar } from "../script/SeedCalendar";
import { ConfigProvider, Space } from "antd-mobile";
import { useTranslation } from "react-i18next";
import ScheduledClass from "../components/scheduled-class";
import { useAppStore } from "../store";

// Fonction pour obtenir la couleur associée au classCode
export const getClassColor = (classCode: string, isActive: boolean): string => {
  switch (classCode) {
    case "FRA":
      return isActive ? "#D72638" : "#B12B34";
    case "MATH":
      return isActive ? "#3A0CA3" : "#1D2D9A";
    case "PHY":
      return isActive ? "#4361EE" : "#3547B3";
    case "CHI":
      return isActive ? "#2EC4B6" : "#2A8B7C";
    case "HIS":
      return isActive ? "#F4A261" : "#9c4500";
    case "GEO":
      return isActive ? "#2E8B57" : "#106113";
    case "BIO":
      return isActive ? "#28A745" : "#1E7B34";
    case "ART":
      return isActive ? "#FF6F61" : "#D64B3F";
    case "CS":
      return isActive ? "#17A2B8" : "#128C98";
    case "PE":
      return isActive ? "#FFC107" : "#D39E00";
    case "conge":
      return "#cccccc"; // Gris pour les congés
    default:
      return "#CCCCCC"; // Gris par défaut
  }
};

loadBaseClasses: async () => {
  const snapshot = await getDocs(collection(db, "base_calendar"));
  const loaded = snapshot.docs.map(doc => {
    const data = doc.data();

    // Vérifie si startTime et endTime existent avant de les convertir
    const startTime = data.startTime ? data.startTime.toDate() : null;
    const endTime = data.endTime ? data.endTime.toDate() : null;

    // Si startTime ou endTime est manquant, log l'erreur et continue avec les autres
    if (!startTime || !endTime) {
      console.error(`Document avec ID ${doc.id} a des champs de temps invalides.`);
      return null; // Retourne null pour les documents invalides
    }

    return {
      ...data,
      id: doc.id,
      startTime,
      endTime,
    } as Clazz;
  }).filter(clazz => clazz !== null); // Filtre les documents invalides

  set({ classes: loaded });
}


export default function SeedAndSchedulePage() {
  // Injection des données au chargement
  useEffect(() => {
    seedCalendar();
  }, []);

  const { t } = useTranslation();
  const { getNext30Days, getClassesOfDay, loadBaseClasses } = useAppStore();

  // On charge les classes depuis Firebase
  useEffect(() => {
    loadBaseClasses();
  }, [loadBaseClasses]);

  const next30Days = getNext30Days();
  const [selectedDate, setSelectedDate] = useState(next30Days[0]);

  // On récupère les classes pour la date sélectionnée
  const classesForDay = getClassesOfDay(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

  const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const displayDay = (date: Date) => new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date);
  const displayMonth = (date: Date) => new Intl.DateTimeFormat(undefined, { month: "short" }).format(date);

  return (
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
                borderLeft: `5px solid ${getClassColor(classForDay.classCode, true)}`,
              }}
            />
          ))}
        </div>
      </Space>
    </ConfigProvider>
  );
}
