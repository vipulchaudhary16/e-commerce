import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

/* Collection name for Firestore */
const COLLECTION_USER = "users";

/*Firebase configuration */
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: "veer-clothing.firebaseapp.com",
	projectId: "veer-clothing",
	storageBucket: "veer-clothing.appspot.com",
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

/*Selecting account from pop-up */
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); //signin with pop up display
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
	const userDocRef = doc(db, COLLECTION_USER, userAuth.uid); //doc ref for logged in user 
	const userSnapshot = await getDoc(userDocRef);
	
	if (!userSnapshot.exists()) { //if data does not exists in firestore
		const { displayName, email, photoURL } = userAuth; //this is the info which we need at this time
		const createdAt = new Date();

		try {
			/*adding data to firestore */
			await setDoc(userDocRef, {
				displayName,
				email,
				photoURL,
				createdAt,
			});
		} catch (err) {
			console.log("error creating user", err.message);
		}
	}

	return userDocRef;
};
