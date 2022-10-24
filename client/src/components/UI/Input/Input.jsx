import React from "react";
import InputStyle from "./input.module.css";

const Input = (props) => {
  return <input className={InputStyle.input} {...props} ></input>;
};

export default Input;
