import axios from "axios";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { BASE_URL } from "./api";

export type CardProps = {
  id: number;
  title: string;
  imgUrl: number;
  time: string;
  location: string;
  description: string;
};

export const fetchCards = async (email: string): Promise<CardProps[]> => {
  try {
    const response = await axios.get(BASE_URL + "/event/all/" + email);
    if (response.status === 200) return response.data as CardProps[];
    return [];
  } catch (error) {
    console.error("Ошибка при попытке обработки данных:", error);
    throw error;
  }
};

export const fetchCard = async (id: number): Promise<CardProps> => {
  try {
    const response = await axios.get(BASE_URL + "/event/" + id.toString());
    if (response.status === 200) return response.data as CardProps;
    throw error;
  } catch (error) {
    console.error("Ошибка при попытке обработки данных:", error);
    throw error;
  }
};
