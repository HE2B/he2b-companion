import { useTranslation } from "react-i18next";

export default function ScheduledClass({ className, classCode, teacherName, teacherMatricule, startTime, endTime, room }: ScheduledClassProps) {
	const { t } = useTranslation();

	const past = new Date() > endTime;
	const startTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(startTime);
	const endTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(endTime);

	return (
		<>
			<div style={{
				paddingInline: "1rem",
				background: "var(--adm-color-fill)",
				borderRadius: "5px",
				border: "1px solid var(--adm-color-border)",
				opacity: past ? 0.5 : 1,
				textDecoration: past ? "line-through" : "none"
			}}>
				<h3>{className} ({classCode})</h3>
				<p>👨‍🏫 {teacherName} ({teacherMatricule})</p>
				<p>⏰ {startTimeStr} - {endTimeStr}</p>
				<p>🏫 {t("room")} : {room}</p>
			</div>
		</>
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
