import { userReducer } from './user/user.slice';
import { categoriesReducer } from './categories/categories.slice';
import { cartReducer } from './cart/cart.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
	user: userReducer,
	categories: categoriesReducer,
	cart: cartReducer,
});
