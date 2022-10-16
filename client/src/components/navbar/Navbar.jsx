import React from "react";
import NavbarStyle from "./navbar.module.css";
import logo from "../../assets/img/navbar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/userReducer";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <div className={NavbarStyle.navbar}>
      <div className={NavbarStyle.logocase}>
        <img src={logo} alt="" className={NavbarStyle.logo} />
        <div className={NavbarStyle.header}>MERN CLOUD</div>
      </div>

      {isAuth && (
        <div
          className={NavbarStyle.login}
          onClick={() => {
            dispatch(logOut());
            localStorage.clear();
          }}
        >
          Выйти
        </div>
      )}
      {!isAuth && (
        <div className={NavbarStyle.usercase}>
          <div className={NavbarStyle.login}>
            <NavLink to={"/login"}>Войти</NavLink>
          </div>
          <div className={NavbarStyle.registration}>
            <NavLink to={"/registration"}>Регистарация</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
