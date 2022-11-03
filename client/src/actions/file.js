import axios from "axios";
import { API_URL } from "../config";
import { hideLoader, showLoader } from "../reducers/appReducer";
import { setFiles, addFile, popFromStack } from "../reducers/fileReducer";
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from "../reducers/uploadReducer";

export function getFiles(dirId, sort) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      let url = `${API_URL}api/files`;

      if ((dirId, sort)) {
        url = `${API_URL}api/files?${dirId ? `&parent=` + dirId : ""}${
          sort ? `&sort=` + sort : ""
        }`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setFiles(response.data));

      //   console.log(response.data);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addFile(response.data));
      //   console.log(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      //file.name = encodeURIComponent(file.name);
      // console.log(
      //   encodeURIComponent(file.name),
      //   decodeURIComponent(encodeURIComponent(file.name))
      // );

      if (dirId) {
        formData.append("parent", dirId);
      }
      const uploadFile = { name: file.name, progress: 0, id: Date.now() };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));
      const response = await axios.post(
        `${API_URL}api/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            ClientType: "browser",
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.total;
            console.log("total", totalLength);

            if (totalLength) {
              uploadFile.progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              dispatch(changeUploadFile(uploadFile));
            }
          },
        }
      );
      dispatch(addFile(response.data));
      //   console.log(response.data);
    } catch (error) {
      throw error;
      //console.log(error);
      //alert(error.response.data.message);
    }
  };
}

export async function downloadFile(file) {
  const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export function deleteFile(file) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}api/files?id=${file._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(popFromStack(file._id));
      console.log(response.data.message);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
}

export function searchFiles(search) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      let url = `${API_URL}api/files/search?search=${search}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setFiles(response.data));
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}
