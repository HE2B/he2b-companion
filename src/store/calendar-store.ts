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
			.filter(c => {
				const now = new Date();
				return c.startTime.getFullYear() === now.getFullYear() && c.startTime.getMonth() === now.getMonth() && c.startTime.getDate() === now.getDate();
			})
			.filter(c => c.endTime >= now)
			.reduce<Clazz | null>((p, c) => {
				if(!p || c.startTime < p.startTime) return c;
				return p;
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

const getClassColor = (classCode: string): string => {
	switch (classCode) {
		case "FRA":
			return "#D72638";
		case "MATH":
			return "#3A0CA3";
		case "PHY":
			return "#4361EE";
		case "CHI":
			return "#2EC4B6";
		case "HIS":
			return "#F4A261";
		case "GEO":
			return "#2E8B57";
		default:
			return "#CCCCCC"; // gris par défaut
	}
};


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

		startTime: new Date("2025-04-01T08:15:00.000+02:00"),
		endTime: new Date("2025-04-01T10:15:00.000+02:00"),
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
		id: "4",
		className: "Physique",
		classCode: "PHY",
		teacherName: "Philibert Phyferoen",
		teacherMatricule: "PPH",
		room: "104",
		startTime: new Date("2025-04-01T16:00:00.000+02:00"),
		endTime: new Date("2025-04-01T18:00:00.000+02:00"),
	},
	{
		id: "5",
		className: "Chimie",
		classCode: "CHI",
		teacherName: "Childéric Chilain",
		teacherMatricule: "CCH",
		room: "105",
		startTime: new Date("2025-04-01T18:00:00.000+02:00"),
		endTime: new Date("2025-04-01T20:00:00.000+02:00"),
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
	{
		id: "7",
		className: "Géographie",
		classCode: "GEO",
		teacherName: "Georges Geoghegan",
		teacherMatricule: "GGE",
		room: "202",
		startTime: new Date("2025-04-07T08:00"),
		endTime: new Date("2025-04-07T10:00"),
	},
	{
		id: "8",
		className: "Français",
		classCode: "FRA",
		teacherName: "Jhon Doe",
		teacherMatricule: "JDO",
		room: "005",
		startTime: new Date("2025-04-07T10:00"),
		endTime: new Date("2025-04-07T12:00"),
	},
	{
		id: "9",
		className: "Maths",
		classCode: "MATH",
		teacherName: "Jhon Doe",
		teacherMatricule: "JDO",
		room: "A32",
		startTime: new Date("2025-04-07T13:00"),
		endTime: new Date("2025-04-07T15:00"),
	},
	{
		id: "10",
		className: "congé",
		classCode: "conge",
		teacherName: null,
		teacherMatricule: null,
		room: null,
		startTime: new Date("2025-04-28T00:00"),
		endTime: new Date("2025-05-02T23:59:59"),
	}
]
