import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 15px;
`
export const LogoContainer = styled(Link)`
    height: 100%;
`
export const NavLinkContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
export const NavLink = styled(Link)`
      padding: 10px 15px;
      cursor: pointer;
`
