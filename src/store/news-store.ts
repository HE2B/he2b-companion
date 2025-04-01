import { StateCreator } from "zustand";
import { AppState } from ".";
import { News, NewsType } from "../model/news";

export interface NewsStore {
	news: News[];
	setNews: (news: News[]) => void;
	allTags: string[];
	tagFilters: string[];
	setTagFilters: (tagFilters: string[]) => void;
	toggleTagFilter: (tagFilter: string) => void;
	getFilteredNews: () => News[];
	tagColors: Record<NewsType | string, string>;
	getTagsColor: (tag: (NewsType | string)[]) => string;
}

export const createNewsStore: StateCreator<AppState, [], [], NewsStore> = (set, get) => ({
	news: defaultNews,
	setNews: news => set({ news }),
	allTags: defaultAllTags,
	tagFilters: defaultTagFilters,
	setTagFilters: tagFilters => set({ tagFilters }),
	toggleTagFilter: tagFilter => {
		const { tagFilters } = get();
		set({
			tagFilters: tagFilters.includes(tagFilter)
				? tagFilters.filter((t) => t !== tagFilter)
				: [...tagFilters, tagFilter]
		});
	},
	getFilteredNews: () => {
		const { news, tagFilters } = get();
		return news
			.filter((item) => !tagFilters.length || item.tags.some((tag) => tagFilters.includes(tag)))
			.sort((a, b) => b.date.getTime() - a.date.getTime());
	},
	tagColors: defaultTagColors,
	getTagsColor: tags => {
		const { tagColors } = get();
		return tagColors[tags.find(tag => tag in tagColors) ?? NewsType.OTHER];
	},
});

const defaultNews: News[] = [
	{
		type: "absence",
		id: "1",
		date: new Date("2021-09-01"),
		tags: [NewsType.ABSENCE],
		teacherName: "Monsieur ABE",
		teacherMonogram: "ABE",
		teacherGender: "M",
		className: "SAR-MAT2",
		classCode: "SAR-MAT2",
		classStartTime: new Date("2021-09-01T08:00:00"),
		classEndTime: new Date("2021-09-01T10:00:00"),
		groupCode: "SAR-MAT2",
	},
	{
		type: "ce",
		id: "2",
		date: new Date("2021-09-01"),
		tags: [NewsType.CE],
		title: "Candidature élections CE",
		description: "Par ce mail le Conseil Étudiant de la HE2B annonce l'ouverture de la période des élections pour la période académique 2025-2026. Vous trouverez dans ce mail notre Règlement Électoral, le calendrier électoral ainsi qu'une copie de la liste des électeur·trice·s de la HE2B.",
	},
	{
		type: "sar",
		id: "3",
		date: new Date("2021-09-02"),
		tags: [NewsType.SAR],
		title: "Réorientation HE2B",
		description: "Après avoir terminé votre session d'examens, il est possible que vous ayez des doutes sur votre orientation actuelle. Peut-être ne savez-vous pas quoi faire ?",
	},
	{
		type: "absence",
		id: "4",
		date: new Date("2021-02-06"),
		tags: [NewsType.ABSENCE, NewsType.SAR, "esi", "mat2"],
		title: "Absence XYZ",
		description: "M. XYZ sera absent ce jeudi 6 février. Le cours de SAR-MAT2 de 16h est donc annulé et reporté à une date ultérieure.",
	},
	{
		type: "marks",
		id: "5",
		date: new Date("2021-09-03"),
		tags: [NewsType.MARKS],
		className: "SAR-MAT2",
		classCode: "SAR-MAT2",
	},
	{
		type: "communication",
		id: "6",
		date: new Date("2021-09-03"),
		tags: [NewsType.COMMUNICATION],
		title: "communication administratif",
	},
	{
		type: "other",
		id: "7",
		date: new Date("2021-09-04"),
		tags: [NewsType.OTHER],
		title: "Autres informations",
	},
	{
		type: "other",
		id: "8",
		date: new Date("2022-09-04"),
		tags: ["sport"],
		title: "Journée sportive",
	},
	{
		type: "absence",
		id: "9",
		date: new Date("2023-05-24"),
		tags: [NewsType.ABSENCE],
		teacherName: "Monsieur ABE",
		teacherMonogram: "ABE",
		teacherGender: "M",
		className: "SAR-MAT2",
		classCode: "SAR-MAT2",
		classStartTime: new Date("2023-05-24T08:00:00"),
		classEndTime: new Date("2023-05-24T10:00:00"),
		groupCode: "SAR-MAT2",
	},
];

const defaultAllTags = [...new Set(defaultNews.flatMap((item) => item.tags)).values()]
	.sort();

const defaultTagFilters: string[] = [];

const defaultTagColors: Record<NewsType | string, string> = {
	[NewsType.ABSENCE]: "#FF4D4F",
	[NewsType.CE]: "#40A9FF",
	[NewsType.SAR]: "#7E4B8B",
	[NewsType.MARKS]: "#FFD700",
	[NewsType.COMMUNICATION]: "#28A745",
	[NewsType.OTHER]: "#8E8E8E",
};
