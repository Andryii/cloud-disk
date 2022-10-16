import React from "react";
import { useState } from "react";
import Input from "../UI/Input/Input";
import RegStyle from "../registration/registration.module.css";
import { login } from "../actions/user";
import { useDispatch } from "react-redux";

const Authorization = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  return (
    <div className={RegStyle.body}>
      <div className={RegStyle.panel}>
        <div className={RegStyle.header}>Войти</div>
        <Input
          type={"text"}
          placeholder={"Введите почту... "}
          value={inputs.email}
          onChange={(e) => {
            setInputs({
              firstName: inputs.firstName,
              secondName: inputs.secondName,
              email: e.target.value,
              password: inputs.password,
            });
          }}
        />
        <Input
          type={"password"}
          placeholder={"Введите пароль... "}
          value={inputs.pasword}
          onChange={(e) => {
            setInputs({
              firstName: inputs.firstName,
              secondName: inputs.secondName,
              email: inputs.email,
              password: e.target.value,
            });
          }}
        />
        <button
          className={RegStyle.btn}
          onClick={() => dispatch(login(inputs.email, inputs.password))}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Authorization;
