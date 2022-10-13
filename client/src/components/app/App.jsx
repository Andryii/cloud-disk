import React from "react";
import Navbar from "../navbar/Navbar";
import AppStyle from "./app.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../registration/Registration";
function App() {
  return (
    <BrowserRouter>
      <div className={AppStyle.app}>
        <Navbar />

        <Routes>
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
