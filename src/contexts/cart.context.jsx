import { createContext, useEffect, useReducer, useState } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => { },
	cartItems: [],
	addItemToCart: () => { },
	removeItemFromCart: () => { },
	deleteCartItem: () => { },
	totalItem: 0,
	cartTotal: 0,
	setTotalItem: () => { },
});

/**
 * This will add the item to the cart if it does not exist else it will increment the quantity
 * @param {[]} cartItems
 * @param {{}} productToAdd
 * @returns []
 */
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

const removeCartItem = (cartItems, cartItemToRemove) => {
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

const CART_ACTION_TYPES = {
	SET_CART_ITEM: "SET_CART_ITEM",
	TOGGLE_CART: "TOGGLE_CART",
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEM: {
			return {
				...state,
				...payload,
			};
		}
		case CART_ACTION_TYPES.TOGGLE_CART: {
			return {
				...state,
				isCartOpen: !state.isCartOpen,
			};
		}

		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	totalItem: 0,
	cartTotal: 0,
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { cartItems, cartCount, cartTotal, isCartOpen } = state;

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
				cartItems: newCartItems,
				cartCount: newCartCount,
				cartTotal: newCartTotal,
			}))
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addItemIfDoesNotExistElseIncrementQuantity(
			cartItems,
			productToAdd
		);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const deleteCartItem = (cartItemToDelete) => {
		const newCartItems = cartItems.filter(
			(item) => item.id !== cartItemToDelete.id
		);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = () => {
		dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART))
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
		cartTotal,
		removeItemFromCart,
		deleteCartItem,
	};
	return <CartContext.Provider value={value}> {children}</CartContext.Provider>;
};
