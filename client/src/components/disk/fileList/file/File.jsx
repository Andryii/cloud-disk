import React from "react";
import FStyle from "./file.module.css";
import FPStyle from "./fileplate.module.css";
import dirlogo from "../../../../assets/img/dir-logo.svg";
import filelogo from "../../../../assets/img/file-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { downloadFile, deleteFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const filesView = useSelector((state) => state.files.view);

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

  if (filesView == "list") {
    return (
      <div className={FStyle.file} onClick={() => openDirHandler()}>
        <img
          src={file.type === "dir" ? dirlogo : filelogo}
          alt=""
          className={FStyle.img}
        ></img>
        <div className={FStyle.name}>{file.name}</div>
        <div className={FStyle.date}>{file.date.slice(0, 10)}</div>
        <div className={FStyle.size}>{sizeFormat(file.size)}</div>
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
  }

  
  if (filesView == "plate") {
    return (
      <div className={FPStyle.file} onClick={() => openDirHandler()}>
        <img
          src={file.type === "dir" ? dirlogo : filelogo}
          alt=""
          className={FPStyle.img}
        ></img>
        <div className={FPStyle.name}>{file.name}</div>

        <div className={FPStyle.btns}>
          {file.type === "dir" ? (
            ""
          ) : (
            <button
              className={[FPStyle.btn, FPStyle.download].join(" ")}
              onClick={(e) => downloadClickHandler(e)}
            >
              Download
            </button>
          )}

          <button
            className={[FPStyle.btn, FPStyle.delete].join(" ")}
            onClick={(e) => deleteClickHandler(e)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
};

export default File;
