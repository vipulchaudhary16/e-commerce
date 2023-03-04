import { createContext, useState } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => { },
	cartItems: [],
	addItemTocart: () => { }
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

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])

	const addItemTocart = (productToAdd) => {
		setCartItems(addItemIfDoesNotExistElseIncrementQuantity(cartItems, productToAdd))
	}

	const value = { isCartOpen, setIsCartOpen, addItemTocart, cartItems }
	return <CartContext.Provider value={value} > {children}</CartContext.Provider>
}