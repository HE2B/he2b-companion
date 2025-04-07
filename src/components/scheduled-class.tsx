import { useTranslation } from "react-i18next";

// Fonction pour vérifier si la classe est active ou non
const isClassActive = (startTime: Date, endTime: Date): boolean => {
  const now = new Date();
  return startTime <= now && endTime >= now;
};

export default function ScheduledClass({
  className,
  classCode,
  teacherName,
  teacherMatricule,
  startTime,
  endTime,
  room,
  style, // Ajoute le style comme prop
}: ScheduledClassProps & { style?: React.CSSProperties }) {
  const { t } = useTranslation();

  // Détermine si la classe est passée ou active
  const past = endTime < new Date();
  const active = isClassActive(startTime, endTime); // Utilisation de la fonction isClassActive

  const startTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(startTime);
  const endTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(endTime);

  return (
    <div
      style={{
        paddingInline: "1rem",
        background: "var(--adm-color-fill)",
        color: active ? "var(--adm-color-text)" : "var(--adm-color-text-secondary)",
		boxShadow: active ? "0px 1px 10px -2.5px rgba(243, 243, 243, 0.1)" : "none",
        borderRadius: "5px",
        border: "1px solid var(--adm-color-border)",
        opacity: past ? 0.5 : 1,
        textDecoration: past ? "line-through" : "none",
        ...style, // Applique le style transmis via props
      }}
    >
      <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
        {className} ({classCode})
      </p>
      <p>
        {startTimeStr} - {endTimeStr} | {t("room")} : {room} | {teacherName} ({teacherMatricule})
      </p>
    </div>
  );
}

export interface ScheduledClassProps {
  className: string;
  classCode: string;
  teacherName: string;
  teacherMatricule: string;
  room: string;
  startTime: Date;
  endTime: Date;
}
