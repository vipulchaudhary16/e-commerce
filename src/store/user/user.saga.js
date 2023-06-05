import { takeLatest, all, call, put } from 'redux-saga/effects';
/*
all - allows us to take multiple sagas and initialize them all at once
call - allows us to invoke methods
put - allows us to dispatch actions
takeLatest - takes the latest action of a specific type that we pass to it
*/
import { USER_ACTION_TYPES } from './user.type';
import {
	createUserDocFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from '../../utils/firebase/fireabase';
import { signInFailed, signInSuccess } from './user.action';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		//call the createUserDocFromAuth function and pass the userAuth object and additionalDetails object
		const userSnapshot = yield call(
			createUserDocFromAuth,
			userAuth,
			additionalDetails
		);
		//dispatch the signInSuccess action and pass the userSnapshot object
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		//dispatch the signInFailed action and pass the error object
		yield put(signInFailed(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithEmailPassword({ payload }) {
	try {
		const { email, password } = payload;
		const { user } = yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* isUserAuthenticated() {
	try {
		//call the getCurrentUser function to get the userAuth object
		const userAuth = yield call(getCurrentUser);
		//if the userAuth object is null, return
		if (!userAuth) return;
		//call the getSnapshotFromUserAuth function and pass the userAuth object
		//when we will login, signInWithGoogle will return the userAuth object and add it to the database
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
		signInWithEmailPassword
	);
}

export function* onCheckUserSession() {
	//CHECK_USER_SESSION has one generator associated with it
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// here we will initialize all the sagas
export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
	]);
}
