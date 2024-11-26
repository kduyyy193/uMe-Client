import axios from "axios";
import { KEY_TOKEN } from "configs/auth";
import queryString from "qs";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL_API;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params, { encode: true }),
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(KEY_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
