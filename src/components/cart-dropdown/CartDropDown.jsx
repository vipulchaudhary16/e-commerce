import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem';
import { CartDropDownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropdown = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	
	const cartItems = useSelector(selectCartItems)

	const goToCheckOutHandler = () => {
		navigate("/checkout")
		dispatch(setIsCartOpen(false))
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