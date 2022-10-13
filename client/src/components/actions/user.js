import axios from "axios";

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
