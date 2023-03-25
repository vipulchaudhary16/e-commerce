import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "firebase/auth";

import {
	getFirestore,
	doc, getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs
} from "firebase/firestore";

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
const provider_google = new GoogleAuthProvider();

/*Selecting account from pop-up */
provider_google.setCustomParameters({
	prompt: "select_account",
});

// Auth process
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider_google); //signin with pop up display

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider_google);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutAuthUser = async () => {
	return await signOut(auth)
}

export const onAuthStateChangedListner = (callback) => {
	return onAuthStateChanged(auth, callback)
}

//Firestore process
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, extraInfo = {}) => {
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
				...extraInfo
			});
		} catch (err) {
			console.log("error creating user", err.message);
		}
	}

	return userDocRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey)
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase())
		batch.set(docRef, object)
	})

	await batch.commit()
	console.log("adding product batch done")
}

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories')
	const q = query(collectionRef)

	const querySnapshot = await getDocs(q)

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items
		return acc
	}, {})

	return categoryMap
}


