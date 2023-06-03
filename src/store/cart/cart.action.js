import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

// const updateCartItemsReducer = (newCartItems) => {

//     dispatch(
//         createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
//             cartItems: newCartItems,
//             cartCount: newCartCount,
//             cartTotal: newCartTotal,
//         }))
// };
export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addItemIfDoesNotExistElseIncrementQuantity(
        cartItems,
        productToAdd
    );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems)
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems)
};

export const deleteCartItem = (cartItems, cartItemToDelete) => {
    const newCartItems = cartItems.filter(
        (item) => item.id !== cartItemToDelete.id
    );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems)
};