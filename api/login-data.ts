import axios from "axios";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { BASE_URL } from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export const setUser = async (data: LoginData): Promise<void> => {
  try {
    const response = await axios.post(BASE_URL + "/user/login", data);

    if (response.status === 200) {
      if (response.data == true) {
        localStorage.setItem("token", data.email);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("Ошибка при попытке входа в систему:", error);
    throw error;
  }
};
