import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles } from "../../actions/file";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import DiskStyle from "./disk.module.css";
import FileList from "./fileList/FileList";
import Popup from "./popup/Popup";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);

  function showPopupHandler() {
    // dispatch(createDir(currentDir, "asdfasdf"));
    dispatch(setPopupDisplay("flex"));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  return (
    <div className={DiskStyle.disk}>
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
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
