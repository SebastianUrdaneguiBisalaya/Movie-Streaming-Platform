import axios, { AxiosResponse } from "axios";

const API_KEY = import.meta.env.VITE_ACCESS_TOKEN_READ;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const get = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(url);
  return response.data;
};
