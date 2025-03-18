import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { redirect } from "react-router";
import { StateCreator } from "zustand";
import { firebaseConfig, scopes } from "../firebase-config";
import { AppState } from "./index";

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
scopes.forEach(scope => provider.addScope(scope));

const auth = getAuth();
auth.languageCode = "fr";
auth.setPersistence(browserLocalPersistence);

const messaging = getMessaging(firebaseApp);
void messaging;

export interface AuthSlice {
	user: User | null,
	isLoggedIn: () => boolean,
	login: () => Promise<void>,
	logout: () => Promise<void>,
}

export const createAuthStore: StateCreator<AppState, [], [], AuthSlice> = (set, get) => {
	auth.onAuthStateChanged(user => {
		if(!user) return set(() => ({ user: null }));

		set(() => ({ user }));
		redirect("/home");
	});
	return {
		user: null,
		isLoggedIn: () => get().user !== null,
		login: () => signInWithPopup(auth, provider)
			.then(result => {
				const user = result?.user;
				// const credential = GoogleAuthProvider.credentialFromResult(result);
				if(!user) throw new Error("No user or credential");

				// IdP data available using getAdditionalUserInfo(result)
				set(() => ({ user }));

				redirect("/home");
			})
			.catch(console.error),
		logout: () => auth
			.signOut()
			.then(() => {
				set(() => ({ user: null }));
				redirect("/login");
			})
			.catch(console.error),
	};
};
