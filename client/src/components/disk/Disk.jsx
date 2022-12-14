import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import {
  setCurrentDir,
  setPopupDisplay,
  setView,
} from "../../reducers/fileReducer";
import DiskStyle from "./disk.module.css";
import FileList from "./fileList/FileList";
import Popup from "./popup/Popup";
import Uploader from "./uploader/Uploader";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

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
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  if (loader) {
    return (
      <div className={DiskStyle.loader}>
        <div className={DiskStyle.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

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
          ??????????
        </button>
        <button
          className={[DiskStyle.create, DiskStyle.btn].join(" ")}
          onClick={() => showPopupHandler()}
        >
          ?????????????? ??????????
        </button>
        <div className={DiskStyle.upload}>
          <label htmlFor={DiskStyle.input} className={DiskStyle.label}>
            ?????????????????? ????????
          </label>
          <input
            onChange={(event) => fileUploadHandler(event)}
            multiple={true}
            type="file"
            id={DiskStyle.input}
            className={DiskStyle.input}
          />
        </div>
        <select
          onChange={(e) => {
            setSort(e.target.value);
          }}
          value={sort}
          className={DiskStyle.select}
        >
          <option value="name">???? ??????????</option>
          <option value="type">???? ????????</option>
          <option value="date">???? ????????</option>
        </select>
        <button
          className={DiskStyle.plate}
          onClick={() => {
            dispatch(setView("plate"));
          }}
        ></button>
        <button
          className={DiskStyle.list}
          onClick={() => {
            dispatch(setView("list"));
          }}
        ></button>
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className={DiskStyle.dropArea}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      ???????????????????? ?????????? ????????
    </div>
  );
};

export default Disk;
