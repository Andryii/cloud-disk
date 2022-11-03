import React from "react";
import Navbar from "../navbar/Navbar";
import AppStyle from "./app.module.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "../registration/Registration";
import Authorization from "../registration/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../../actions/user";
import Disk from "../disk/Disk";
import Profile from "../profile/Profile";
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
        {!isAuth ? (
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Authorization />} />
            <Route
              path="/*"
              element={<Navigate to="/login" replace={false} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Disk />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<Navigate to="/" replace={false} />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
