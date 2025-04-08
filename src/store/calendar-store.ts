import { StateCreator } from "zustand";
import { AppState } from ".";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config"; // <- adapte selon ton projet

export interface CalendarStore {
  classes: Clazz[];
  loadBaseClasses: () => Promise<void>;
  getNextClass: () => Clazz | null;
  getCurrentClass: () => Clazz | null;
  getClassesOfDay: (year: number, month: number, date: number) => Clazz[];
  getNext7Days: () => Date[];
}

export const createCalendarStore: StateCreator<AppState, [], [], CalendarStore> = (set, get) => ({
  classes: [],

  loadBaseClasses: async () => {
    const snapshot = await getDocs(collection(db, "base_calendar"));
    const loaded = snapshot.docs.map(doc => {
      const data = doc.data();

      // Vérifie si startTime et endTime existent avant de les convertir
      const startTime = data.startTime ? data.startTime.toDate() : null;
      const endTime = data.endTime ? data.endTime.toDate() : null;

      // Si startTime ou endTime est manquant, log l'erreur et continue avec les autres
      if (!startTime || !endTime) {
        console.error(`Document avec ID ${doc.id} a des champs de temps invalides. startTime ou endTime est manquant.`);
        return null; // Retourne null pour les documents invalides
      }

      return {
        ...data,
        id: doc.id,
        startTime,
        endTime,
      } as Clazz;
    }).filter(clazz => clazz !== null); // Filtre les documents invalides

    set({ classes: loaded });
  },

  // Récupérer le prochain cours, qui commence après l'heure actuelle du jour
  getNextClass: () => {
    const { classes } = get();
    const now = new Date();

    return classes
      .filter(c =>
        c.startTime.getFullYear() === now.getFullYear() &&
        c.startTime.getMonth() === now.getMonth() &&
        c.startTime.getDate() === now.getDate() &&
        c.startTime > now // Ajouter la condition pour vérifier que le cours commence après maintenant
      )
      .reduce<Clazz | null>((p, c) => (!p || c.startTime < p.startTime ? c : p), null);
  },

  // Récupérer le cours actuel en cours
  getCurrentClass: () => {
    const { classes } = get(); // Récupérer la liste des cours
    const now = new Date(); // Heure actuelle

    return classes
      .filter(c =>
        // Vérifier que le cours est dans la même journée que la date actuelle
        c.startTime.getFullYear() === now.getFullYear() &&
        c.startTime.getMonth() === now.getMonth() &&
        c.startTime.getDate() === now.getDate()
      )
      .filter(c => now >= c.startTime && now <= c.endTime) // Le cours est en cours
      .reduce<Clazz | null>((p, c) => (!p || c.startTime < p.startTime ? c : p), null); // Retourner le cours en cours
  },

  // Récupérer les cours du jour (vérifier le mois et la date)
  getClassesOfDay: (year, month, date) => {
    const { classes } = get();

    return classes
      .filter(c =>
        c.startTime.getFullYear() === year &&
        c.startTime.getMonth() === month - 1 && // Correction pour le mois, JS indexe de 0 à 11
        c.startTime.getDate() === date
      )
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime()); // Trier par heure de début
  },

  // Retourner les dates des 7 prochains jours
  getNext7Days: () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => new Date(today.getTime() + i * 86400000));
  },
});
