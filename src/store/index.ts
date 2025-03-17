import { FirebaseApp, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup, User } from "firebase/auth";
import { redirect } from "react-router";
import { create } from "zustand";
import { firebaseConfig, scopes } from "../firebase-config";

interface AppState {
	firebaseApp: FirebaseApp;
	user: User | null;
	accessToken: string | null;
	login: () => void;
	logout: () => void;
}

const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);
// getToken(messaging, { vapidKey: "BCFMaaWtR4oq-AEb2Wee3GwqXTgsw-e-kSAWVY0mhJjO2zo1FsWWha1NdJQoWnPbese4CtBK_hR7G4Vat2doDjg " })
// 	.then((currentToken) => {
// 		if(currentToken) {
// 			console.log("Token:", currentToken);
// 		} else {
// 			console.log("No registration token available. Request permission to generate one.");
// 		}
// 		onMessage(messaging, playload => {
// 			window.confirm(playload.notification?.body ?? "No message");
// 		});
// 	})
// 	.catch((err) => {
// 		console.error("An error occurred while retrieving token. ", err);
// 	});
// Notification
// 	.requestPermission()
// 	.then((permission) => {
// 	});

export const useAppStore = create<AppState>()((set) => ({
	firebaseApp,
	user: null,
	accessToken: null,
	login: () => {
		const provider = new GoogleAuthProvider();
		scopes.forEach(scope => provider.addScope(scope));
		const auth = getAuth();
		auth.languageCode = "fr";
		setPersistence(auth, browserLocalPersistence)
			.then(() => signInWithPopup(auth, provider))
			.then(result => {
				const user = result?.user;
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const accessToken = credential?.accessToken ?? null;
				// IdP data available using getAdditionalUserInfo(result)
				set(() => ({ user, accessToken }));

				return redirect("/home");
			})
			.catch(console.error);
	},
	logout: () => {
		getAuth()
			.signOut()
			.then(() => {
				set(() => ({ user: null, accessToken: null }));
				redirect("/login");
			})
			.catch(error => {
				console.error(error);
			});
	},
}));
