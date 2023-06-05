import { takeLatest, all, call, put } from 'redux-saga/effects';
/*
all - allows us to take multiple sagas and initialize them all at once
call - allows us to invoke methods
put - allows us to dispatch actions
takeLatest - takes the latest action of a specific type that we pass to it
*/
import { USER_ACTION_TYPES } from './user.type';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutAuthUser,
} from '../../utils/firebase/fireabase';
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
	signUpSuccess,
} from './user.action';

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

export function* signUp({ payload }) {
	try {
		const { name, email, password } = payload;
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName: name }));
	} catch (error) {
		yield put(signUpFailed(error));
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

export function* signInAfterSignUp({ payload }) {
	const { user, extra } = payload;
	yield call(getSnapshotFromUserAuth, user, extra);
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

export function* signOut() {
	try {
		yield call(signOutAuthUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

// here we will create all the generators, which will be called by the sagas
export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
		signInWithEmailPassword
	);
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onCheckUserSession() {
	//CHECK_USER_SESSION has one generator associated with it
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// here we will initialize all the sagas
export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
