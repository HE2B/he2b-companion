import { useTranslation } from "react-i18next";
import { Class as Clazz } from "../model/class";

const isClassActive = (startTime: Date, endTime: Date): boolean => {
	const now = new Date();
	return startTime <= now && endTime >= now;
};

export default function ScheduledClass({ clazz, ...rest }: ScheduledClassProps) {
	const { t } = useTranslation();

	const past = clazz.endTime < new Date();
	const active = isClassActive(clazz.startTime, clazz.endTime);

	const startTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(clazz.startTime);
	const endTimeStr = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(clazz.endTime);

	return (
		<div
			{...rest}
			style={{
				paddingInline: "1rem",
				background: "var(--adm-color-fill)",
				color: active ? "var(--adm-color-text)" : "var(--adm-color-text-secondary)",
				boxShadow: active ? "0px 1px 10px -2.5px rgba(243, 243, 243, 0.1)" : "none",
				borderRadius: "5px",
				border: "1px solid var(--adm-color-border)",
				opacity: past ? 0.5 : 1,
				textDecoration: past ? "line-through" : "none",
				...rest.style,
			}}
		>
			<p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
				{clazz.className} ({clazz.classCode})
			</p>
			<p>
				{startTimeStr} - {endTimeStr} | {t("room")} : {clazz.room} | {clazz.teacherName} ({clazz.teacherMatricule})
			</p>
		</div>
	);
}

export interface ScheduledClassProps extends React.HTMLAttributes<HTMLDivElement> {
	clazz: Clazz;
}
