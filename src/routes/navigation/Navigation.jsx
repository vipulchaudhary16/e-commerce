import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropDown from '../../components/cart-dropdown/CartDropDown'
import { signOutAuthUser } from "../../utils/firebase/fireabase";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import logo from "../../assets/logo.png";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext)
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo} alt="VEER" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? (
              <>
                <span className="nav-link" onClick={
                  signOutAuthUser
                } >SIGN OUT </span>
                <CartIcon />
              </>
            ) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }

        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
