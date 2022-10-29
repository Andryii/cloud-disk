import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";
import UploaderStyle from "./uploader.module.css";
import UploadFile from "./UploadFile";

const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.upload.isVisible);
  return (
    isVisible && (
      <div className={UploaderStyle.uploader}>
        <div className={UploaderStyle.header}>
          <div className={UploaderStyle.title}>Загрузки</div>
          <button
            className={UploaderStyle.close}
            onClick={() => {
              dispatch(hideUploader());
            }}
          >
            X
          </button>
        </div>
        {files.map((file) => {
          return <UploadFile key={file.id} file={file} />;
        })}
      </div>
    )
  );
};

export default Uploader;
