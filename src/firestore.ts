import { collection, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "./firebase-config";

const firestore = getFirestore(firebaseApp);

export const getBaseCalendarCollection = () => collection(firestore, "base_calendar");

export const getSchoolsListDoc = () => doc(firestore, "schools", "list");
export const getGroupsCol = () => collection(firestore, "groups");
