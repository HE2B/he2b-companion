// src/scripts/seedCalendar.ts
import { collection, setDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

// Nouveau tableau de cours à partir d'aujourd'hui
const newClasses = [
  {
    id: "1",
    className: "Français",
    classCode: "FRA",
    teacherName: "Francis François",
    teacherMatricule: "FFR",
    room: "101",
    startTime: new Date("2025-04-08T08:15"),
    endTime: new Date("2025-04-08T10:15"),
  },
  {
    id: "2",
    className: "Maths",
    classCode: "MATH",
    teacherName: "Mathéo Mathieu",
    teacherMatricule: "MMA",
    room: "102",
    startTime: new Date("2025-04-08T10:30"),
    endTime: new Date("2025-04-08T12:30"),
  },
  {
    id: "3",
    className: "Physique",
    classCode: "PHY",
    teacherName: "Philibert Phyferoen",
    teacherMatricule: "PPH",
    room: "104",
    startTime: new Date("2025-04-08T13:45"),
    endTime: new Date("2025-04-08T15:45"),
  },
  {
    id: "4",
    className: "Chimie",
    classCode: "CHI",
    teacherName: "Childéric Chilain",
    teacherMatricule: "CCH",
    room: "105",
    startTime: new Date("2025-04-08T16:00"),
    endTime: new Date("2025-04-08T18:00"),
  },
  {
    id: "5",
    className: "Histoire",
    classCode: "HIS",
    teacherName: "Hissam Histram",
    teacherMatricule: "HHI",
    room: "201",
    startTime: new Date("2025-04-09T14:00"),
    endTime: new Date("2025-04-09T16:00"),
  },
  {
    id: "6",
    className: "Géographie",
    classCode: "GEO",
    teacherName: "Georges Geoghegan",
    teacherMatricule: "GGE",
    room: "202",
    startTime: new Date("2025-04-09T08:00"),
    endTime: new Date("2025-04-09T10:00"),
  },
  {
    id: "7",
    className: "Français",
    classCode: "FRA",
    teacherName: "Jhon Doe",
    teacherMatricule: "JDO",
    room: "005",
    startTime: new Date("2025-04-09T10:00"),
    endTime: new Date("2025-04-09T12:00"),
  },
  {
    id: "8",
    className: "Maths",
    classCode: "MATH",
    teacherName: "Jhon Doe",
    teacherMatricule: "JDO",
    room: "A32",
    startTime: new Date("2025-04-09T13:00"),
    endTime: new Date("2025-04-09T15:00"),
  },
  {
    id: "9",
    className: "Biologie",
    classCode: "BIO",
    teacherName: "Benoît Biot",
    teacherMatricule: "BBI",
    room: "301",
    startTime: new Date("2025-04-10T08:30"),
    endTime: new Date("2025-04-10T10:30"),
  },
  {
    id: "10",
    className: "Informatique",
    classCode: "CS",
    teacherName: "Ingrid Informatique",
    teacherMatricule: "IIN",
    room: "303",
    startTime: new Date("2025-04-10T10:00"),
    endTime: new Date("2025-04-10T12:00"),
  },
  {
    id: "11",
    className: "Éducation Physique et Sportive",
    classCode: "PE",
    teacherName: "Pierre Éducateur",
    teacherMatricule: "PED",
    room: null,
    startTime: new Date("2025-04-10T14:00"),
    endTime: new Date("2025-04-10T16:00"),
  },
];

export const seedCalendar = async () => {
  const querySnapshot = await getDocs(collection(db, "base_calendar"));
  const existingClasses = querySnapshot.docs.map((doc) => doc.data());

  // Comparaison des nouveaux cours avec les existants
  const classesToAdd = newClasses.filter((newClass) => {
    const existingClass = existingClasses.find(
      (existing) => existing.id === newClass.id
    );

    // Si la classe n'existe pas ou si les horaires ont changé, on l'ajoute
    if (!existingClass) return true;
    
    // Convertir les timestamps Firebase en Date
    const existingStartTime = existingClass.startTime.toDate();
    const existingEndTime = existingClass.endTime.toDate();

    if (
      existingStartTime.toISOString() !== newClass.startTime.toISOString() ||
      existingEndTime.toISOString() !== newClass.endTime.toISOString()
    ) {
      return true;
    }

    return false;
  });

  // Si des cours doivent être ajoutés
  if (classesToAdd.length > 0) {
    const promises = classesToAdd.map((clazz) =>
      setDoc(doc(collection(db, "base_calendar"), clazz.id), {
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
