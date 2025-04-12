import { initializeApp } from "firebase/app";

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

export const firebaseApp = initializeApp(firebaseConfig);
