import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { redirect } from "react-router";
import { StateCreator } from "zustand";
import { firebaseConfig, scopes } from "../firebase-config";
import { AppState } from "./index";

/**
 * https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
 * https://github.com/google/google-api-javascript-client
 * https://developers.google.com/identity/sign-in/web/deprecation-and-sunset
 * https://developers.google.com/identity/gsi/web/guides/overview
 * https://developers.google.com/identity/oauth2/web/guides/overview
 * https://www.npmjs.com/package/google-api-javascript-client
 *
 * https://developers.google.com/workspace/admin/directory/reference/rest
 * https://console.cloud.google.com/iam-admin/groups?authuser=1
 * https://cloud.google.com/identity/docs/how-to/query-memberships?authuser=1
 */

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
	isStudent: () => boolean,
	isTeacher: () => boolean,
	isConseil: () => boolean,
	getFirstName: () => string,
	getLastName: () => string,
	getEmail: () => string,
	getStudentMatricule: () => string,
	getTeacherMatricule: () => string,
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
		isStudent: () => get().user?.email?.endsWith("@etu.he2b.be") ?? false,
		isTeacher: () => get().user?.email?.endsWith("@he2b.be") ?? false,
		isConseil: () => get().user?.email?.endsWith("ce@he2b.be") ?? false,
		getFirstName: () => get().user?.displayName?.split(" ")[0] ?? "",
		getLastName: () => get().user?.displayName?.split(" ").slice(1).join("") ?? "",
		getEmail: () => get().user?.email ?? "",
		getStudentMatricule: () => get().user?.email?.split("@")[0] ?? "",
		getTeacherMatricule: () => get().user?.email?.split("@")[0] ?? "",
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
