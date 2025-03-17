import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, OAuthCredential, setPersistence, signInWithPopup, User } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { redirect } from "react-router";
import { StateCreator } from "zustand";
import { AppState } from ".";
import { firebaseConfig, scopes } from "../firebase-config";

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
scopes.forEach(scope => provider.addScope(scope));

const messaging = getMessaging(firebaseApp);

void messaging;

export interface AuthSlice {
	user: null | {
		user: User,
		credential: OAuthCredential,
	},
	isLoggedIn: () => boolean,
	login: () => Promise<void>,
	logout: () => Promise<void>,
}

export const createAuthStore: StateCreator<AppState, [], [], AuthSlice> = (set, get) => ({
	user: null,
	isLoggedIn: () => get().user !== null,
	login: () => {
		const auth = getAuth(firebaseApp);
		auth.languageCode = "fr";

		return setPersistence(auth, browserLocalPersistence)
			.then(() => signInWithPopup(auth, provider))
			.then(result => {
				const user = result?.user;
				const credential = GoogleAuthProvider.credentialFromResult(result);
				if(!user || !credential) throw new Error("No user or credential");

				// IdP data available using getAdditionalUserInfo(result)
				set(() => ({ user: { user, credential } }));

				redirect("/home");
			})
			.catch(console.error);
	},
	logout: () => getAuth(firebaseApp)
		.signOut()
		.then(() => {
			set(() => ({ user: null }));
			redirect("/login");
		})
		.catch(console.error),
});
