import { createContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/fireabase";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload
			}

		default:
			throw new Error(`Unhandled type ${type} in user reducer`)
	}
}

const INITIAL_VALUE = {
	currentUser: null
}

export const UserProvider = ({ children }) => {
	// const [currentUser, setCurrentUser] = useState(null)
	const [state, dispatch] = useReducer(userReducer, INITIAL_VALUE)
	const { currentUser } = state

	const setCurrentUser = (user) => {
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
	}

	useEffect(() => {
		return onAuthStateChangedListener((user) => {
			setCurrentUser(user)
		})
	}, [])

	const value = { currentUser, setCurrentUser }
	return <UserContext.Provider value={value}>
		{children}
	</UserContext.Provider>
}