import { getDocs } from "firebase/firestore";
import { StateCreator } from "zustand";
import { getBaseCalendarCollection } from "../firestore";
import { Class as Clazz } from "../model/class";
import { AppState } from "./index";

export interface CalendarStore {
	classes: Clazz[];
	loadBaseClasses: () => Promise<void>;
	getNextClass: () => Clazz | null;
	getCurrentClass: () => Clazz | null;
	getClassesOfDay: (year: number, month: number, date: number) => Clazz[];
	getNext7Days: () => Date[];
	getClassColor: (classCode: string, isActive: boolean) => string;
}

const defaultClassColors: Record<string, Record<"active" | "inactive", string>> = {
	"FRA": { "active": "#D72638", "inactive": "#B12B34" },
	"MATH": { "active": "#3A0CA3", "inactive": "#1D2D9A" },
	"PHY": { "active": "#4361EE", "inactive": "#3547B3" },
	"CHI": { "active": "#2EC4B6", "inactive": "#2A8B7C" },
	"HIS": { "active": "#F4A261", "inactive": "#9c4500" },
	"GEO": { "active": "#2E8B57", "inactive": "#106113" },
	"BIO": { "active": "#28A745", "inactive": "#1E7B34" },
	"ART": { "active": "#FF6F61", "inactive": "#D64B3F" },
	"CS": { "active": "#17A2B8", "inactive": "#128C98" },
	"PE": { "active": "#FFC107", "inactive": "#D39E00" },
	"conge": { "active": "#cccccc", "inactive": "#cccccc" },
};

const defaultClassColor = { active: "#cccccc", inactive: "#cccccc" };

export const createCalendarStore: StateCreator<AppState, [], [], CalendarStore> = (set, get) => ({
	classes: [],
	loadBaseClasses: async () => {
		const snapshot = await getDocs(getBaseCalendarCollection());
		const loaded = snapshot.docs.map(doc => {
			const data = doc.data();


			const startTime = data.startTime ? data.startTime.toDate() : null;
			const endTime = data.endTime ? data.endTime.toDate() : null;


			if(!startTime || !endTime) {
				console.error(`Document avec ID ${doc.id} a des champs de temps invalides. startTime ou endTime est manquant.`);
				return null;
			}

			return {
				...data,
				id: doc.id,
				startTime,
				endTime,
			} as Clazz;
		}).filter(clazz => clazz !== null);

		set({ classes: loaded });
	},
	getNextClass: () => {
		const { classes } = get();
		const now = new Date();

		return classes
			.filter(c =>
				c.startTime.getFullYear() === now.getFullYear() &&
				c.startTime.getMonth() === now.getMonth() &&
				c.startTime.getDate() === now.getDate() &&
				c.startTime > now
			)
			.reduce<Clazz | null>((p, c) => (!p || c.startTime < p.startTime ? c : p), null);
	},
	getCurrentClass: () => {
		const { classes } = get();
		const now = new Date();

		return classes
			.filter(c =>

				c.startTime.getFullYear() === now.getFullYear() &&
				c.startTime.getMonth() === now.getMonth() &&
				c.startTime.getDate() === now.getDate()
			)
			.filter(c => now >= c.startTime && now <= c.endTime)
			.reduce<Clazz | null>((p, c) => (!p || c.startTime < p.startTime ? c : p), null);
	},
	getClassesOfDay: (year, month, date) => {
		const { classes } = get();

		return classes
			.filter(c =>
				c.startTime.getFullYear() === year &&
				c.startTime.getMonth() === month - 1 &&
				c.startTime.getDate() === date
			)
			.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
	},
	getNext7Days: () => {
		const today = new Date();
		return Array.from({ length: 15 }, (_, i) => new Date(today.getTime() + i * 86400000));
	},
	getClassColor: (classCode, isActive) => (defaultClassColors[classCode] ?? defaultClassColor)[isActive ? "active" : "inactive"],
});

/*
const loadBaseClasses = async () => {
	const snapshot = await getDocs(getBaseCalendarCollection());
	const loaded = snapshot.docs.map(doc => {
		const data = doc.data();
		const startTime = data.startTime ? data.startTime.toDate() : null;
		const endTime = data.endTime ? data.endTime.toDate() : null;

		if(!startTime || !endTime) {
			console.error(`Document avec ID ${doc.id} a des champs de temps invalides.`);
			return null;
		}

		return {
			...data,
			id: doc.id,
			startTime,
			endTime,
		} as Clazz;
	}).filter(clazz => clazz !== null);

	console.log(loaded);
	set({ classes: loaded });
};

export const seedCalendar = async () => {
	const querySnapshot = await getDocs(getBaseCalendarCollection());
	const existingClasses = querySnapshot.docs.map(doc => doc.data());


	const classesToAdd = newClasses.filter((newClass) => {
		const existingClass = existingClasses.find(existing => existing.id === newClass.id);
		if(!existingClass) return true;

		const existingStartTime = existingClass.startTime.toDate();
		const existingEndTime = existingClass.endTime.toDate();

		if(existingStartTime.toISOString() !== newClass.startTime.toISOString() ||
			existingEndTime.toISOString() !== newClass.endTime.toISOString()) return true;

		return false;
	});


	if(classesToAdd.length > 0) {
		const promises = classesToAdd.map((clazz) =>
			setDoc(doc(getBaseCalendarCollection(), clazz.id), {
				...clazz,
				startTime: clazz.startTime,
				endTime: clazz.endTime,
			})
		);

		await Promise.all(promises);
		console.log("✅ Nouveau calendrier semé avec succès!");
	} else {
		console.log("Aucun changement à apporter. Les cours sont déjà à jour.");
	}
};
*/
