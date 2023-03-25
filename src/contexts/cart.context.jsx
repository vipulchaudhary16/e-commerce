import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => { },
	cartItems: [],
	addItemTocart: () => { },
	removeItemFromCart: () => { },
	deleteCartItem: () => { },
	totalItem: 0,
	cartTotal:0,
	setTotalItem: () => { }
})

/**
 * This will add the item to the cart if it does not exist else it will increment the quantity
 * @param {[]} cartItems 
 * @param {{}} productToAdd 
 * @returns []
 */
const addItemIfDoesNotExistElseIncrementQuantity = (cartItems, productToAdd) => {
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
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((item) => item.id !== cartItemToRemove.id)
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);

}

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)

	const addItemTocart = (productToAdd) => {
		setCartItems(addItemIfDoesNotExistElseIncrementQuantity(cartItems, productToAdd))
	}

	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove))
	}

	const deleteCartItem = (cartItemToDelete) => {
		setCartItems(
			cartItems.filter((item) => item.id !== cartItemToDelete.id)
		)
	}

	useEffect(() => {
		setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0))
		setCartTotal(cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0))
	}, [cartItems])

	const value = { isCartOpen, setIsCartOpen, addItemTocart, cartItems, cartCount, cartTotal, removeItemFromCart, deleteCartItem }
	return <CartContext.Provider value={value} > {children}</CartContext.Provider>
}