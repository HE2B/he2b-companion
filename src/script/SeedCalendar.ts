// src/scripts/seedCalendar.ts
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

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
  },
  {
    id: "11",
    className: "Biologie",
    classCode: "BIO",
    teacherName: "Benoît Biot",
    teacherMatricule: "BBI",
    room: "301",
    startTime: new Date("2025-04-08T08:30"),
    endTime: new Date("2025-04-08T10:30"),
  },
  {
    id: "12",
    className: "Informatique",
    classCode: "CS",
    teacherName: "Ingrid Informatique",
    teacherMatricule: "IIN",
    room: "303",
    startTime: new Date("2025-04-08T10:00"),
    endTime: new Date("2025-04-08T12:00"),
  },
  {
    id: "13",
    className: "Éducation Physique et Sportive",
    classCode: "PE",
    teacherName: "Pierre Éducateur",
    teacherMatricule: "PED",
    room: null,
    startTime: new Date("2025-04-08T14:00"),
    endTime: new Date("2025-04-08T16:00"),
  },
];

export const seedCalendar = async () => {
  const promises = defaultClasses.map((clazz) =>
    setDoc(doc(collection(db, "base_calendar"), clazz.id), {
      ...clazz,
      startTime: clazz.startTime,
      endTime: clazz.endTime,
    })
  );

  await Promise.all(promises);
  console.log("✅ Base calendar seeded!");
};
