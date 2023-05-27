import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropDown from '../../components/cart-dropdown/CartDropDown'
import { signOutAuthUser } from "../../utils/firebase/fireabase";
import logo from "../../assets/logo.png";
import { LogoContainer, NavLink, NavLinkContainer, NavigationContainer } from "./navigation.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser)
	const isCartOpen = useSelector(selectIsCartOpen)
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
