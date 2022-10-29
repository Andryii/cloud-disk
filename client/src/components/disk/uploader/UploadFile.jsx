import React from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";
import UploaderStyle from "./uploader.module.css";

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();

  return (
    <div className={UploaderStyle.file}>
      <div className={UploaderStyle.fileHeader}>
        <div className={UploaderStyle.fileName}>{file.name}</div>
        <button
          className={UploaderStyle.fileRemove}
          onClick={() => dispatch(removeUploadFile(file.id))}
        >
          X
        </button>
      </div>
      <div className={UploaderStyle.fileProgressBar}>
        <div
          className={UploaderStyle.fileUploadBar}
          style={{ width: file.progress + "%" }}
        ></div>
        <div className={UploaderStyle.filePercent}>{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
