import React from "react";
import FStyle from "./file.module.css";
import dirlogo from "../../../../assets/img/dir-logo.svg";
import filelogo from "../../../../assets/img/file-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  pushToStack,
  setCurrentDir,
} from "../../../../reducers/fileReducer";
import { downloadFile,deleteFile } from "../../../../actions/file";
const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  const openDirHandler = () => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };

  function downloadClickHandler(event) {
    event.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(event) {
    event.stopPropagation();
    dispatch(deleteFile(file));
  }

  return (
    <div className={FStyle.file} onClick={() => openDirHandler()}>
      <img
        src={file.type === "dir" ? dirlogo : filelogo}
        alt=""
        className={FStyle.img}
      ></img>
      <div className={FStyle.name}>{file.name}</div>
      <div className={FStyle.date}>{file.date.slice(0, 10)}</div>
      <div className={FStyle.size}>{file.size}</div>
      {file.type === "dir" ? (
        ""
      ) : (
        <button
          className={[FStyle.btn, FStyle.download].join(" ")}
          onClick={(e) => downloadClickHandler(e)}
        >
          Download
        </button>
      )}

      <button
        className={[FStyle.btn, FStyle.delete].join(" ")}
        onClick={(e) => deleteClickHandler(e)}
      >
        Delete
      </button>
    </div>
  );
};

export default File;
