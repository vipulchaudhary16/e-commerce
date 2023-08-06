import { createSlice } from '@reduxjs/toolkit';

export const CART_INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

const addItemIfDoesNotExistElseIncrementQuantity = (
	cartItems,
	productToAdd
) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItemHelper = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((item) => item.id !== cartItemToRemove.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

export const deleteCartItemHelper = (cartItems, cartItemToDelete) => {
	const newCartItems = cartItems.filter(
		(item) => item.id !== cartItemToDelete.id
	);
	return newCartItems;
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: CART_INITIAL_STATE,
	reducers: {
		setIsCartOpen(state, action) {
			state.isCartOpen = action.payload;
		},
		addItemToCart(state, action) {
			state.cartItems = addItemIfDoesNotExistElseIncrementQuantity(
				state.cartItems,
				action.payload
			);
		},
		removeItemFromCart(state, action) {
			state.cartItems = removeCartItemHelper(state.cartItems, action.payload);
		},
		deleteCartItem(state, action) {
			state.cartItems = deleteCartItemHelper(state.cartItems, action.payload);
		},
	},
});

export const {
	setIsCartOpen,
	addItemToCart,
	removeItemFromCart,
	deleteCartItem,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
