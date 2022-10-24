import React from "react";
import PopUpStyle from "./popup.module.css";
import Input from "../../UI/Input/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../../reducers/fileReducer";
import { createDir } from "../../../actions/file";

const Popup = () => {
  const [nameDir, setNameDir] = useState("");
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  return (
    <div
      className={PopUpStyle.popup}
      onClick={() => {
        dispatch(setPopupDisplay("none"));
      }}
      style={{ display: popupDisplay }}
    >
      <div
        className={PopUpStyle.content}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={PopUpStyle.header}>
          <div className={PopUpStyle.title}>Создать новую папку</div>
          <button
            className={PopUpStyle.close}
            onClick={() => {
              dispatch(setPopupDisplay("none"));
            }}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder={"Введите навзвание папки..."}
          value={nameDir}
          onChange={(e) => {
            setNameDir(e.target.value);
          }}
        />
        <button
          className={PopUpStyle.create}
          onClick={() => {
            dispatch(createDir(currentDir, nameDir));
            setNameDir("")
            dispatch(setPopupDisplay("none"));
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
