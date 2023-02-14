import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import { UserContext } from "../../contexts/user.context";
import { signOutAuthUser } from "../../utils/firebase/fireabase";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  
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
              <span className="nav-link" onClick={
                signOutAuthUser
              } >SIGN OUT</span>
            ) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
