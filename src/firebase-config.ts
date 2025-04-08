import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
	apiKey: "AIzaSyBP526UpH95uiPIJ3fPI7oNFP3zdTgOOAo",
	authDomain: "he2b-companion.firebaseapp.com",
	projectId: "he2b-companion",
	storageBucket: "he2b-companion.firebasestorage.app",
	messagingSenderId: "405500060185",
	appId: "1:405500060185:web:980f4c56b3bc0c592a8088"
};


export const scopes = [
	"https://www.googleapis.com/auth/cloud-identity.groups",
];

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);