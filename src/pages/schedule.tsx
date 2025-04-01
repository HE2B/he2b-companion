import { ConfigProvider, Space } from "antd-mobile";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScheduledClass from "../components/scheduled-class";
import { useAppStore } from "../store";

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

					<div style={{
						display: "flex",
						overflowX: "auto",
						gap: "10px",
						padding: "10px",
						background: "var(--adm-color-background)",
						whiteSpace: "nowrap",
						borderBottom: "4px solid var(--adm-color-border)",
					}}>
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

					<div style={{
						marginTop: "1rem",
						display: "flex",
						flexDirection: "column",
						gap: "0.5rem",
					}}>
						{!classesForDay.length && <p>❌ {t("no_class_on_that_day")}</p>}

						{classesForDay
							.map(classForDay => <ScheduledClass {...classForDay} key={classForDay.id} />)}
					</div>
				</Space>
			</ConfigProvider>
		</>
	);
}
