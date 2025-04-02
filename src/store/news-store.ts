import { StateCreator, create } from "zustand";
import { News, NewsType } from "../model/news";
import news from "./news.ts";  // Tu importes tes données ici

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

const defaultAllTags = [...new Set(news.flatMap((item) => item.tags)).values()]
  .sort();

const defaultTagFilters: string[] = [];

const defaultTagColors: Record<NewsType | string, string> = {
  [NewsType.ABSENCE]: "#FF4D4F",
  [NewsType.CE]: "#40A9FF",
  [NewsType.SAR]: "#7E4B8B",
  [NewsType.MARKS]: "#FFD700",
  [NewsType.COMMUNICATION]: "#28A745",
  [NewsType.OTHER]: "#8E8E8E",
  [NewsType.SPORT]: "#FF8C00",
};

export const createNewsStore: StateCreator<NewsStore> = (set, get) => ({
  news: news,  // Initialiser l'état avec les données importées
  setNews: (news) => set({ news }),
  allTags: defaultAllTags,
  tagFilters: defaultTagFilters,
  setTagFilters: (tagFilters) => set({ tagFilters }),
  toggleTagFilter: (tagFilter) => {
    const { tagFilters } = get();
    set({
      tagFilters: tagFilters.includes(tagFilter)
        ? tagFilters.filter((t) => t !== tagFilter)
        : [...tagFilters, tagFilter],
    });
  },
  getFilteredNews: () => {
    const { news, tagFilters } = get();
    return news
      .filter((item) => !tagFilters.length || item.tags.some((tag) => tagFilters.includes(tag)))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  },
  tagColors: defaultTagColors,
  getTagsColor: (tags) => {
    const { tagColors } = get();
    return tagColors[tags.find((tag) => tag in tagColors) ?? NewsType.OTHER];
  },
});

// Utilisation de `create` pour créer le store
export const useNewsStore = create(createNewsStore);
