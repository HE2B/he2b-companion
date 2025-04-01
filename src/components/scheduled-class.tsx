import { useTranslation } from "react-i18next";

export default function ScheduledClass({ className, classCode, teacherName, teacherMatricule, startTime, endTime, room }: ScheduledClassProps) {
	const { t } = useTranslation();

	const past = endTime < new Date();
	const active = startTime <= new Date() && endTime >= new Date();
	const startTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(startTime);
	const endTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(endTime);

	return (
		<>
			<div style={{
				paddingInline: "1rem",
				background: "var(--adm-color-fill)",
				color: active ? "var(--adm-color-text)" : "var(--adm-color-text-secondary)",
				borderRadius: "5px",
				border: "1px solid var(--adm-color-border)",
				opacity: past ? 0.5 : 1,
				textDecoration: past ? "line-through" : "none"
			}}>
				<p style={{
					fontSize: "0.8rem",
					fontWeight: "bold",
				}}>{className} ({classCode})</p>
				<p>{startTimeStr} - {endTimeStr} | {t("room")} : {room} | {teacherName} ({teacherMatricule})</p>
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
