import axios from "axios";
import { setUser } from "../../reducers/userReducer";

export const registration = async (email, password, firstName, secondName) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/registration",
      {
        email,
        password,
        firstName,
        secondName,
      }
    );
    alert(response.data.massage);
  } catch (error) {
    alert(error.response.data.massage);
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(error.response.data.massage);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/auth", {
        headers: { authtorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(error.response.data.massage);
      localStorage.removeItem("token");
    }
  };
};
