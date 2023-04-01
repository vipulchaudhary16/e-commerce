import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem';
import { CartDropDownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
	const navigate = useNavigate()
	const { cartItems, setIsCartOpen } = useContext(CartContext)

	const goToCheckOutHandler = () => {
		navigate("/checkout")
		setIsCartOpen(false)
	}
	return (
		<CartDropDownContainer>
			<CartItems >
				{
					cartItems.length ? cartItems.map(item => <CartItem cartItem={item} key={item.id} />) : (<EmptyMessage>Your cart is empty</EmptyMessage>)
				}

			</CartItems>
			<Button
				onClick={() => goToCheckOutHandler()}
			>GO TO CHECKOUT</Button>
		</CartDropDownContainer>
	)
}

export default CartDropdown;