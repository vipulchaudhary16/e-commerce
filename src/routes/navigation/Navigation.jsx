import React, { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropDown from '../../components/cart-dropdown/CartDropDown'
import { signOutAuthUser } from "../../utils/firebase/fireabase";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import logo from "../../assets/logo.png";

import { LogoContainer, NavLink, NavLinkContainer, NavigationContainer } from "./navigation.styles";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext)
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<img src={logo} alt="VEER" />
				</LogoContainer>
				<NavLinkContainer>
					<NavLink to="/shop">
						SHOP
					</NavLink>
					{
						currentUser ? (
							<>
								<NavLink onClick={
									signOutAuthUser
								} >SIGN OUT </NavLink>
								<CartIcon />
							</>
						) : (
							<NavLink to="/auth">
								SIGN IN
							</NavLink>
						)
					}

				</NavLinkContainer>
				{isCartOpen && <CartDropDown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
