import React from "react";
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";

const Profile = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(deleteAvatar());
        }}
      >
        Удалить аватар
      </button>

      <input
        onChange={(e) => {
          const file = e.target.files[0];
          dispatch(uploadAvatar(file));
        }}
        accept="image/*"
        type={"file"}
        placeholder="Загрузить аватар"
      ></input>
    </div>
  );
};

export default Profile;
