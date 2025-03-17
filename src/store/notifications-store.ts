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
