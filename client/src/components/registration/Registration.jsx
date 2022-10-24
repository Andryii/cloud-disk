import React from "react";
import { useState } from "react";
import { registration } from "../../actions/user";
import Input from "../UI/Input/Input";
import RegStyle from "./registration.module.css";

const Registration = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });

  return (
    <div className={RegStyle.body}>
      <div className={RegStyle.panel}>
        <div className={RegStyle.header}>Регистрация</div>
        <Input
          type={"text"}
          placeholder={"Введите имя... "}
          value={inputs.firstName}
          onChange={(e) => {
            setInputs({
              firstName: e.target.value,
              secondName: inputs.secondName,
              email: inputs.email,
              password: inputs.password,
            });
          }}
        />
        <Input
          type={"text"}
          placeholder={"Введите фамилию... "}
          value={inputs.secondName}
          onChange={(e) => {
            setInputs({
              firstName: inputs.firstName,
              secondName: e.target.value,
              email: inputs.email,
              password: inputs.password,
            });
          }}
        />
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
          className={RegStyle.button}
          onClick={() => {
            registration(
              inputs.email,
              inputs.password,
              inputs.firstName,
              inputs.secondName
            );
          }}
        >
          Зарегистрироватся
        </button>
      </div>
    </div>
  );
};

export default Registration;
