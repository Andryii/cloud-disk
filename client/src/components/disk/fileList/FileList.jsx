import React from "react";
import { useSelector } from "react-redux";
import FLStyle from "./filelist.module.css";
import File from "./file/File";

const FileList = () => {
  /*const files = [
      {
        _id: 1,
        name: "dirname",
        type: "dir",
        size: "100500gb",
        date: "20-02-2002",
      },
      {
        _id: 2,
        name: "dirname2",
        type: "dir",
        size: "100500gb",
        date: "20-02-2002",
      },
      {
        _id: 3,
        name: "file",
        type: "txt",
        size: "100500gb",
        date: "20-02-2002",
      },
    ].map((file) => <File file={file} key={file._id} />);*/

  const files = useSelector((state) => state.files.files).map((file) => (
    <File file={file} key={file._id} />
  ));
  return (
    <div className={FLStyle.filelist}>
      <div className={FLStyle.header}>
        <div className={FLStyle.name}>Название</div>
        <div className={FLStyle.date}>Дата</div>
        <div className={FLStyle.size}>Размер</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;
