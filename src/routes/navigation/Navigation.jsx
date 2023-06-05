import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropDown from '../../components/cart-dropdown/CartDropDown';
import logo from '../../assets/logo.png';
import {
	LogoContainer,
	NavLink,
	NavLinkContainer,
	NavigationContainer,
} from './navigation.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		dispatch(signOutStart());
	};

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<img src={logo} alt='VEER' style={{ height: '80px' }} />
				</LogoContainer>
				<NavLinkContainer>
					<NavLink to='/shop'>SHOP</NavLink>
					{currentUser ? (
						<>
							<NavLink onClick={() => handleSignOut()}>SIGN OUT </NavLink>
							<CartIcon />
						</>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
				</NavLinkContainer>
				{isCartOpen && <CartDropDown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
