import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/Button'
import CartItem from '../cart-item/CartItem';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext)
	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items' >
				{cartItems.map(item => <CartItem cartItem={item} key={item.id} />)}
			</div>
			<Button>GO TO CHECKOUT</Button>
		</div>
	)
}

export default CartDropdown;