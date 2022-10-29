import React from "react";
import { useSelector } from "react-redux";
import FLStyle from "./filelist.module.css";
import File from "./file/File";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./fileAnimation.css";

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

  const files = useSelector((state) => state.files.files);
  return (
    <div className={FLStyle.filelist}>
      <div className={FLStyle.header}>
        <div className={FLStyle.name}>Название</div>
        <div className={FLStyle.date}>Дата</div>
        <div className={FLStyle.size}>Размер</div>
      </div>
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={"file"}
            exit={false}
          >
            <File file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default FileList;
