import React from "react";
import InputStyle from "./input.module.css";

const Input = (props) => {
  return (
    <input
      {...props}
      className={[props.className, InputStyle.input].join(" ")}
    ></input>
  );
};

export default Input;
