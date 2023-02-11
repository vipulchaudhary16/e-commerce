## Firebase Essentials

### Firebase Setup
1. Create a project in firebase console
2. Create a web app in firebase console
3. Copy the firebase config and paste it in the firebase.js file
    ```js
    import { initializeApp } from "firebase/app";

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
    ```

### Firebase Authentication
1. Enable email/password authentication in firebase console
2. Enable google authentication in firebase console
   
   firebase.js
    ```js
    import {
        getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
    } from "firebase/auth";


    /*Selecting account from pop-up */
    provider.setCustomParameters({
        prompt: "select_account",
    });

    export const auth = getAuth();
    export const signInWithGooglePopup = () => signInWithPopup(auth, provider); //signin with pop up display
    ```

    signin.component.jsx
    ```js
    //add this function onClick of the sign in with google button
    const logGoogleUser = async () => {
        const res = await signInWithGooglePopup();
        console.log(res);
    };
    ```

### Firebase Firestore

1. Enable firestore in firebase console
2. Set up the database rules
    ```js
    rules_version = '2';
    service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
                allow read, write: if request.auth != null;
            }
        }
    }
    ```
3. firebase.js
   
    ```js
    import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

    /* Collection name for Firestore */
    const COLLECTION_USER = "users";

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
    ```
