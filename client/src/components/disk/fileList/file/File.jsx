import React from "react";
import FStyle from "./file.module.css";
import dirlogo from "../../../../assets/img/dir-logo.svg";
import filelogo from "../../../../assets/img/file-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  const openDirHandler = () => {
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  };

  return (
    <div
      className={FStyle.file}
      onClick={file.type === "dir" ? () => openDirHandler() : ""}
    >
      <img
        src={file.type === "dir" ? dirlogo : filelogo}
        alt=""
        className={FStyle.img}
      ></img>
      <div className={FStyle.name}>{file.name}</div>
      <div className={FStyle.date}>{file.date.slice(0, 10)}</div>
      <div className={FStyle.size}>{file.size}</div>
    </div>
  );
};

export default File;
