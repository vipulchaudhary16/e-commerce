import './cart-item.styles.scss'

import React from 'react'

const CartItem = ({ cartItem }) => {
	let { name, quantity } = cartItem
	console.log(cartItem)
	return (
		<div>
			<h2>{name}</h2>
			<span>{quantity}</span>
		</div>
	)
}

export default CartItem
