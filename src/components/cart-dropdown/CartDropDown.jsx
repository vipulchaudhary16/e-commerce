import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem';
import './cart-dropdown.styles.scss';


const CartDropdown = () => {
	const navigate = useNavigate()
	const { cartItems, setIsCartOpen } = useContext(CartContext)

	const goToCheckOutHandler = () => {
		navigate("/checkout")
		setIsCartOpen(false)
	}
	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items' >
				{cartItems.map(item => <CartItem cartItem={item} key={item.id} />)}
			</div>
			<Button
				onClick={() => goToCheckOutHandler()}
			>GO TO CHECKOUT</Button>
		</div>
	)
}

export default CartDropdown;