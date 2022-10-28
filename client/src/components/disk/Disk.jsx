import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/file";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import DiskStyle from "./disk.module.css";
import FileList from "./fileList/FileList";
import Popup from "./popup/Popup";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);

  function showPopupHandler() {
    // dispatch(createDir(currentDir, "asdfasdf"));
    dispatch(setPopupDisplay("flex"));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files];

    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];

    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  return !dragEnter ? (
    <div
      className={DiskStyle.disk}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className={DiskStyle.btns}>
        <button
          onClick={() => backClickHandler()}
          className={[DiskStyle.back, DiskStyle.btn].join(" ")}
        >
          Назад
        </button>
        <button
          className={[DiskStyle.create, DiskStyle.btn].join(" ")}
          onClick={() => showPopupHandler()}
        >
          Создать папку
        </button>
        <div className={DiskStyle.upload}>
          <label htmlFor={DiskStyle.input} className={DiskStyle.label}>
            Загрузить файл
          </label>
          <input
            onChange={(event) => fileUploadHandler(event)}
            multiple={true}
            type="file"
            id={DiskStyle.input}
            className={DiskStyle.input}
          />
        </div>
      </div>
      <FileList />
      <Popup />
    </div>
  ) : (
    <div
      className={DiskStyle.dropArea}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
