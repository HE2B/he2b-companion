import { StateCreator } from "zustand";
import { AppState } from ".";

export interface CalendarStore {
	classes: Clazz[];
	getNextClass: () => Clazz | null;
	getClassesOfDay: (year: number, month: number, date: number) => Clazz[];
	getNext30Days: () => Date[];
}

export const createCalendarStore: StateCreator<AppState, [], [], CalendarStore> = (set, get) => ({
	classes: defaultClasses,
	getNextClass: () => {
		const { classes } = get();
		const now = new Date();
		return classes
			.reduce<Clazz | null>((p, c) => {
				if(!p) return c;
				return c.startTime > now && c.startTime < p.startTime ? c : p;
			}, null);
	},
	getClassesOfDay: (year: number, month: number, date: number) => {
		const { classes } = get();
		return classes
			.filter(c => c.startTime.getFullYear() === year && c.startTime.getMonth() === month && c.startTime.getDate() === date)
			.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
	},
	getNext30Days: () => {
		const today = new Date();
		return Array.from({ length: 30 }, (_, i) => new Date(today.getTime() + i * 24 * 60 * 60 * 1000));
	},
});

export interface Clazz {
	id: string;
	className: string;
	classCode: string;
	teacherName: string;
	teacherMatricule: string;
	room: string;
	startTime: Date;
	endTime: Date;
}

const defaultClasses = [
	{
		id: "1",
		className: "Français",
		classCode: "FRA",
		teacherName: "Francis François",
		teacherMatricule: "FFR",
		room: "101",
		startTime: new Date("2025-04-01T08:15:00.000"),
		endTime: new Date("2025-04-01T10:15:00.000"),
	},
	{
		id: "2",
		className: "Maths",
		classCode: "MATH",
		teacherName: "Mathéo Mathieu",
		teacherMatricule: "MMA",
		room: "102",
		startTime: new Date("2025-04-01T10:30:00.000"),
		endTime: new Date("2025-04-01T12:30:00.000"),
	},
	{
		id: "3",
		className: "Anglais",
		classCode: "ANG",
		teacherName: "Angus Angli",
		teacherMatricule: "AAN",
		room: "103",
		startTime: new Date("2025-04-01T14:00:00.000+01:00"),
		endTime: new Date("2025-04-01T16:00:00.000+01:00"),
	},
	{
		id: "4",
		className: "Physique",
		classCode: "PHY",
		teacherName: "Philibert Phyferoen",
		teacherMatricule: "PPH",
		room: "104",
		startTime: new Date("2025-04-01T16:00:00.000+01:00"),
		endTime: new Date("2025-04-01T18:30:00.000+01:00"),
	},
	{
		id: "5",
		className: "Chimie",
		classCode: "CHI",
		teacherName: "Childéric Chilain",
		teacherMatricule: "CCH",
		room: "105",
		startTime: new Date("2025-04-01T18:30:00.000+01:00"),
		endTime: new Date("2025-04-01T19:30:00.000+01:00"),
	},
	{
		id: "6",
		className: "Histoire",
		classCode: "HIS",
		teacherName: "Hissam Histram",
		teacherMatricule: "HHI",
		room: "201",
		startTime: new Date("2025-04-02T14:00:00.000+01:00"),
		endTime: new Date("2025-04-02T16:00:00.000+01:00"),
	},
];
