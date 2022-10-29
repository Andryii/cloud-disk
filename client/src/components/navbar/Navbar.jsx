import React, { useState } from "react";
import NavbarStyle from "./navbar.module.css";
import logo from "../../assets/img/navbar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/userReducer";
import Input from "../UI/Input/Input";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className={NavbarStyle.navbar}>
      <div className={NavbarStyle.logocase}>
        <img src={logo} alt="" className={NavbarStyle.logo} />
        <div className={NavbarStyle.header}>MERN CLOUD</div>
      </div>
      {isAuth && (
        <Input
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);

            if (searchTimeout != false) {
              clearTimeout(searchTimeout);
            }
            dispatch(showLoader());
            if (e.target.value != "") {
              setSearchTimeout(
                setTimeout(
                  (value) => {
                    dispatch(searchFiles(value));
                    setSearchTimeout(false);
                  },
                  500,
                  e.target.value
                )
              );
            } else {
              dispatch(getFiles(currentDir));
            }
          }}
          className={NavbarStyle.search}
          type="text"
          placeholder="Поиск..."
        />
      )}
      {isAuth && (
        <div className={NavbarStyle.usercase}>
          <div
            className={NavbarStyle.login}
            onClick={() => {
              dispatch(logOut());
              localStorage.clear();
            }}
          >
            Выйти
          </div>
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
