import React from "react";
import Navbar from "../navbar/Navbar";
import AppStyle from "./app.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../registration/Registration";
import Authorization from "../authorization/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(auth());
    }
  }, []);

  return (
    <BrowserRouter>
      <div className={AppStyle.app}>
        <Navbar />
        {!isAuth && (
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Authorization />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
